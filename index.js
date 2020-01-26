import path from 'path'

export default function () {
  this.options.css.push(path.resolve(__dirname, 'index.scss'))
}
