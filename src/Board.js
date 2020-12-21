import React, {useState, useEffect} from 'react'
import Cell from './Cell'

const Board = () => {

    const boardWidth = 7;
    const boardLength = 6;
    const [renderedCells, setRenderedCells] = useState();
    const [boardState, setBoardState] = useState([]);
    const [turn, setTurn] = useState(true);

    const [ p1Score, setP1Score] = useState(0)
    const [ p2Score, setP2Score] = useState(0)

    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    const newGame = () => {
        
        createGame();
        setGameOver(false)
        setWinner(null)
    }

    const createGame = () => {
        let arr = []
        for(var i = 0; i < boardWidth; i++){
            arr.push([])
            for(var k=0; k< boardLength;k++){
                const x = 'empty';
                arr[i].push({
                    status: x,
                    column: k,
                    row: i,
                })
            }
        }
        setBoardState(arr, renderCells())
    }

    const addColumn = async (columnId) => {
        let newRowId;
        let full = false;
        for(var i = boardLength; i >= 0; i--){
            if( i > 0){
                if(boardState[i][columnId].status === 'empty') {
                    newRowId = i;
                    break ;
                } else {
                    continue ;
                }
            } else if (i <= 0){
                if(boardState[i][columnId].status === 'empty') {
                    newRowId = 0;
                    break ;
                } else {
                    full = true;
                    break;
                }
            }
        }
        if(!full){
            const newArr = boardState;
            let newVal;
           await  setTurn(p => {
                newVal = p ? "blue" : 'red';
                return !p
            })
            newArr[newRowId][columnId].status = newVal;
            await setBoardState(newArr, renderCells());
            checkCells();
            
        }
    }

    const renderCells = () => {
        const cells = boardState.map(i => {
            return i.map(k => {
                return <Cell key={`${k.row}-${k.column}`} addColumn={() => addColumn(k.column)} status={k.status} />
            })
            
        })

        setRenderedCells(cells)
    }

    const checkCells = () => {
        let gridFull = true;
        for( var i =0; i < boardState[0].length; i++){
            if(boardState[0][i].status === 'empty'){
                gridFull = false;
                break;
            }
        }
        // for(var i=0; i < boardState.length; i++){
        //     boardState[i].map(k)
        // }
        boardState.map(i => {
            console.log('in i')
            i.map(k => {
                console.log('in k')
                if(boardState[k.row + 3]){
                    console.log('in if 1')
                    if(
                        (boardState[k.row][k.column].status === boardState[k.row + 1][k.column].status) &&
                        (boardState[k.row][k.column].status === boardState[k.row + 2][k.column].status) &&
                        (boardState[k.row][k.column].status=== boardState[k.row + 3][k.column].status) &&
                        (boardState[k.row][k.column].status !== 'empty')
                        ){
                        setGameOver(true)
                        setWinner(k.status)
                    } else if (boardState[k.row][k.column + 3]){
                        if(
                            (boardState[k.row][k.column].status === boardState[k.row + 1][k.column + 1].status) &&
                            (boardState[k.row][k.column].status === boardState[k.row + 2][k.column + 2].status) &&
                            (boardState[k.row][k.column].status=== boardState[k.row + 3][k.column + 3].status) &&
                            (boardState[k.row][k.column].status !== 'empty')
                        ){
                            setGameOver(true)
                            setWinner(k.status)
                        }
                    } else if (boardState[k.row][k.column - 3]) {
                        if(
                            (boardState[k.row][k.column].status === boardState[k.row + 1][k.column - 1].status) &&
                            (boardState[k.row][k.column].status === boardState[k.row + 2][k.column - 2].status) &&
                            (boardState[k.row][k.column].status=== boardState[k.row + 3][k.column - 3].status) &&
                            (boardState[k.row][k.column].status !== 'empty')
                        ){
                            setGameOver(true)
                            setWinner(k.status)
                        }
                    }
                } else if (boardState[k.row][k.column + 3]){
                    if(
                        (boardState[k.row][k.column].status === boardState[k.row][k.column + 1].status) &&
                        (boardState[k.row][k.column].status === boardState[k.row][k.column + 2].status) &&
                        (boardState[k.row][k.column].status=== boardState[k.row][k.column + 3].status) &&
                        (boardState[k.row][k.column].status !== 'empty')
                        ){
                        setGameOver(true)
                        setWinner(k.status)
                    }
                }
                return;
            })
        })
        
        
        
        if(gridFull && !gameOver) {
            setGameOver(true)
            setWinner('draw')
        }
    }

    useEffect(() => {
       createGame()


    }, []);
    useEffect(() => {
        if(winner === "red"){
            setP1Score(p1Score + 1)
        } else if (winner === "blue"){
            setP2Score(p2Score + 1)
        }

    }, [winner]);

    useEffect(() => {
        renderCells()
    }, [boardState])


    return (
        <div className="flex flex-col items-center justify-center pt-8">
            <div className="stats font-bold text-center text-gray-700 text-2xl flex flex-col justify-around items-center">
                {/* <h2>Current Turn: Player {turn}</h2> */}
                <div className="scores flex justify-center" style={{width: '750px'}}>
                    <div className={`playerScore text-white text-center py-2 rounded-tl-3xl
                    ${!turn ? 'bg-red-500' : 'bg-red-300'}
                    `}>
                        X Score: {p1Score}
                    </div>
                    <div className={`playerScore text-white text-center py-2 rounded-tr-3xl
                    ${turn? 'bg-blue-500' : 'bg-blue-300'}
                    `}>
                        O Score: {p2Score}
                    </div>
                </div>
            </div>
            <div className="gameParent">
                <div className={`gameBoard grid grid-cols-${boardWidth-1} grid-rows-${boardLength-1}` } style={{width: `${75*(boardWidth-1)}px`}}>
                    {renderedCells}
                </div>
                {gameOver? 
                <div className="flex justify-center flex-col gameOver bg-green-600 text-white rounded-md p-4 shadow-md opacity-90">
                    <h1 className="font-bold text-center text-white text-6xl">Game Over</h1>
                    <h3 className="capitalize text-base text-center text-2xl">{winner === 'blue' || winner === 'red'? ` ${winner} is the Winner`: "Draw"}</h3>
                    <p className="newGame flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white hover:text-green-200 text-lg" onClick={newGame}>New Game?</p>
                </div>  : ''} 
            </div>
        </div>
    )
}

export default Board
