import React from 'react'

const Cell = ({status, addColumn}) => {
    return (
        <div className="gameCell bg-gray-800 flex items-center justify-center" onClick={addColumn}>
            <div className={`gameCell-status bg-${status}-500 ${status === 'empty' ? 'empty' : ''}`}>

            </div>
        </div>
    )
}

export default Cell
