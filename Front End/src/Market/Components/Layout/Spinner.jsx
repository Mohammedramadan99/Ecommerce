import React from 'react'

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div class="spinner-grow text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
