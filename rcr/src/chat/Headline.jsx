import React from 'react'

export default ({ name, numberOfUsers }) =>
  <div> @{name} <span className="indicate">{numberOfUsers || 0}</span> </div>
