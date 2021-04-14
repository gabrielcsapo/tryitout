const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y"
  ],
  webpackFinal: async (config) => {
    config.plugins.push(
      new MonacoWebpackPlugin()
    );

    config.module.rules.push({
      test: /\.(jpg|png|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 25000
      }
    })
  
    return config;
  }
}