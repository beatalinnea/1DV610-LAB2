/* eslint-disable jsdoc/require-jsdoc */
export class CanvasDrawer {
  #backgroundColor = '#ffffff'
  #drawColor = '#000000'
  #margin = 5
  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
  }

  drawBackground () {
    this.context.fillStyle = this.#backgroundColor
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawFrame()
  }

  setBackgroundColor (color) {
    this.#backgroundColor = color
    this.drawBackground(this.#backgroundColor)
  }

  drawFrame () {
    this.context.lineWidth = 5
    this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawText (text, x, y, color, font) {
    this.context.fillStyle = color
    this.context.font = font
    this.context.fillText(text, x, y)
  }

  drawHorizontalLine (y, color, lineWidth) {
    this.context.strokeStyle = color
    this.context.lineWidth = lineWidth
    this.context.beginPath()
    this.context.moveTo(0, y)
    this.context.lineTo(this.canvas.width, y)
    this.context.closePath()
    this.context.stroke()
  }

  clearCanvas () {

  }
}
