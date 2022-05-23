import './Navbar.css'

import React from 'react'

function Navbar() {
  return (
    <nav className="navigationWrapper">
  <div className="logoWrapper">
    <span className="stylish">Iris</span>
    <span className="logo">Predictor</span>
  </div>
  <ul className="navigation">
    <li className="parent">
        <a href="/" className='link'>Home</a>    
    </li>
    <li className="parent">
        <a className="link" href="/predict">Predict From Data</a>
    </li>
  </ul>
</nav>

  )
}

export default Navbar