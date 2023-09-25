/* eslint-disable jsdoc/require-jsdoc */
/**
 * Class for Canvas
 */
export class PollDisplay {
  // The canvas element
  #canvas

  // Array of Y values
  #yCollection = []

  // Array of X values
  #xCollection = []

  // The headline
  #headline

  // amounf of votes
  #amountOfVotes

  // background color - set to white
  #backgroundColor = '#ffffff'

  /**
   * Constructor for canvas class.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @param {number} width - the width of the canvas
   * @param {number} height - the height of the canvas
   */
  constructor (canvas, width, height) {
    this.#checkIfCanvas(canvas)
    this.#canvas = canvas
    this.context = canvas.getContext('2d')

    if (width && height) {
      this.#createBase(width, height)
    } else {
      this.#createBase(400, 300)
    }
  }

  #checkIfCanvas (arg) {
    if (!(arg instanceof HTMLCanvasElement)) {
      throw new Error('The argument must be a HTMLCanvasElement')
    }
  }

  #createBase (width, height) {
    this.#canvas.height = height
    this.#canvas.width = width

    this.#addBackground()
  }

  #addBackground () {
    this.context.fillStyle = this.#backgroundColor
    this.context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
    this.#addFrame()
  }

  changeBackgroundColor (color) {
    this.#backgroundColor = color
    this.#addBackground()

    this.#addExistingValues()
  }

  reSize (width, height) {
    this.#createBase(width, height)

    this.#addExistingValues()
  }

  #addExistingValues () {
    if (this.#hasData()) {
      this.#buildPolls()
      this.#addBackgroundCounter()
    }
    if (this.#headline) {
      this.addHeadline(this.#headline)
    }
    if (this.#amountOfVotes) {
      this.addTotalVotes()
    }
  }

  #addFrame () {
    this.context.lineWidth = 5
    this.context.strokeRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  #hasData () {
    if (this.#xCollection.length > 0) {
      return true
    } else {
      return false
    }
  }

  addPollValues (data) {
    if (!Array.isArray(data)) {
      throw new Error('The argument must be an array')
    }
    const sorted = this.#sortArray(data)
    if (this.#hasData()) {
      this.#xCollection = []
      this.#yCollection = []
      this.#createBase(this.#canvas.width, this.#canvas.height)
    }
    for (let i = 0; i < sorted.length; i++) {
      // bryt ut nedan i egen metod
      if (this.#xCollection.includes(sorted[i])) {
        const index = this.#xCollection.indexOf(sorted[i])
        this.#yCollection[index] = this.#yCollection[index] + 1
      } else {
        this.#xCollection.push(sorted[i])
        this.#yCollection.push(1)
      }
    }
    this.#buildPolls()
    this.#addBackgroundCounter()
  }

  #sortArray (array) {
    return Array.from(array)
      .sort((a, b) => {
        return a - b
      })
  }

  #buildPolls () {
    // + 1 för att skapa marginal för sista pollen
    let pollBasePoint = this.#canvas.width / (this.#xCollection.length + 1)
    const distanceBetweenPolls = pollBasePoint
    const maxValue = this.#checkMostVotes()
    // divide with +1 to keep marginal within the canvas
    const onePartOfHeight = this.#canvas.height / (maxValue + 1)

    for (let i = 0; i < this.#xCollection.length; i++) {
      const pollHeightPoint = this.#canvas.height - (this.#yCollection[i] * onePartOfHeight)
      this.#drawOnePoll(pollBasePoint, pollHeightPoint)

      this.context.fillStyle = '#000000'
      this.context.font = '15px serif'
      this.context.fillText(`${this.#xCollection[i]}`, pollBasePoint + 5, pollHeightPoint - 5)
      pollBasePoint = pollBasePoint + distanceBetweenPolls
    }
  }

  #drawOnePoll (pollBase, pollHeight) {
    this.context.beginPath()
    this.context.moveTo(pollBase, this.#canvas.height)
    this.context.lineTo(pollBase, pollHeight)
    this.context.closePath()
    this.context.stroke()
  }

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

  #checkMostVotes () {
    let mostVotes = 0
    for (let i = 0; i < this.#yCollection.length; i++) {
      if (this.#yCollection[i] > mostVotes) {
        mostVotes = this.#yCollection[i]
      }
    }
    return mostVotes
  }

  addHeadline (string) {
    if (typeof string !== 'string') {
      throw new Error('The argument must be a string')
    }
    if (this.#headline) {
      this.#clearHeadline()
    }
    this.context.fillStyle = '#000000'
    this.context.font = '15px serif'
    this.context.fillText(`${string}`, 15, 20)

    this.#headline = string
  }

  addTotalVotes () {
    const numberOfVotes = this.getAmountOfVotes()
    this.context.fillStyle = '#000000'
    this.context.font = '15px serif'
    this.context.fillText(`Votes: ${numberOfVotes}`, this.#canvas.width - 80, 20)

    this.#amountOfVotes = numberOfVotes
  }

  getAmountOfVotes () {
    let votes = 0
    for (let i = 0; i < this.#yCollection.length; i++) {
      votes = votes + this.#yCollection[i]
    }
    return votes
  }

  #clearHeadline () {
    this.#headline = null
    this.context.clearRect(0, 0, this.#canvas.width, 30)
    this.context.fillStyle = this.#backgroundColor
    this.context.fillRect(0, 0, this.#canvas.width, 30)
    this.#addFrame()
  }

  removeHeadline () {
    this.context.clearRect(0, 0, this.#canvas.width, 30)
    this.#headline = null
    this.#amountOfVotes = null
    this.context.fillStyle = this.#backgroundColor
    this.context.fillRect(0, 0, this.#canvas.width, 30)
    this.#addFrame()
  }
}
