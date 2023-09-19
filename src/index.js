/**
 * Class for Canvas
 */
export class CanvasDrawer {
  /**
   * Constructor for canvas class.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element
   */
  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    console.log(this.hello('world'))
  }

  /**
   * Method that will draw.
   *
   * @param {number} x - the x point.
   * @param {number} y - the y point.
   */
  drawRectangle (x, y) {
    const width = 300
    const height = 200
    this.context.fillStyle = 'red'
    this.context.fillRect(x, y, width, height)
    console.log(this.canvas)
  }

  /**
   * Prints out hello.
   *
   * @param {string} name - the name.
   * @returns {string} the name.
   */
  hello (name) {
    return 'hello ' + name
  }
}
