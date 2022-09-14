import React from 'react'
import {Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        {/* <a href="index.html"><i className="fas fa-code"></i> DevBook</a> */}
        <Link className="fas fa-code" to ="/"role="button" > DevBook</Link>
      </h1>
      <ul>
      <Link  to ="/"role="button" >Developers</Link>
      <Link  to ="register"role="button" >Register</Link>   
      <Link  to ="login"role="button" >Login</Link>
      </ul>
    </nav>
  )
}

export default Navbar