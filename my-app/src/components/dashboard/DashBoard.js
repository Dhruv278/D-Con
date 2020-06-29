import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../action/profileAction'
import Spinner from '../commen/spiner'
import { Link } from 'react-router-dom';
import Error from './../commen/error'
import  ProfileButton from './profileButton'
import {DeleteProfile} from './../../action/profileAction'
import {DeleteAccount} from './../../action/profileAction'
 import Experience from './Experience'
 import Education from './Education'
class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    deleteProfile=(e)=>{
        this.props.DeleteProfile()
    }
    deleteAccount=(e)=>{
        this.props.DeleteAccount()
    }
    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile
        // console.log(profile)
        let dashboardComponent;
        if (profile == null || loading) {
            dashboardComponent = <Spinner />
        } else {
            // dashboardComponent=<h1>Hello</h1>
            if (Object.keys(profile).length > 0) {
           dashboardComponent  =(
           <div><p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}> {user.name}</Link></p>
             <ProfileButton />
             <Experience experience={profile.experience} />
             <Education education={profile.education} />
             <div style={{ marginBottom:'80px'}}  />
             <button className="btn  btn-outline-danger" onClick={this.deleteProfile}>Delete Profile</button>
             <button className="btn btn-outline-danger " onClick={this.deleteAccount}>Delete Account</button>
                </div>
           )
            } else {
                //  user have no profile so send set profile button
                dashboardComponent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have no profile please create create profile</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile</Link>
                    </div>
                )
            }

        }
        return (
            <div>
                {this.props.errors.extra && (<Error
                    type="alert alert-danger"
                    error={this.props.errors.extra}
                />)}

                <div className="dashboard">
                    <div className="container dashContainer">
                        <div className="row">
                            <div className="col-md-12 dashColMd">
                                <h1 className="display-4">Dashboard</h1>
                                {dashboardComponent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateProps = state => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateProps, { getCurrentProfile,DeleteProfile,DeleteAccount })(Dashboard);