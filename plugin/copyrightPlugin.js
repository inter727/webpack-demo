class CopyrightPlugin {
  constructor(options) {
    this.name = options.name
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('CopyrightPlugin', (compilation, cb) => {
      var copyrightText = 'copyright by ' + this.name;
      compilation.assets['copyright.txt'] = {
        source: function() {
          return copyrightText
        },
        size: function() {
          return copyrightText.length;
        }
      }
      cb();
    })
  }
}

module.exports = CopyrightPlugin