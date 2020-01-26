import path from 'path'

export default function (moduleOptions) {
  const options = { ...moduleOptions, ...this.options.breakpoints }
  options.css = options.css === undefined ? true : options.css
  options.js = options.js === undefined ? true : options.js
  options.xs = options.xs || 576
  options.sm = options.sm || 768
  options.md = options.md || 992
  options.lg = options.lg || 1200

  if (options.css) {
    this.options.css.push(path.resolve(__dirname, 'index.scss'))
  }
  
  if (options.js) {
    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.js'),
      options: {
        xs: options.xs,
        sm: options.sm,
        md: options.md,
        lg: options.lg
      }
    })
  }
}
