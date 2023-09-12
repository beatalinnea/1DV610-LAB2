/**
 * Will fill a rectangle.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @param {number} x - The x point.
 * @param {number} y - The y point.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 */
export function drawRectangle (canvas, x, y, width, height) {
  const context = canvas.getContext('2d')
  context.fillRect(x, y, width, height)
}

/**
 * Will say hello.
 *
 * @param {string} name - The name to be greeted.
 * @returns {string} - The greeting.
 */
export function hello (name) {
  return 'hello ' + name
}

console.log(hello('world'))
