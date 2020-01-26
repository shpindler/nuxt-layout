import path from 'path'

export default function (moduleOptions) {
  const options = { ...moduleOptions, ...this.options.breakpoints }
  this.options.css.push(path.resolve(__dirname, 'index.scss'))
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      xs: options.xs || 576,
      sm: options.sm || 768,
      md: options.md || 992,
      lg: options.lg || 1200
    }
  })
}
