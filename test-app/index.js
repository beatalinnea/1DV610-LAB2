/**
 * A test-application for Laboration 2 in 1DV610. The index.html file within this folder contains a HTML Canvas Element with the id my-canvas.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */
import { PollDisplay } from '../src/pollDisplay.js'

const canvas = document.querySelector('#my-canvas')

try {
  // Create a PollDisplay object
  const myPollDisplay = new PollDisplay(canvas)

  // Add some data to the PollDisplay object
  const data = ['Katt', 'Katt', 'Hund', 'Hund', 'Katt', 'Hamster', 'Orm', 'Orm', 'Orm', 'Krokodil', 'Häst', 'Häst']
  myPollDisplay.addPollValues(data)

  // Add a headline
  myPollDisplay.addHeadline('Vilket är ditt favoritdjur?')

  // Change background color
  myPollDisplay.changeBackgroundColor('#efdefd')

  // Resize canvas
  myPollDisplay.reSize(500, 300)

  // Add headline again (should change)
  myPollDisplay.addHeadline('Vad röstar du på?')

  // Display number of votes
  myPollDisplay.addTotalVotes()

  // New values should be shown
  const dataThree = [3, 4, 9, 10, 11, 12, 8, 4, 5, 6, 6, 6, 7, 7, 8, 10, 6, 8]
  myPollDisplay.addPollValues(dataThree)

  // Set new headlines
  myPollDisplay.addHeadline('Hur många timmer sover du per dag?')
  myPollDisplay.addTotalVotes()

  // Remove headline
  // myPollDisplay.removeHeadline()

  /*
  // Expected error, only accepts strings
  myPollDisplay.addHeadline(2)

  // Expected error, only takes arrays
  const dataTwo = 'dog'
  myPollDisplay.addPollValues(dataTwo)
  */
} catch (error) {
  console.log(error)
}
