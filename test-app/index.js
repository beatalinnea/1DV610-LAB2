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

  const dataThree = [2, 2, 3, 4, 4, 5, 8, 9, 11, 11, 11, 11, 11, 12, 13, 14, 15, 16, 16, 14, 14, 14]
  const dataTwo = [2, 2, 3, 4, 4]
  const data = ['Katt', 'Katt', 'Hund', 'Hund', 'Katt', 'Hamster', 'Orm', 'Orm', 'Orm', 'Krokodil', 'Häst', 'Häst']
  myPollDisplay.addPollValues(data)
  myPollDisplay.addHeadline('Vilket är ditt favoritdjur?')
  myPollDisplay.addTotalVotes()
  myPollDisplay.changeBackgroundColor('#efdefd')
  myPollDisplay.reSize(500, 300)
  myPollDisplay.addPollValues(dataTwo)
  myPollDisplay.addPollValues(dataThree)
  myPollDisplay.addHeadline('Hur många timmer sover du per dag?')
  myPollDisplay.addTotalVotes()
} catch (error) {
  console.log(error)
}
