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
