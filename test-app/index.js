/**
 * The main script file for the testing application in lab 2.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */
import { CanvasDrawer } from '../src/index.js'

const myCanva = document.querySelector('#my-canvas')
const myDrawer = new CanvasDrawer(myCanva)

myDrawer.createRectangle(500, 300)
// const data = [2, 2, 3, 4, 4, 5, 8, 9, 11, 11, 11, 11, 11, 12, 13, 14, 15, 16, 16, 14, 14, 14]
// const data = [2, 2, 3, 4, 4]
const data = ['Katt', 'Katt', 'Hund', 'Hund', 'Katt', 'Hamster', 'Orm', 'Orm', 'Orm', 'Krokodil', 'Häst', 'Häst']
myDrawer.addPollValues(data)
myDrawer.addHeadline('Vilket är ditt favoritdjur?')
myDrawer.addTotalVotes()
