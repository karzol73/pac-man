import './../sass/main.sass'
import { createBoard, squares } from './board'
import { moveGhost, ghosts } from './ghosts'
import { movePacman, pacmanCurrentIndex } from './pacman'

// draw the board (board.js)
createBoard()

// draw pacman at starting position
squares[pacmanCurrentIndex].classList.add('pac-man')

// draw the ghosts (ghosts.js)
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

// move pacman on the board (pacman.js)
movePacman()

// move the ghosts on the board (ghosts.js)
ghosts.forEach(ghost => moveGhost(ghost))
