/* eslint-disable jsdoc/require-jsdoc */
/**
 * The the main and only class for the BarChart module.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.1.0
 */

/**
 * Class for BarChart.
 */
export class BarChart {
  // The canvas element for the BarChart to be showed within
  #canvas

  #dataEntries = []

  // The headline - to be showed next to the polls.
  #headline

  // background color - default set to white.
  #backgroundColor = '#ffffff'

  /**
   * Constructor for canvas class.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @param {number} width - the width of the canvas
   * @param {number} height - the height of the canvas
   */
  constructor (canvas, width, height) {
    this.validateCanvas(canvas)
    this.context = canvas.getContext('2d')
    this.#setSizeAndBackground(width || 400, height || 300)
  }

  /**
   * Check if the argument is a HTMLCanvasElement.
   *
   * @param {any} arg - The argument sent in when creating a new instance of the class.
   * @throws {Error} - The argument must be a HTMLCanvasElement.
   */
  validateCanvas (arg) {
    if (!(arg instanceof HTMLCanvasElement)) {
      throw new Error('The argument must be a HTMLCanvasElement')
    }
    this.#canvas = arg
  }

  /**
   * Will create the base for the BarChart to be showed within. If no height and width is set - default values will be used.
   *
   * @param {number} width - The width of the BarChart.
   * @param {number} height - The height of the BarChart.
   */
  #setSizeAndBackground (width, height) {
    this.#canvas.height = height
    this.#canvas.width = width
    this.#drawBackground()
  }

  /**
   * Will add a background to the BarChart. If no color is set - default color will be used.
   */
  #drawBackground () {
    this.context.fillStyle = this.#backgroundColor
    this.context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
    this.#drawFrame()
  }

  /**
   * Add a frame to the BarChart.
   */
  #drawFrame () {
    this.context.lineWidth = 5
    this.context.strokeRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  /**
   * Resize the BarChart.
   *
   * @param {number} width - The new width of the BarChart.
   * @param {number} height - The new height of the BarChart.
   */
  changeSize (width, height) {
    this.#setSizeAndBackground(width, height)

    // If there was data in the BarChart - render it again.
    this.#renderData()
  }

  /**
   * Change the background color of the BarChart.
   *
   * @param {string} color - The color to be used as background.
   */
  changeBackgroundColor (color) {
    this.#backgroundColor = color
    this.#drawBackground()

    // If there was data in the BarChart - render it again.
    this.#renderData()
  }

  /**
   * Checks if there is any data or settings in the BarChart. If so - it will add the existing values.
   */
  #renderData () {
    if (this.#hasData()) {
      this.#sortDataEntries()
      this.#renderBars()
      this.#addBackgroundCounter()
      this.#drawTotalVotes()
    }
    if (this.#headline) {
      this.setHeadline(this.#headline)
    }
  }

  /**
   * Checks if there is any data in the BarChart.
   *
   * @returns {boolean} - true if there is data, false if not.
   */
  #hasData () {
    return this.#dataEntries.length > 0
  }

  #renderBars () {
    const maxValue = this.#checkMostVotes()
    let barBasePoint = this.#calculateBarBasePoint(maxValue)

    for (const data of this.#dataEntries) {
      const barHeightPoint = this.#calculateBarHeightPoint(data, maxValue)
      this.#drawOneBar(barBasePoint, barHeightPoint)
      this.#drawTextToBar(data, barBasePoint)
      barBasePoint += this.#calculateDistanceBetweenBars()
    }
  }

  #calculateBarBasePoint (maxValue) {
    return this.#canvas.width / (this.#dataEntries.length + 1)
  }

  #calculateBarHeightPoint (dataPoint, maxValue) {
    const onePartOfHeight = this.#canvas.height / (maxValue + 1)
    return this.#canvas.height - (dataPoint.y * onePartOfHeight)
  }

  #drawTextToBar (dataPoint, barBasePoint) {
    this.context.fillStyle = '#000000'
    this.context.font = '15px serif'
    const textWidth = this.context.measureText(`${dataPoint.x}`).width
    this.context.fillText(`${dataPoint.x}`, barBasePoint - textWidth - 5, this.#canvas.height - 5)
  }

  #calculateDistanceBetweenBars () {
    return this.#canvas.width / (this.#dataEntries.length + 1)
  }

  /**
   * Takes in array of objects with given x and y values. Data must be in the format: [{x: 'value', y: 'value'}, {x: 'value', y: 'value'}].
   *
   * @param {object[]} data - The array of data to be added to the BarChart.
   */
  addSpecificValues (data) {
    // format: [{x: 'value', y: 'value'}, {x: 'value', y: 'value'}]
    if (!Array.isArray(data)) {
      throw new Error('The argument must be an array of objects with x and y values')
    }
    if (this.#hasData()) {
      console.log('we already have data!')
      this.#clearData()
    }
    this.#dataEntries = data
    this.#renderData()
  }

  /**
   * Add values to the BarChart.
   *
   * @param {any[]} data - The array of data to be added to the BarChart.
   */
  addValues (data) {
    if (!Array.isArray(data)) {
      throw new Error('The argument must be an array')
    }
    if (this.#hasData()) {
      this.#clearData()
    }
    this.#convertToDataEntries(data)
    this.#renderData()
  }

  /**
   * Update the data points.
   *
   * @param {*} newData - The data to be added to the BarChart.
   */
  #convertToDataEntries (newData) {
    for (const data of newData) {
      const existingEntry = this.#dataEntries.find((entry) => entry.x === data)
      if (existingEntry) {
        existingEntry.y++
      } else {
        this.#dataEntries.push({ x: data, y: 1 })
      }
    }
  }

  /**
   * Clears the data.
   */
  #clearData () {
    this.#dataEntries = []
    this.clearHeadline()
    this.#clearCanvas()
  }

  #sortDataEntries () {
    this.#dataEntries.sort((a, b) => a.x - b.x)
  }

  /**
   * Draw one bar.
   *
   * @param {number} base - The base point of the bar.
   * @param {number} top - The top point of the bar.
   */
  #drawOneBar (base, top) {
    // If the bar is too small, make it 5px high
    if (top === this.#canvas.height) {
      top -= 5
    }
    this.context.beginPath()
    this.context.moveTo(base, this.#canvas.height)
    this.context.lineTo(base, top)
    this.context.closePath()
    this.context.stroke()
  }

  /**
   * Adds horisontal lines to the BarChart background to show the amount of votes for each poll.
   */
  #addBackgroundCounter () {
    const max = this.#checkMostVotes()
    this.context.lineWidth = 0.2
    const onePartOfHeight = this.#canvas.height / (max + 1)
    for (let i = 0; i < max; i++) {
      this.context.beginPath()
      this.context.moveTo(0, onePartOfHeight * (i + 1))
      this.context.lineTo(this.#canvas.width, onePartOfHeight * (i + 1))
      this.context.closePath()
      this.context.stroke()

      this.context.fillStyle = '#000000'
      this.context.font = '15px serif'
      this.context.fillText(`${max - i}`, 5, (onePartOfHeight * (i + 1) - 3))
    }
  }

  /**
   * Checks which poll has the most votes.
   *
   * @returns {number} - The number of votes for the poll with most votes.
   */
  #checkMostVotes () {
    if (this.#dataEntries.length === 0) {
      throw new Error('There is no data to be shown')
    }
    let mostVotes = this.#dataEntries[0].y // Initialize with the first data point.

    for (const dataPoint of this.#dataEntries) {
      if (dataPoint.y > mostVotes) {
        mostVotes = dataPoint.y
      }
    }

    return mostVotes
  }

  /**
   * Views a headline to the BarChart.
   *
   * @param {string} text - The text to be used as headline.
   */
  setHeadline (text) {
    if (typeof text !== 'string') {
      throw new Error('The argument must be a string')
    }
    if (this.#headline) {
      this.clearHeadline()
    }
    this.#headline = text
    this.#drawHeadline()
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  #drawHeadline () {
    this.context.fillStyle = '#000000'
    this.context.font = '15px serif'
    this.context.fillText(`${this.#headline}`, 15, 20)
  }

  /**
   * Views the total amount of votes on the BarChart.
   */
  #drawTotalVotes () {
    const numberOfVotes = this.getAmountOfVotes()
    this.context.fillStyle = '#000000'
    this.context.font = '15px serif'
    this.context.fillText(`Votes: ${numberOfVotes}`, this.#canvas.width - 80, 20)
  }

  /**
   * Get the total amount of votes.
   *
   * @returns {number} - The total amount of votes.
   */
  getAmountOfVotes () {
    return this.#dataEntries.reduce((total, point) => total + point.y, 0)
  }

  /**
   * Removes the headline and/or the total amount of votes.
   */
  clearHeadline () {
    this.context.clearRect(0, 0, this.#canvas.width, 30)
    this.#headline = null
    this.context.fillStyle = this.#backgroundColor
    this.context.fillRect(0, 0, this.#canvas.width, 30)
    this.#drawFrame()
  }

  /**
   * Clears the canvas.
   */
  #clearCanvas () {
    this.context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
    this.#drawBackground() // Redraw the background.
  }
}
