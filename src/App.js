import React from 'react';
import './App.css';

function Board() {
    const [squares, setSquares] = React.useState(Array(9).fill(null))

    const nextValue = calcNextVal(squares)
    const winner = calcWinner(squares)
    const status = calcCurr(winner, squares, nextValue)

    function selectSquare(square) {
        if (winner || squares[square])
            return

        const squaresCopy = [...squares]
        squaresCopy[square] = nextValue
        setSquares(squaresCopy)
    }

    function restart() {
        setSquares(Array(9).fill(null))
    }

    function renderSquare(i) {
        return (
            <button className="square" onClick={() => selectSquare(i)}>
                {squares[i]}
            </button>
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
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'

}

function calcCurr(winner, squares, nextValue) {
    return winner
        ? `${winner} won the game!`
        : squares.every(Boolean)
            ? `Game Draw`
            : `Current Turn: Player ${nextValue}`
}

export default App