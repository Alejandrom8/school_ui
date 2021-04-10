import React from 'react'

import '../styles/ToolBar.css'

function Tool (props) {
  return (
    <div key={props.id} className='Tool'>
      <div className='Tool__content'>
        <span className='Tool-title'>Tarea</span>
        <p>I am a very simple card. I am good at containing small.</p>
      </div>
    </div>
  )
}

export default function TodoBar (props) {
  return (
    <div className='ToolBar'>
      {props.todo.map(item => (
        <Tool id={item} />
      ))}
    </div>
  )
}
