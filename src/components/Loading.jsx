import React from 'react'
import './styles/Loading.css'

function Loading (props) {
  return (
    <div className={props.className || 'centered-content'}>
      <div className={`${props.size || 'medium'}-lds-ring`}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default Loading
