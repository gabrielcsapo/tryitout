const dedent = require('dedent');

module.exports.cleanString = function cleanString(string) {
  return dedent(string || ''.trim())
};

module.exports.Loader = class Loader {
  constructor(text) {
    this.text = text;
    this.spinner = ["⠋", "⠙", "⠚", "⠒", "⠂", "⠂", "⠒", "⠲", "⠴", "⠦", "⠖", "⠒", "⠐", "⠐", "⠒", "⠓", "⠋"];
    this.interval = 80;
    this.tick = 0;
    this.loading = true;
    this.loader = '';
  }
  start() {
    this.loader = setInterval(() => {
      this.tick = (this.tick > this.loader.length - 1) ? 0 : this.tick;
      process.stdout.write(`${this.spinner[this.tick]} ${this.text} \r`);
      this.tick++;
    }, this.interval);
    return this;
  }
  stop() {
    clearInterval(this.loader);
    return this;
  }
  update(text) {
    this.text = text;
    this.stop();
    this.start();
    return this;
  }
}
