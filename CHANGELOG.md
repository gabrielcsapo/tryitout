# 1.2.3 (12/26/2017)

- removes gutter from code editor
- fixes extra space in .console 

# 1.2.2 (12/16/2017)

- adds the option to parse `[.tryitoutrc.js|.tryitoutrc.json]` by default
- updates dependencies

# 1.2.1 (12/07/2017)

- removes commander, refines arg parsing
- updates dependencies

# 1.2.0 (11/19/2017)

- adds a readme template!
- refines test suite
- cleans up storybook

# 1.1.1 (11/13/2017)

- uses preact instead of react to reduce bundle size, about 8% savings
  - code: 794 KB -> 733 KB
  - product: 142 KB -> 65 KB
  - landing: 791K -> 730 KB

# 1.1.0 (11/12/2017)

- fixes path being passed to the parser from CLI from being named source to sourcePath which is the proper attribute
- fixes watch to actually reload the page
- fixes overrides from files to be correctly parsed.
- show loading screen when running watch
- adds footer options for product and code templates

# 1.0.2 (11/03/2017)

- fixes bug with not loading config files correctly
- fixes bug in editor component that doesn't turn values into strings before rendering
- ensures that promise functions that call log update the UI

# 1.0.1 (11/03/2017)

- adds `console.html` which will render whatever it is passed as html in the editor output
- restyles code output to be positioned absolutely

# 1.0.0 (11/03/2017)

- drops support for versions earlier than node@8
- ensures the template can be defined in the source
- adds better documentation

# 0.3.8 (10/27/2017)

- removes psychic-ui from the dependencies

# 0.3.7 (10/27/2017)

- fixes layout of landing template, uses flexbox instead of absolute values

# 0.3.6 (10/24/2017)

- moves from psychic-ui to psychic.css

# 0.3.5 (10/21/2017)

- fixes babel-minify-webpack-plugin to not cleanup console evaluation code from editor component
- migrates from babili-webpack-plugin to babel-minify-webpack-plugin

# 0.3.4 (10/13/2017)

- fixes styling for landing page

# 0.3.3 (10/12/2017)

- fixes dependency location
- fixes update-notifier code

# 0.3.2 (10/12/2017)

- adds babili-webpack-plugin to decrease the bundle size

# 0.3.1 (10/11/2017)

- fixes styling for landing page

# 0.3.0 (10/11/2017)

- change the interface for the product template to have a links option instead of static link attributes
- adds update-notifier to show new updates
- adds landing page template
- fixes storybook demo of code template
- adds more PropTypes to templates

# 0.2.4 (10/09/2017)

- updates dependencies and uses babel-preset-env instead of babel-preset-es2015

# 0.2.3 (10/05/2017)

- passes template correctly to compile
- fixes conditionals to allow command line arguments to take precedence over static options
- updates style-loader

# 0.2.2 (10/05/2017)

- adds templates (code and product)
- fixed a bug that renders the full react library on build

# 0.2.1 (09/28/2017)

- adds a default to container props if not passed

# 0.2.0 (09/27/2017)

- updates react@16.0.0 and reduces example bundle from 2.3 MB to 1.8 MB
- removes dependencies and abstracts classes
- adds storybook to test UI components
- removes source and docs attribute and replaces them with nav which is an object that will render the top nav

# 0.1.4 (09/19/2017)

- adds an options object that contains options to augment the page
- fixes bug when trying to use the code examples and cleanString neuters the functionality

# 0.1.3 (09/18/2017)

- inlines assets which allows browserify files to be accessed

# 0.1.2 (09/07/2017)

- adds docs attribute

# 0.1.1 (09/07/2017)

- trims and removes tabs from strings if they are brought in from a es6 template string (cleans up look of config file)
- updates psychic-ui@1.0.8 which fixes code tag not wrapping
- removes margin from blockquotes

# 0.1.0 (09/07/2017)

- drops support for node@4
- watch command actually works
- changes interface to both compile and watch
- config can either be a `json` file or a `js` file that exports an object
- bundles all assets in single html file
- removes dependency on; concat, webpack-dev-server, webpack-dev-middleware, webpack-hot-middleware

# 0.0.6 (08/07/2017)

- updates dependencies
- updates main docs

# 0.0.5 (07/21/2017)

- be able to render html examples

# 0.0.4 (07/16/2017)

- bin now has a fancy new spinner!
- compile now allows a 3rd callback option
- updates `webpack@^2.6.1` -> `webpack@3.3.0`

# 0.0.3 (06/04/2017)

- adds an option for adding a subtitle to a code block

# 0.0.2 (06/03/2017)

- fix exclude for babel-loader when installed as an `npm` module

# 0.0.1 (06/03/2017)

- basic functionality

# 0.0.0 (05/31/2017)

- holding `npm` name
