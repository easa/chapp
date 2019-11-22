import React from 'react'

export default ({ activeChat }) =>
  activeChat ?
    <div>
      <span className="username">@{activeChat.name || '-------'}</span>
      <span className="indicate">{activeChat.numberOfUsers || 0}</span>
    </div>
    : <div><span className="username">^___^</span></div> 

