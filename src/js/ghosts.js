import { width } from './setup'
import { squares } from './board.js'
import { checkForGameOver, addScore } from './actions'

//create ghosts
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

//all ghosts
const ghosts = [
    new Ghost('blinky', 376, 250),
    new Ghost('pinky', 404, 400),
    new Ghost('inky', 379, 300),
    new Ghost('clyde', 407, 500)
]

// move ghosts randomly
function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function () {
        //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
        if (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
            !squares[ghost.currentIndex + direction].classList.contains('wall')) {
            //remove the ghosts classes
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
            //move into that space
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            //else find a new random direction ot go in
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is currently scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        //if scared ghost collided pacman
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            addScore(100)
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }

        checkForGameOver()

    }, ghost.speed)
}

//make the ghosts stop flashing
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

export { moveGhost, ghosts, unScareGhosts }