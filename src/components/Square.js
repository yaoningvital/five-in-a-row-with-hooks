import React from 'react'

function Square (props) {
  let {index, value, handleClick, showWinStyle} = props
  return (
    <button
      className="square"
      onClick={() => handleClick(index)}
      style={{
        color: showWinStyle ? 'red' : 'black'
      }}
    >
      {value}
    </button>
  )
}

export default Square