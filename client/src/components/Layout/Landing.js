import React from 'react'
import {Link } from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';

const Landing = ({isAuthentecated}) => {

  if(isAuthentecated){
    return <Navigate to ='/dashboard'/>
  }
  return (
    <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Dev-Book</h1>
        <p className="lead">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        <div className="buttons">
        <Link className="btn btn-primary" to ="register"role="button" >SignUp</Link>
        <Link className="btn btn-light" to ="login"role="button" >LogIn</Link>

        </div>
      </div>
    </div>
  </section>
  )
}

Landing.propTypes ={
  isAuthentecated:PropTypes.bool
}

const mapStateToProps = state =>({
  isAuthentecated: state.auth.isAuthentecated
})


export default connect(mapStateToProps)(Landing)