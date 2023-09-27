/* eslint-disable jsdoc/require-jsdoc */
/**
 * A test-application for Laboration 2 in 1DV610. The index.html file within this folder contains a HTML Canvas Element with the id my-canvas.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */
import { PollDisplay } from '../src/pollDisplay.js'

const canvas = document.querySelector('#my-canvas')

try {
  const myPollDisplay = new PollDisplay(canvas)
  callOnAllTests()

  // Run all tests
  function callOnAllTests () {
    testAddPollValues()
    testAddHeadline()
    testAddTotalVotes()
    testChangeBackgroundColor()
    testResize()
    testRemoveHeadline()
    testAddNewValues()
    testValuesAreBeingSorted()
    testHeadlineChange()

    // Expected errors
    testInvalidHeadline()
    testInvalidData()
    testInvalidInstance()
  }

  function testAddPollValues () {
    // Add some data to the PollDisplay object
    const data = ['Katt', 'Katt', 'Hund', 'Hund', 'Katt', 'Hamster', 'Orm', 'Orm', 'Orm', 'Krokodil', 'Häst', 'Häst']
    myPollDisplay.addPollValues(data)
  }

  function testAddHeadline () {
    // Add a headline
    myPollDisplay.addHeadline('Vilket är ditt favoritdjur?')
  }

  function testAddTotalVotes () {
    // Display number of votes
    myPollDisplay.addTotalVotes()
  }

  function testChangeBackgroundColor () {
    // Change background color
    myPollDisplay.changeBackgroundColor('#efdefd')
  }

  function testResize () {
    // Resize canvas
    myPollDisplay.resize(500, 300)
  }

  function testRemoveHeadline () {
    // Remove headline
    myPollDisplay.removeHeadline()
  }

  function testAddNewValues () {
    // New values should be shown
    const dataThree = [1, 1, 2, 3, 3, 4, 5, 6, 6]
    myPollDisplay.addPollValues(dataThree)
  }

  function testValuesAreBeingSorted () {
    // Values should be sorted
    const dataFour = [3, 4, 9, 10, 11, 12, 8, 4, 5, 6, 6, 6, 7, 7, 8, 10, 6, 8]
    myPollDisplay.addPollValues(dataFour)
  }

  function testHeadlineChange () {
    // Set new headlines
    myPollDisplay.addHeadline('Hur många timmer sover du per dag?')
  }

  function testInvalidHeadline () {
    // Expected error, only accepts strings
    myPollDisplay.addHeadline(2)
  }

  function testInvalidData () {
    // Expected error, only takes arrays
    const dataTwo = 'dog'
    myPollDisplay.addPollValues(dataTwo)
  }

  function testInvalidInstance () {
    // Create a PollDisplay object
    const invalidArgument = new PollDisplay(2)
    invalidArgument.addPollValues(['test'])
  }
} catch (error) {
  console.log(error)
}
