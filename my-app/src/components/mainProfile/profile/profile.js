import React, { Component } from 'react';
import ProfileHeader from'./profileHeader'
import ProfileAbout from './profileAbout'
import ProfileCreds from './profileCreds'

import ProfileGithub from './profileGithub'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../../commen/spiner'
import { getProfileById } from '../../../action/profileAction'
import { Link, withRouter } from 'react-router-dom';
import isEmpty from'./../../../validation/isEmpty'

class Profile extends Component {
    componentDidMount(){
        if(this.props.match.params.id){
            // console.log(this.props.match.params.id)
            this.props.getProfileById(this.props.match.params.id)
        }
    }
   
    
    render() { 
        const {profile,loading} =this.props.profile;
        let profileContent;
        
        if(isEmpty(profile) ||loading){

            profileContent=<Spinner />
            window.setTimeout(()=>{
               window.location.assign('/profiles')
            },15000)
        }else{
            profileContent=(
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-secondary mb-3 float-left">Back TO Profiles</Link>
                        </div>
                        <div className="col-md-6"></div>


                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout  profile={profile} />
                    <ProfileCreds education={profile.education} experience={profile.experience} />
                    { profile.githubusername ? (<ProfileGithub username={profile.githubusername} />) :null }
                </div>

            )
        }
        return ( <div className="profile">
            <div className="container">
                <div className="row">
    <div className="col-md-12">{profileContent}</div>
                </div>
            </div>

        </div>  );
    }
}

Profile.propTypes={
    getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile
})
 
export default connect(mapStateToProps,{getProfileById})(withRouter(Profile));