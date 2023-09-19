/**
 * The main script file for the testing application in lab 2.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */
import { CanvasDrawer } from '../src/index.js'

const myCanva = document.querySelector('#my-canvas')
const myDrawer = new CanvasDrawer(myCanva)

myDrawer.drawRectangle(2, 2)

console.log(myDrawer.hello('beata'))
