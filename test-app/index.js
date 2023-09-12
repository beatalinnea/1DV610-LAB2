/**
 * The main script file for the testing application in lab 2.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */
import { hello, drawRectangle } from '../src/index.js'

const myCanva = document.querySelector('#my-canvas')
drawRectangle(myCanva, 2, 2, 20, 20)

console.log(hello('beata'))
