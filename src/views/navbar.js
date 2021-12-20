import React, { useState } from 'react'
import { Button } from './inserisciPersonale'
import { Link } from 'react-router-dom'

function Navbar () {
  return (
    <html>
      <head>
        <title>UnisaEat</title>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet'
          integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
          crossOrigin='anonymous'
        />

      </head>
      <body>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>Navbar</a>
            <button
              className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
              aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon' />
            </button>
            <div className='collapse navbar-collapse' id='navbarNavDropdown'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <a className='nav-link active' aria-current='page' href='#'>Home</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>Features</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>Pricing</a>
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle' href='#' id='navbarDropdownMenuLink' role='button'
                    data-bs-toggle='dropdown' aria-expanded='false'
                  >
                Dropdown link
                  </a>
                  <ul className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                    <li><a className='dropdown-item' href='#'>Action</a></li>
                    <li><a className='dropdown-item' href='#'>Another action</a></li>
                    <li><a className='dropdown-item' href='#'>Something else here</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </body>
    </html>
  )
}

export default Navbar
