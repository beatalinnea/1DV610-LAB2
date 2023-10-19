/* eslint-disable jsdoc/require-jsdoc */
/**
 * The the main and only class for the BarChart module.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.1.0
 */

import { CanvasDrawer } from './canvasDrawer.js'

/**
 * Class for the BarChart module.
 */
export class BarChart {
  #canvasDrawer
  #canvas
  #context

  #dataEntries = []

  #headline
  #backgroundColor = '#ffffff'
  #drawColor = '#000000'
  #margin = 5

  /**
   * Constructor for canvas class.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @param {number} width - the width of the canvas
   * @param {number} height - the height of the canvas
   */
  constructor (canvas, width, height) {
    this.#validateCanvas(canvas)
    this.#context = canvas.getContext('2d')
    this.#canvasDrawer = new CanvasDrawer(canvas)
    this.#setSizeAndBackground(width || 400, height || 300)
  }

  #validateCanvas (arg) {
    if (!(arg instanceof HTMLCanvasElement)) {
      throw new Error('The argument must be a HTMLCanvasElement')
    }
    this.#canvas = arg
  }

  /**
   * Add values to the BarChart. Input data can be in the format:
   * [{x: 'value', y: 'value'}, {x: 'value', y: 'value'}] or [x, x, x, ...].
   *
   * @param {any[]} data - The array of data to be added to the BarChart.
   */
  addValues (data) {
    if (this.#hasData()) {
      this.#clearData()
    }
    // Check data is in the format: [{x: 'value', y: 'value'}, {x: 'value', y: 'value'}]
    if (data.length > 0 && typeof data[0] === 'object' && 'x' in data[0] && 'y' in data[0]) {
      this.#dataEntries = data
    } else {
      this.#convertToDataEntries(data)
    }
    this.#renderData()
  }

  changeSize (width, height) {
    this.#setSizeAndBackground(width, height)

    // If there was data in the BarChart - render it again.
    this.#renderData()
  }

  changeBackgroundColor (color) {
    this.#canvasDrawer.setBackgroundColor(color)
    this.#canvasDrawer.drawBackground()
    // this.#drawBackground()

    // If there was data in the BarChart - render it again.
    this.#renderData()
  }

  addHeadline (text) {
    if (typeof text !== 'string') {
      throw new Error('The argument must be a string')
    }
    if (this.#headline) {
      this.clearHeadline()
    }
    this.#headline = text
    this.#viewHeadline()
  }

  clearHeadline () {
    this.#context.clearRect(0, 0, this.#canvas.width, 30)
    this.#headline = null
    this.#context.fillStyle = this.#backgroundColor
    this.#context.fillRect(0, 0, this.#canvas.width, 30)
    this.#drawFrame()
  }

  getAmountOfVotes () {
    return this.#dataEntries.reduce((total, point) => total + point.y, 0)
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
    this.#context.font = '15px serif'
    this.#canvasDrawer.drawBackground()
  }

  /**
   * Add a frame to the BarChart.
   */
  #drawFrame () {
    this.#context.lineWidth = 5
    this.#context.strokeRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  /**
   * Checks if there is any data or settings in the BarChart. If so - it will add the existing values.
   */
  #renderData () {
    if (this.#hasData()) {
      this.#sortDataEntries()
      this.#renderBars()
      this.#addBackgroundLines()
      this.#viewTotalVotes()
    }
    if (this.#headline) {
      this.addHeadline(this.#headline)
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
    let barBasePoint = this.#calculateBarBasePoint()

    for (const data of this.#dataEntries) {
      const barHeightPoint = this.#calculateBarHeightPoint(data, maxValue)
      this.#drawOneBar(barBasePoint, barHeightPoint)
      this.#viewBarValue(data, barBasePoint)
      barBasePoint += this.#calculateDistanceBetweenBars()
    }
  }

  #calculateBarBasePoint () {
    return this.#canvas.width / (this.#dataEntries.length + 1)
  }

  #calculateBarHeightPoint (dataPoint, maxValue) {
    const onePartOfHeight = this.#canvas.height / (maxValue + 1)
    return this.#canvas.height - (dataPoint.y * onePartOfHeight)
  }

  #viewBarValue (dataEntry, barBasePoint) {
    this.#context.fillStyle = this.#drawColor
    const text = `${dataEntry.x}`
    const textWidth = this.#context.measureText(text).width
    const xPosition = barBasePoint - textWidth - this.#margin
    const yPosition = this.#canvas.height - this.#margin

    this.#context.fillText(text, xPosition, yPosition)
  }

  #calculateDistanceBetweenBars () {
    return this.#canvas.width / (this.#dataEntries.length + 1)
  }

  /**
   * Update the data points.
   *
   * @param {any[]} newData - The data to be added to the BarChart.
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

  #drawOneBar (base, top) {
    // If the bar is too small, give it some height.
    if (top === this.#canvas.height) {
      top -= this.#margin
    }
    this.#context.beginPath()
    this.#context.moveTo(base, this.#canvas.height)
    this.#context.lineTo(base, top)
    this.#context.closePath()
    this.#context.stroke()
  }

  #addBackgroundLines () {
    const maxVotes = this.#checkMostVotes()
    const onePartOfHeight = this.#canvas.height / (maxVotes + 1)

    for (let i = 0; i < maxVotes; i++) {
      const lineHeight = onePartOfHeight * (i + 1)
      this.#drawHorizontalLine(lineHeight)
      this.#viewAxisValue(lineHeight, maxVotes - i)
    }
  }

  #drawHorizontalLine (height) {
    this.#context.lineWidth = 0.2
    this.#context.beginPath()
    this.#context.moveTo(0, height)
    this.#context.lineTo(this.#canvas.width, height)
    this.#context.closePath()
    this.#context.stroke()
  }

  #viewAxisValue (height, valueText) {
    this.#context.lineWidth = 0.2
    this.#context.fillStyle = this.#drawColor
    this.#context.fillText(`${valueText}`, this.#margin, (height - 5))
  }

  #checkMostVotes () {
    if (this.#dataEntries.length === 0) {
      throw new Error('There is no data to be shown')
    }
    let mostVotes = this.#dataEntries[0].y
    for (const entry of this.#dataEntries) {
      if (entry.y > mostVotes) {
        mostVotes = entry.y
      }
    }
    return mostVotes
  }

  #viewHeadline () {
    this.#context.fillStyle = this.#drawColor
    this.#context.fillText(`${this.#headline}`, 15, 20)
  }

  #viewTotalVotes () {
    const numberOfVotes = this.getAmountOfVotes()
    this.#context.fillStyle = this.#drawColor
    this.#context.fillText(`Votes: ${numberOfVotes}`, this.#canvas.width - 80, 20)
  }

  #clearCanvas () {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
    this.#canvasDrawer.drawBackground(this.#backgroundColor) // Redraw the background.
  }
}
