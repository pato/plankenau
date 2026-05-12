## How to run

Jekyll Setup on macOS (Apple Silicon)
1. Install Homebrew & Ruby # Install Homebrew (if missing) /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"  # Install Ruby brew install ruby
2. Configure Path (Ensures Mac uses Homebrew Ruby) echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc source ~/.zshrc
3. Install Jekyll gem install jekyll bundler
4. Initialize Project (Inside your blog folder) # Create Gemfile if missing bundle init  # Add Jekyll to Gemfile echo 'gem "jekyll"' >> Gemfile  # Install local dependencies bundle install
5. Run Locally bundle exec jekyll serve  View your site at: http://127.0.0.1:4000
