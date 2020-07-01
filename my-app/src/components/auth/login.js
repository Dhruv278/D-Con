import React, { Component } from 'react';


import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginuser } from '../../action/authAction'

import { withRouter } from 'react-router-dom'
import TextFeildGroup from '../commen/inputFeild'
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  componentDidMount(){
    
    if(this.props.auth.isAuenticated){
      this.props.history.push('/dashboard')
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuenticated){
     this.props.history.push('/dashboard');
    }
    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
  }
  onchange = (e) => {


    this.setState({ [e.target.name]: e.target.value });

  }
  onsubmit = (event) => {


    event.preventDefault();
    
    
    const user={
      email:this.state.email,
      password:this.state.password
    }
   this.props.loginuser(user,this.props.history)
  }

  render() {
    const { errors } = this.state
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your D-Connector account</p>
              <form onSubmit={this.onsubmit}>
                <TextFeildGroup
                 type="email"
                 name="email"
                 value={this.state.email}
                 placeholder="Enter your Email id"
                 onChange={this.onchange}
                 error={errors.email}
                 />

                 <TextFeildGroup
                 type="password"
                 name="password"
                 value={this.state.password}
                 placeholder="Enter your password "
                 onChange={this.onchange}
                 error={errors.password}
                 />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateProps=state=>({
  auth:state.auth,
  errors:state.errors
})
export default connect(mapStateProps, { loginuser })(withRouter(Login));