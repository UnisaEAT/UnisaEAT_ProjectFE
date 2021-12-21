import React from 'react'
import "../App.css"
export function login () {
  return (
      <div className="login">
          <h2>LOGIN</h2>
            <form id="form_id" method="post" name="formLogin">
            <label>Email :</label>
            <div>
                <input type="text" name="email" id="email"/>
            </div>
            <label>Password :</label>
            <div>
                <input type="password" name="password" id="password"/>
            </div>
            <input type="button" value="Login" id="submit" onclick="validate()"/>
            </form>
      </div>
  )
}
export default login
