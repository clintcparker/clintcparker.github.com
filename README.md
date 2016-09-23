#Daryl

Daryl is a performant and responsive [Jekyll](http://jekyllrb.com) theme. It aims to be simply designed and above-all, highly-readable. This is a screenshot of the Daryl theme as it stands now:

![Daryl screenshot](https://raw.githubusercontent.com/andrewcodes/daryl/master/daryl-screenshot.png)

The name of this theme is from [Daryl Dixon](http://walkingdead.wikia.com/wiki/Daryl_Dixon_(TV_Series)), of the Walking Dead. Great character from a stellar television show.

##This theme is:

- Mobile-first and by nature, performant-first
- Responsive by default
- Small file size
- No build tools except for Jekyll itself.
- Includes an Archive/Post-list page template.

##Installation

* Install the Command Line Developer Tools or Xcode (which includes the Command Line Developer Tools) if you don't already have it installed.
```bash
xcode-select --install
```
More info [here](http://jekyllrb.com/docs/installation/) on Jekyll prerequisites.

* Install [Jekyll](http://jekyllrb.com):
```bash
gem install jekyll
```

* Install the jekyll-paginate gem:
```bash
gem install --user-install --bindir ~/bin --no-document --pre jekyll-paginate
```

* Install the pygments gem for syntax highlighting:
```bash
gem install pygments.rb
```

* Run git clone to download this repo to your machine:
```bash
git clone https://github.com/andrewcodes/daryl.git
```

* Run ```jekyll serve``` from the terminal

* Browse to http://localhost:4000 to see your site

* Before deploying your site to a produciton enviornment, remove lines 16-27 in the "_includes/head.html" file as this contains my own Google Analytics code.

##Development

Daryl’s *Master* branch is the “clean branch”. *Master* is ready to be deployed at all times once this theme is released. All development will be done on their own branches in a SEMVER style. If a patch or feature needs to be pushed to _Master_, a 1.1.0 (for feature) or 1.0.1 (for a patch/fix) will be created and developed on.

##Contributing

Since this is an open source project, pull requests for fixes are welcome. Details on how to do that are below:

- Fork the project
- Create your feature branch (git checkout -b your-new-feature)
- Commit your changes (git commit -am "Add your new feature")
- Push to the branch (git push origin your-new-feature)
- Create a new Pull Request

If you would like to change the design of this theme, please fork this project.

##Tasks

- [X] Add a site description div under the site title h1
- [X] Add an Archives page
- [X] Add page navigation
- [X] Move my site over. Git clone to a new directory then copy posts over from old andrewlee.name directory. Upload. CANCELLED
- [X] Test RSS feed
- [X] Add a favicon
- [X] Add a new screenshot from a portrait monitor
- [x] Test the installation instructions to make sure it works in a "clean" environment (Mac VM without Jekyll already installed).
- [ ] Add a left-aligned caption/citation area (release first and save this for later)
- [ ] Checkout plugins and see if anything is needed (possibly http://www.jekyll-plugins.com/plugins/simple-jekyll-search ?)

##Changelog
List of all [commits](https://github.com/andrewcodes/daryl/commits/master).

##License

This theme is open sourced under the [MIT license](https://github.com/andrewcodes/daryl/blob/gh-pages/LICENSE).
