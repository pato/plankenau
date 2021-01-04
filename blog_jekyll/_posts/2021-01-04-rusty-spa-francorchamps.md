---
layout: post
title: Rust powered atmega328 project meets F1 track Spa-Francorchamps
published: true
date: 2021-01-04
permalink: post/rusty-spa-francorchamps
---

<img src="https://plankenau.com/i/spa.jpg" height="300">

Happy new years everyone! This Christmas I got an awesome light up laser cutout
of my favorite Formula 1 track [Spa-Francorchamps][1] (home of the F1 Belgian
Grand Prix) from my awesome girlfriend. I love the gift and thought I could
really bring it to life by adding some "smarts" to the LED lights that power
it, and since I've been working so much in rust, figured it was a great excuse
to get into [avr-rust][2].

I decided to get a clone of an arduino-uno (basically just an Atmega328p) as
well as a relay board (to switch the power supply for the track). The track is
powered via a USB 2.0 cable and instead of cutting it I ordered a USB extender
and cut that. I didn't have any of my previous equipment here in Paris so I had
to buy a soldering kit with some tools.

<img src="https://plankenau.com/i/things.jpeg">

Relay board, off-brand arduino uno, usb extender cable, jumper cables

I had purchased the relay board because I thought the LEDs powering the F1
track might draw too much current to drive it directly from the arduino digital
output pin (my plan was to have the digital pin control the relay which would
switch the external DC current). But using my USB multimeter, it turns out that
the track only draws around 10mA.

<img src="https://plankenau.com/i/track_amps.jpg">

So it looks like we'll be able to directly power the track through the arduino
board, which simplifies the wiring required.


## Cutting up the adapter cable


Using a wire cutter I spliced the USB extender in half

<img src="https://plankenau.com/i/cable_cut.jpg">

I then used a wire stripper to remove the outer insulation plastic

<img src="https://plankenau.com/i/cable_stripped.jpg">

USB 2.0 wires are fairly simple, only have four lines. Two for power (VCC and
Ground) and two for data (Data+ and Data-).

<img src="https://plankenau.com/i/usb_pinout.png">

Since the F1 track only uses the power lines for the LEDs, we can safely remove
the exposed data lines.

<img src="https://plankenau.com/i/cable_power.jpg">


## Soldering the adapter cable

Now we need to solder these to arduino jumper cables so we can easily plug them
in to the arduino breakout board to power directly.

<img src="https://plankenau.com/i/pre_solder.jpg">

I simply wrapped the exposed wires around each other and soldered them
directly.

<img src="https://plankenau.com/i/post_solder.jpg">

And since we don't want the 5V VCC line to short with the ground one I used
electrical tape to insulate the solder joints

<img src="https://plankenau.com/i/insulated.jpg">

The cable is now ready! Next up is software

## Setting up avr-rust

Next I had to set up `avr-rust` on my local development machine. Using rustup
it's as simple as

```
rustup component add rust-src --toolchain nightly
```

Then using homebrew we need

```
brew tap osx-cross/avr
brew install avr-binutils avr-gcc avrdude
```

## Rustyspa project

I created a very simple crate that uses PWM with a modulating duty cycle to
fade in and out the lights on the F1 track. It uses [avl-hal][3] to interface
with the arduino hardware and `avrdude` to flash it.

The full source code is all available [here][4] but the main source code is simple

```
#![no_std]
#![no_main]

extern crate panic_halt;
use arduino_uno::hal::pwm;
use arduino_uno::hal::pwm::Timer1Pwm;
use arduino_uno::prelude::*;

const STEP_SLEEP_MS: u16 = 10;
const ON_SLEEP_MS: u16 = 250;
const OFF_SLEEP_MS: u16 = 100;

#[arduino_uno::entry]
fn main() -> ! {
    let peripherals = arduino_uno::Peripherals::take().unwrap();
    let mut pins = arduino_uno::Pins::new(peripherals.PORTB, peripherals.PORTC, peripherals.PORTD);

    // create a PWM timer
    let mut timer = Timer1Pwm::new(peripherals.TC1, pwm::Prescaler::Prescale64);
    // get pin D9 in PWM output mode
    let mut led = pins.d9.into_output(&mut pins.ddr).into_pwm(&mut timer);

    // enable PWM cycle
    led.enable();

    let duty_range = 0..=led.get_max_duty();
    loop {
        for i in duty_range.clone() {
            led.set_duty(i);
            arduino_uno::delay_ms(STEP_SLEEP_MS);
        }
        arduino_uno::delay_ms(ON_SLEEP_MS);

        for i in duty_range.clone().rev() {
            led.set_duty(i);
            arduino_uno::delay_ms(STEP_SLEEP_MS);
        }
        arduino_uno::delay_ms(OFF_SLEEP_MS);
    }
}
```

## Final product

For now this is the final product! A smoothly fading Spa-Francorchamps! Next up
I will want to set up schedules for it to turn on and other special effects,
maybe synchronize it to music.

<img src="https://plankenau.com/i/final.gif">

[1]: https://en.wikipedia.org/wiki/Circuit_de_Spa-Francorchamps
[2]: https://github.com/avr-rust/
[3]: https://github.com/Rahix/avr-hal
[4]: https://github.com/pato/rustyspa
