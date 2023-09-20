/* eslint-disable jsdoc/require-jsdoc */
/**
 * Class for Canvas
 */
export class CanvasDrawer {
  // The canvas element
  #canvas

  // Array of Y values
  #yCollection = []

  // Array of X values
  #xCollection = []

  /**
   * Constructor for canvas class.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element
   */
  constructor (canvas) {
    // validate - if not HTMLCanvasElement - exception)
    // privata setters
    this.#canvas = canvas
    this.context = canvas.getContext('2d')
  }

  createRectangle (width, height) {
    if (width && height) {
      this.#canvas.height = height
      this.#canvas.width = width
    } else {
      this.#canvas.height = 200
      this.#canvas.width = 300
    }
    this.context.fillStyle = '#989898'
    this.context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
    this.context.lineWidth = 5
    this.context.strokeRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  addPollValues (array) {
    for (let i = 0; i < array.length; i++) {
      // bryt ut nedan i egen metod
      if (this.#xCollection.includes(array[i])) {
        const index = this.#xCollection.indexOf(array[i])
        this.#yCollection[index] = this.#yCollection[index] + 1
      } else {
        this.#xCollection.push(array[i])
        this.#yCollection.push(1)
      }
    }
    /*
    for (let i = 0; i < this.#xCollection.length; i++) {
      console.log(`Värdet ${this.#xCollection[i]} förekommer ${this.#yCollection[i]} gånger.`)
    }
    */
    this.#markPoints()
  }

  #markPoints () {
    // + 1 för att skapa marginal för sista pollen
    let pollBasePoint = this.#canvas.width / (this.#xCollection.length + 1)
    const distanceBetweenPolls = pollBasePoint

    const maxValue = this.#findMaxYValue()
    const onePartOfHeight = this.#canvas.height / (maxValue + 1)

    // bryt ut!
    for (let i = 0; i < this.#xCollection.length; i++) {
      const pollHeightPoint = this.#canvas.height - (this.#yCollection[i] * onePartOfHeight)
      this.context.beginPath()
      this.context.moveTo(pollBasePoint, this.#canvas.height)
      this.context.lineTo(pollBasePoint, pollHeightPoint)
      this.context.closePath()
      this.context.stroke()

      this.context.fillStyle = '#000000'
      this.context.font = '15px serif'
      this.context.fillText(`${this.#xCollection[i]}`, pollBasePoint + 5, pollHeightPoint - 5)
      pollBasePoint = pollBasePoint + distanceBetweenPolls
    }
    this.#markOnYWing(maxValue)
  }

  #markOnYWing (max) {
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

  #findMaxYValue () {
    let largestNum = 0
    for (let i = 0; i < this.#yCollection.length; i++) {
      if (this.#yCollection[i] > largestNum) {
        largestNum = this.#yCollection[i]
      }
    }
    return largestNum
  }

  addHeadline (string) {
    this.context.fillStyle = '#000000'
    this.context.font = '15px serif'
    this.context.fillText(`${string}`, 15, 20)
  }

  addTotalVotes () {
    const numberOfVotes = this.getAmountOfVotes()
    this.context.fillStyle = '#000000'
    this.context.font = '15px serif'
    this.context.fillText(`Votes: ${numberOfVotes}`, this.#canvas.width - 80, 20)
  }

  getAmountOfVotes () {
    let votes = 0
    for (let i = 0; i < this.#yCollection.length; i++) {
      votes = votes + this.#yCollection[i]
    }
    return votes
  }
}
