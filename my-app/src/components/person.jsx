import React from 'react'

export default function Person({name}) {
  return (
    <div>
      <p>My name's first letter is {name[0]}</p>
    </div>
  )
}
