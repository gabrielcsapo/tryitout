module.exports = {
    template: 'landing',
    title: 'Steno',
    nav: {
      Docs: 'http://gabrielcsapo.com/steno'
    },
    body: `
      <div style="text-align:center;">
        <h4 style="font-weight:100">A simple SSH shortcut menu for OSX</h4>
        <img class="responsive" src="../assets/example.gif"/>
      </div>
    `,
    options: {
      width: '50%'
    },
    footer: `
      <div class="text-black">Made with ☕️ by <a href="http://www.gabrielcsapo.com">@gabrielcsapo</a></div>
    `,
    output: "../../../docs/landing"
};
