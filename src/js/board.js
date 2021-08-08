import { layout } from './setup'

const grid = document.querySelector('.grid')
const squares = []

const createBoard = () => {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        //add layout to the board
        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
        //! show grid index numbers of each boxes ONLY in DEV MODE
        //! squares[i].innerHTML = i
    }
}

export { createBoard, squares }