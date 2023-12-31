/* eslint-disable jsdoc/require-jsdoc */
/**
 * A test-application for Laboration 2 in 1DV610. The index.html file within this folder contains a HTML Canvas Element with the id my-canvas.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import { BarChart } from 'very-simple-bar-chart'

const canvas = document.querySelector('#my-canvas')

try {
  const barChart = new BarChart(canvas)
  callOnAllTests()

  // Run all tests
  function callOnAllTests () {
    testAddValues()
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

  function testAddValues () {
    // Add some data to the PollDisplay object
    const data = ['Katt', 'Katt', 'Hund', 'Hund', 'Katt', 'Hamster', 'Orm', 'Orm', 'Orm', 'Krokodil', 'Häst', 'Häst']
    barChart.addValues(data)
  }

  function testAddHeadline () {
    // Add a headline
    barChart.addHeadline('Vilket är ditt favoritdjur?')
  }

  function testAddTotalVotes () {
    // Display number of votes
    barChart.addTotalVotes()
  }

  function testChangeBackgroundColor () {
    // Change background color
    barChart.changeBackgroundColor('#efdefd')
  }

  function testResize () {
    // Resize canvas
    barChart.resize(500, 300)
  }

  function testRemoveHeadline () {
    // Remove headline
    barChart.removeHeadline()
  }

  function testAddNewValues () {
    // New values should be shown
    const dataThree = [1, 1, 2, 3, 3, 4, 5, 6, 6]
    barChart.addValues(dataThree)
  }

  function testValuesAreBeingSorted () {
    // Values should be sorted
    const dataFour = [3, 4, 9, 10, 11, 12, 8, 4, 5, 6, 6, 6, 7, 7, 8, 10, 6, 8]
    barChart.addValues(dataFour)
  }

  function testHeadlineChange () {
    // Set new headlines
    barChart.addHeadline('How many hours do you sleep per day?')
  }

  function testInvalidHeadline () {
    // Expected error, only accepts strings
    barChart.addHeadline(2)
  }

  function testInvalidData () {
    // Expected error, only takes arrays
    const dataTwo = 'dog'
    barChart.addValues(dataTwo)
  }

  function testInvalidInstance () {
    // Create a PollDisplay object
    const invalidArgument = new BarChart(2)
    invalidArgument.addValues(['test'])
  }
} catch (error) {
  console.log(error)
}
