import React from 'react'
import { Link } from 'react-router-dom'
const ProfileButton=()=> {
    return (
     
              <div className="btn-group mb-4 responsiveDash" role="group">
                <Link to="/edit-profile" className="btn btn-light responsiveDasslink">
                  <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
                <Link to="/add-experience" className="btn btn-light responsiveDasslink">
                  <i className="fab fa-black-tie text-info mr-1"></i>
                  Add Experience</Link>
                <Link to="/add-education" className="btn btn-light responsiveDasslink">
                  <i className="fas fa-graduation-cap text-info mr-1"></i>
                  Add Education</Link>
              </div>
    )
}

export default ProfileButton