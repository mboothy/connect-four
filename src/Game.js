import React from 'react'
import Board from './Board'

const Game = () => {
    return (
        <div style={{height: 'fit-content', paddingBottom: '15vh'}}>
            <h1 className="text-6xl tracking-tight font-extrabold text-center text-gray-800">Connect Four</h1>
            <Board />
        </div>
    )
}

export default Game
