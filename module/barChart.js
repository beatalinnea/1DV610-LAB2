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
  #drawer
  #canvas

  #dataEntries = []

  #headline

  /**
   * Constructor for canvas class.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @param {number} width - the width of the canvas
   * @param {number} height - the height of the canvas
   */
  constructor (canvas, width, height) {
    this.#validateCanvas(canvas)
    this.#drawer = new CanvasDrawer(canvas)
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
    this.#renderData()
  }

  changeBackgroundColor (color) {
    this.#drawer.setBackgroundColor(color)
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
    this.#drawer.addLeftHeadline(this.#headline)
  }

  clearHeadline () {
    this.#headline = null
    this.#renderData()
  }

  getAmountOfVotes () {
    return this.#dataEntries.reduce((total, point) => total + point.y, 0)
  }

  #setSizeAndBackground (width, height) {
    this.#canvas.height = height
    this.#canvas.width = width
    this.#drawer.drawBackground()
  }

  #renderData () {
    if (this.#hasData()) {
      this.#sortDataEntries()
      this.#renderBars()
      this.#addBackgroundLines()
      this.#drawer.addLeftHeadline(`Votes: ${this.getAmountOfVotes()}`)
    }
    if (this.#headline) {
      this.addHeadline(this.#headline)
    }
  }

  #hasData () {
    return this.#dataEntries.length > 0
  }

  #renderBars () {
    const maxValue = this.#checkMostVotes()
    let barBasePoint = this.#calculateBarBasePoint()

    for (const data of this.#dataEntries) {
      const barHeightPoint = this.#calculateBarHeightPoint(data, maxValue)
      this.#drawer.drawBar(barBasePoint, barHeightPoint)
      this.#drawer.addBarText(data.x, barBasePoint)
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

  #calculateDistanceBetweenBars () {
    return this.#canvas.width / (this.#dataEntries.length + 1)
  }

  /**
   * Converts array of single values to array of objects with x and y values.
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

  #clearData () {
    this.#dataEntries = []
    this.clearHeadline()
    this.#drawer.clearCanvas()
  }

  #sortDataEntries () {
    this.#dataEntries.sort((a, b) => a.x - b.x)
  }

  #addBackgroundLines () {
    const maxVotes = this.#checkMostVotes()
    const onePartOfHeight = this.#canvas.height / (maxVotes + 1)

    for (let i = 0; i < maxVotes; i++) {
      const lineHeight = onePartOfHeight * (i + 1)
      this.#drawer.drawHorizontalLine(lineHeight)
      this.#drawer.addAxisValue(lineHeight, maxVotes - i)
    }
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
}
