import{ React,useState} from 'react'
import {Link,Navigate } from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../../action/auth';



const Login = ({login,isAuthenticated}) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
  const onSubmit = e =>{
    e.preventDefault();
    login(email,password);
    
  }
//Rediret if login

if(isAuthenticated){
  return <Navigate to="/dashboard" />
}


  return (
    <>
  <div className="m-3">
      <h1 className="large text-primary">Sign IN</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Log in to your Account
      </p>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email}
            onChange={e=>onChange(e)} />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>onChange(e)}
            minLength="6"
          />
        </div>
       
        <input type="submit" className="btn btn-primary" value="SignIn" />
      </form>
      <p className="my-1">
        Do not have an account? <Link to="/register">Sign Up</Link>
      </p>
      </div>
  </>
  )
}

Login.propTypes={
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
}

const mapStateToProps= state=>({
  isAuthenticated:state.auth.isAuthenticated
})



export default connect(mapStateToProps,{login}) (Login)