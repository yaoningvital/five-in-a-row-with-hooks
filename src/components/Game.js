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
  
  // 3、胜出的棋子的索引
  let [winnerIndices, setWinnerIndices] = useState([])
  
  // 4、当前步骤
  let [currentStep, setCurrentStep] = useState(0)
  
  // 5、棋子布局 squares
  let initialSquares = Array(layoutNum.columnNum * layoutNum.rowNum).fill(null)
  let initialHistory = [
    {squares: initialSquares}
  ]
  let [history, setHistory] = useState(initialHistory)
  
  /**
   * 处理点击棋盘里的格子(处理落子操作)
   * @param index ：格子所在的索引
   */
  function handleClick (index) {
    let new_history = history.slice()
    let new_squares = history[currentStep].squares.slice()
    let winnerObj = calculateWinner(new_squares, layoutNum.rowNum, layoutNum.columnNum)
    // a) 首先判断能不能落子，不能落子就返回
    if (winnerObj || new_squares[index]) return
    
    // 到这里，表示这个格子可以落子。首先要做的就是落子操作
    new_squares[index] = currentStep % 2 === 0 ? 'X' : 'O'
    new_history = new_history.slice(0, currentStep + 1)
    new_history.push({squares: new_squares})
    setHistory(new_history)
    
    // 更新当前步骤
    setCurrentStep(currentStep + 1)
    
    // 落完子之后，判断现在有没有人胜出。如果有人胜出，要更新 胜出者 的样式
    resetWinnerIndices(new_squares, layoutNum)
  }
  
  function resetWinnerIndices (squares, layoutNum) {
    let newWinnerObj = calculateWinner(squares, layoutNum.rowNum, layoutNum.columnNum)
    if (newWinnerObj) {
      setWinnerIndices(newWinnerObj.indices)
    } else {
      setWinnerIndices([])
    }
  }
  
  /**
   * 处理回退到某一步
   * @param step
   */
  function handleBackTo (step) {
    setCurrentStep(step)
    resetWinnerIndices(history[step].squares, layoutNum)
  }
  
  
  return (
    <div className="game">
      <Board
        rowNum={layoutNum.rowNum}
        columnNum={layoutNum.columnNum}
        squares={history[currentStep].squares}
        winnerIndices={winnerIndices}
        handleClick={handleClick}
      />
      <div className="status-area">
        <p>{getStatus(history[currentStep].squares, layoutNum, currentStep)}</p>
        <div className="history">
          <h3>历史记录：</h3>
          {
            history.map((stepItem, step) => {
              let desc = step ? `回退到第${step}步` : '重新开始游戏'
              
              return (
                <button
                  key={step}
                  onClick={() => handleBackTo(step)}
                >{desc}</button>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Game