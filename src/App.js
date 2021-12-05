import React from 'react';
import styles from './App.css';

function Board() {
    const [squares, setSquares] = React.useState(Array(9).fill(null))
    const [squaresSvg, setSvgSquares] = React.useState(Array(9).fill(null))

    const nextValue = calcNextVal(squares)
    const winner = calcWinner(squares)
    const status = calcCurr(winner, squares, nextValue)

    function selectSquare(square) {
        if (winner || squares[square])
            return

        const squaresCopy = [...squares]
        squaresCopy[square] = nextValue
        setSquares(squaresCopy)

        const squaresSvgCopy = [...squaresSvg]
        squaresSvgCopy[square] = nextSvg(squares)
        setSvgSquares(squaresSvgCopy)

    }

    function restart() {
        setSquares(Array(9).fill(null))
        setSvgSquares(Array(9).fill(null));
    }

    function renderSquare(i) {
        return (
            <div className="square" onClick={() => selectSquare(i)}>
                {squaresSvg[i]}
            </div>
        )
    }

    return (
        <div className="boardlayout">
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>

            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>

            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button className="restart" onClick={restart}>
                Restart
            </button>
        </div>
    )
}

function Game() {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    )
}

function App() {
    return <Game/>
}

function calcWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a]
    }
    return null
}

function calcNextVal(squares) {
    return (squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O')

}

function nextSvg(squares) {
    return (squares.filter(Boolean).length % 2 === 0 ? <svg className="xmark"><rect className="r1" fill="white" width="20" rx="5" transform="rotate(-45) translate(-25, 25)" /><rect className="r2" fill="white" width="20" rx="5" transform="rotate(45) translate(68, -38)" /></svg> : <svg className="omark"><circle className="circ" cx="50" cy="68" r="40" stroke="white" fill="transparent" /></svg>)
}

function calcCurr(winner, squares, nextValue) {
    return winner
        ? `${winner} won the game!`
        : squares.every(Boolean)
            ? `Game Draw`
            : `Current Turn: Player ${nextValue}`
}

export default App