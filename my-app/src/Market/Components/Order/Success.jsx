import React from 'react'
import {Link} from 'react-router-dom'
function Success() {
  return (
    <div>
      Success
      <Link to="/orders"> show orders </Link>
    </div>
  )
}

export default Success