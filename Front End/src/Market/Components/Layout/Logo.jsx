import React from 'react'
import {Link} from 'react-router-dom'

export default function Logo() {
  return (
      <div className="logo">
          <Link to='/' className="logo_link">moRa</Link>
      </div>
  )
}
