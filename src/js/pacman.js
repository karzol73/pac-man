import { height, width } from './setup'
import { squares } from './board'
import { pacDotEaten, powerPelletEaten, checkForGameOver, checkForWin } from './actions'

let pacmanCurrentIndex = 658

let pacmanSpeed = 150
let pacmanRotate = 180

function movePacman() {

    let pacmanDirection = -1
    let selectedDirection = pacmanDirection

    setInterval(function () {

        // controller select the direction of pacman
        document.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                //Left
                case 37:
                    selectedDirection = -1
                    break
                //Up
                case 38:
                    selectedDirection = -width
                    break
                //Right
                case 39:
                    selectedDirection = +1
                    break
                //Down
                case 40:
                    selectedDirection = +width
                    break
            }
        })
        // if no wall or ghost lair change the dierction of pacman to the selected direction
        if (!squares[pacmanCurrentIndex + selectedDirection].classList.contains('wall') &&
            !squares[pacmanCurrentIndex + selectedDirection].classList.contains('ghost-lair')) {
            pacmanDirection = selectedDirection
            selectedDirection === -1 ? pacmanRotate = 180 : selectedDirection === -width ? pacmanRotate = 270 : selectedDirection === +1 ? pacmanRotate = 0 : pacmanRotate = 90
        }
        // check the wall and ghost lair of the current direction of pacman
        if (!squares[pacmanCurrentIndex + pacmanDirection].classList.contains('wall') &&
            !squares[pacmanCurrentIndex + pacmanDirection].classList.contains('ghost-lair') || (pacmanCurrentIndex + pacmanDirection) === 391 || (pacmanCurrentIndex + pacmanDirection) === 420) {
            // check the corridor at left
            if ((pacmanCurrentIndex + pacmanDirection) === 391) {
                squares[pacmanCurrentIndex].classList.remove('pac-man')
                pacmanCurrentIndex = 420
                // check the corridor at right
            } if ((pacmanCurrentIndex + pacmanDirection) === 420) {
                squares[pacmanCurrentIndex].classList.remove('pac-man')
                pacmanCurrentIndex = 391
            }
            squares[pacmanCurrentIndex].classList.remove('pac-man')
            pacmanCurrentIndex = pacmanCurrentIndex + pacmanDirection
            squares[pacmanCurrentIndex].classList.add('pac-man')
            document.querySelector(".pac-man").style.transform = "rotate(" + pacmanRotate + "deg)"
            pacDotEaten()
            powerPelletEaten()
            checkForGameOver()
            checkForWin()
        }

    }, pacmanSpeed)
}

export { movePacman, pacmanCurrentIndex, pacmanSpeed }