import React from 'react'
import Square from './Square'
import { generateArray } from '../utils'

function Board (props) {
  let {rowNum, columnNum, squares, winnerIndices, handleClick} = props
  let rowNumArr = generateArray(rowNum, columnNum)
  
  return (
    <div className="board">
      {
        rowNumArr.map((rowItem, rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {
                rowItem.map((item, columnIndex) => {
                  return (
                    <Square
                      key={columnIndex}
                      index={item}
                      value={squares[item]}
                      handleClick={handleClick}
                      showWinStyle={winnerIndices.includes(item)}
                    />
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Board