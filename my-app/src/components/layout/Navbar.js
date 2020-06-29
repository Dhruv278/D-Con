import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { LogoutUser } from '../../action/authAction';
import { connect } from 'react-redux';
import { removeProfile } from '../../action/profileAction'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'


class Navbar extends Component {
  logoutUser = (e) => {
    e.preventDefault();
    this.props.LogoutUser();
    this.props.removeProfile()
  this.props.history.push('/')
  }
  render() {
    const { isAuenticated, user } = this.props.auth

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
          
        </li>
      </ul>
    )
   
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link cursor" onClick={this.logoutUser}>
            Logout
        </a>
        </li>
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/post">Posts</Link>
        <li className="nav-item">
          {user.photo && (<img src={`./media/${user.photo}`} alt="UserPhoto" className="imgsrc" ></img>)}
          

        </li>

      </ul>
    )
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">D-Connector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers
                    </Link>
              </li>
            </ul>
            {isAuenticated ? authLinks : guestLinks}

          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  LogoutUser: PropTypes.func.isRequired,
  removeProfile:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,

})
export default connect(mapStateToProps, { LogoutUser,removeProfile })(withRouter(Navbar));