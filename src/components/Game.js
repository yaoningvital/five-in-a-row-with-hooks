import React, { useEffect, useState } from 'react'
import Board from './Board'
import { calculateWinner, getStatus } from '../utils'

function Game () {
  // 1、得到棋盘的 行数 和 列数
  let [layoutNum, setLayoutNum] = useState({rowNum: 0, columnNum: 0})
  useEffect(() => {
    let columnNum = parseInt((document.documentElement.clientWidth - 270) / 40)
    let rowNum = parseInt((document.documentElement.clientHeight - 80) / 40)
    setLayoutNum({rowNum, columnNum})
  }, [])
  
  // 2、下一步棋玩家是谁
  let [xIsNext, setXIsNext] = useState(true)
  
  // 3、胜出的棋子的索引
  let [winnerIndices, setWinnerIndices] = useState([])
  
  // 3、棋子布局 squares
  let initialSquares = Array(layoutNum.columnNum * layoutNum.rowNum).fill(null)
  let [squares, setSquares] = useState(initialSquares)
  
  function handleClick (index) {
    let new_squares = squares.slice()
    let winnerObj = calculateWinner(new_squares, layoutNum.rowNum, layoutNum.columnNum)
    // a) 首先判断能不能落子，不能落子就返回
    if (winnerObj || new_squares[index]) return
    
    // 到这里，表示这个格子可以落子。首先要做的就是落子操作
    new_squares[index] = xIsNext ? 'X' : 'O'
    setSquares(new_squares)
  
    // 更新下一步玩家
    setXIsNext(!xIsNext)
  
    // 落完子之后，判断现在有没有人胜出。如果有人胜出，要更新 胜出者 的样式
    let newWinnerObj = calculateWinner(new_squares, layoutNum.rowNum, layoutNum.columnNum)
    if (newWinnerObj) {
      setWinnerIndices(newWinnerObj.indices)
    }
    
    
  }
  
  
  return (
    <div className="game">
      <Board
        rowNum={layoutNum.rowNum}
        columnNum={layoutNum.columnNum}
        squares={squares}
        winnerIndices={winnerIndices}
        handleClick={handleClick}
      />
      <div className="status-area">
        <p>{getStatus(squares, layoutNum, xIsNext)}</p>
      </div>
    </div>
  )
}

export default Game