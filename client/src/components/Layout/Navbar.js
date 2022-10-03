import React from 'react'
import {Link } from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../action/auth';

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {

  const authLinks =(
    <ul>
      <li>
      
        <Link  to='/dashboard'>
        <i className='fas fa-user'></i>{' '}Dashboard</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          LOGOUT</a>
      </li>
    </ul>
  );

  const guestLinks =(
    <ul>
    <Link  to ="/"role="button" >Developers</Link>
    <Link  to ="register"role="button" >Register</Link>   
    <Link  to ="login"role="button" >Login</Link>
    </ul>
  );




  return (
    <nav className="navbar bg-dark">
      <h1>
       
        <Link className="fas fa-code" to ="/"role="button" > DevBook</Link>
      </h1>
      {!loading && (<>{isAuthenticated?authLinks:guestLinks}</>)}
      
    </nav>
  )
}

Navbar.propTypes={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps =state =>({
  auth:state.auth
})

export default connect(mapStateToProps,{logout}) (Navbar)