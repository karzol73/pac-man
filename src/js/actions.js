import { squares } from './board'
import { movePacman, pacmanCurrentIndex, pacmanSpeed } from './pacman'
import { ghosts, unScareGhosts } from './ghosts'

const scoreDisplay = document.getElementById('score')

let score = 0

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        addScore(10)
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
}

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        addScore(50)
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
}

function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        setTimeout(function () { alert("Game Over") }, pacmanSpeed)
    }
}

function checkForWin() {
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        setTimeout(function () { alert("You have WON!") }, pacmanSpeed)
    }
}

function addScore(value) {
    score += value
    scoreDisplay.innerHTML = score
}

export { pacDotEaten, powerPelletEaten, checkForGameOver, checkForWin, addScore }