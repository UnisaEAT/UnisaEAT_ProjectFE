import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
  componentDidMount () {
    localStorage.removeItem('email')
    localStorage.removeItem('ruolo')
    window.location.reload(false)
  }

  render () {
    return (
      <Redirect to='/' />
    )
  }
}
