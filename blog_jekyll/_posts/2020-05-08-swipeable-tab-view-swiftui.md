---
layout: post
title: Swipeable TabView in SwiftUI
published: true
date: 2020-04-19
permalink: post/swipeable-tabview-swiftui
---

# What I want

<img src="http://plankenau.com/i/kl02MZ.gif" height="400" title="using swipe gestures to switch the active tab in TabView"/>

<p>While testing a swiftUI app I've been working on, I realized I constantly tried
to use swipe gestures to switch the active TabView tab. It just feels like such
a natural user experience that I was surprised there weren't any good examples
with the latest swiftUI. So, here we are :)</p>


## Starting from a basic TabView

We start off by creating a barebones swiftUI TabView app with two tabs.
By default these can be switched by tapping on their corresponding tab items.

```
struct ContentView: View {
    var body: some View {
        TabView{
            NavigationView{
                Text("Hello, World!")
            }.tabItem {
                Image(systemName: "house")
                Text("Home")
            }
            NavigationView{
                Text("Salut, tout le monde!")
            }.tabItem {
                Image(systemName: "timelapse")
                Text("Space")
            }
        }
    }
}
```

<img src="http://plankenau.com/i/kpr3PT.gif" height="400" title="a basic TabView responding to clicks"/>


## Using a binding to represent active tab

This is great, but we want to be able to programmatically change the selected
tab.  We accomplish this by introducing a state variable to represent the
selected tab.  Note the `@State` decoration which enables us to us it as a
binding in the `TabView`, which tell swiftUI to "tie" the variable with the UI,
and thus trigger re-draws when it changes.

At this point we've retained the same functionality, but given ourselves a way
to programmatically change the selected tab (by modifying the state variable)

```
@State private var selectedTab = 0

var body: some View {
    TabView(selection: $selectedTab){
        NavigationView{
            Text("Hello, World!")
        }.tabItem {
            Image(systemName: "house")
            Text("Home")
        }.tag(0)
        NavigationView{
            Text("Salut, tout le monde!")
        }.tabItem {
            Image(systemName: "timelapse")
            Text("Space")
        }.tag(1)
    }
}
```

## Adding a drag gesture handler

Next, we want to be able to detect when the user swipes. A swipe is actually a
drag gesture.

So we add a
[`highPriorityGesture`](https://developer.apple.com/documentation/swiftui/view/3338619-highprioritygesture),
which means it will take higher precedence than any existing gesture listeners
within the contained view. We listen to the `onEnded` of a
[`DragGesture`](https://developer.apple.com/documentation/swiftui/draggesture).
This will give us an event containing the translation amount in width and height.

We are interesting in horizontal swiping so we'll want to inspect the
translation width to see what kind of values we get


```
TabView(selection: $selectedTab){
    NavigationView{
        Text("Hello, World!")
    }.tabItem {
        Image(systemName: "house")
        Text("Home")
    }.tag(0)
     .highPriorityGesture(DragGesture().onEnded({ self.handleSwipe(translation: $0.translation.width)}))
    NavigationView{
        Text("Salut, tout le monde!")
    }.tabItem {
        Image(systemName: "timelapse")
        Text("Space")
    }.tag(1)
     .highPriorityGesture(DragGesture().onEnded({ self.handleSwipe(translation: $0.translation.width)}))
}
```

```
private func handleSwipe(translation: CGFloat) {
    print("handling swipe! horizontal translation was \(translation)")
}
```

<img src="http://plankenau.com/i/ipt7EH.gif" height="400" title="debug printing the translation width"/>

## Using a listener to detect swipe and change tab

After playing around with drag gestures and getting a feel for the magnitude of
the translation widths, we want to establish a cutoff after which we will
consider the swipe as intended to switch tabs. 50 seems like a reasonable
number to me :)

```
let minDragTranslationForSwipe: CGFloat = 50
```

Now we'll want to change our swipe handler to see if a given swipe is greater (a swipe to the right),
or less than the negative cutoff (a swipe to the left).

Additionally, we'll want to make sure there are more tabs available to make sure we don't go past our
total number of tabs.

```
let numTabs = 2
```

```
private func handleSwipe(translation: CGFloat) {
    if translation > minDragTranslationForSwipe && selectedTab > 0 {
        selectedTab -= 1
    } else  if translation < -minDragTranslationForSwipe && selectedTab < numTabs-1 {
        selectedTab += 1
    }
}
```

## Final product

And voilà !

Now we have a fully native swipe gesture comptabile TabView! We can extend this
as we add more tabs, by changing the `numTabs` constant and making sure we add
appropriate `.tag()` to the tabs.

Here is the complete final code:

<script src="https://gist.github.com/pato/7527c7e1de465758eaa138b8d406af1a.js"></script>
