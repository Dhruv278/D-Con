import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextFeildGroup from './../commen/inputFeild'
import SelectList from './../commen/SelectLsit'
import { withRouter } from 'react-router-dom'
import Icon from './../commen/icon'
import isEmpty from './../../validation/isEmpty'
import TextArea from './../commen/TextArea'
import { createProfile,getCurrentProfile } from './../../action/profileAction'
class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            handle:'',
            displaySocialInputs: false,
            company: '',
            website: '',
         
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            instagram: '',
            youtube: '',
            linkedin: '',
            errors: {}
        }
    }
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit=(e)=>{
        e.preventDefault()
        console.log(this.state)
        this.props.createProfile(this.state,this.props.history)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            
            this.setState({errors:nextProps.errors})
        }
        if(nextProps.profile.profile){
            const profile =nextProps.profile.profile;
          // Bring skills array back to CSV
      const skillsCSV =!isEmpty(profile.skills)?profile.skills.join(','):'';

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram:profile.instagram,
      });
    }
        
    }
    render() {
        const { errors } = this.state
        // console.log(errors)
        const options = [
            { lable: 'Select Professional Status', value:''},
            { lable: 'Devloper', value: 'Devloper' },
            { lable: 'Junior Devloper', value: 'Junior Devloper' },
            { lable: 'Senior Devloper', value: 'Senior Devloper' },
            { lable: 'Full Stack Devloper', value: 'Full Stack Devloper' },
            { lable: 'Student', value: 'Student' },
            { lable: 'Instructor', value: 'Instructor' },
            { lable: 'App Devloper', value: 'App Devloper' },
            { lable: 'Other', value: 'Other' }
        ]
        let socialinputs;
        if (this.state.displaySocialInputs) {
            socialinputs = (
                <div>
                    <Icon
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}

                    />
                    <Icon
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}

                    />
                    <Icon
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}

                    />
                    <Icon
                        placeholder="Youtube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}

                    />
                    <Icon
                        placeholder="Linkein Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}

                    />


                </div>
            )
        }
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Profile</h1>
                            
                            <form onSubmit={this.onSubmit}>
                                <TextFeildGroup
                                    placeholder="handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    info="A unique handle for your profile URL.You can enter your name,your company name,nickname"
                                    required={true}
                                    error={errors.handle}
                                />
                                <SelectList
                                    placeholder="status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info=" Please Select your proper status for make your profile more powerful"
                                    
                                />

                                <TextFeildGroup
                                    placeholder="company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Give your company name where you work or your own company name"
                                    
                                />
                                 <TextFeildGroup
                                    placeholder="Company website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Add your company website or your own created website"

                                />
                                <TextFeildGroup
                                    placeholder="location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City,state eg.(Mumbai,Maharastra)"

                                />
                                  <TextFeildGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="City,state eg.(Mumbai,Maharastra)"

                                />
                                <TextFeildGroup
                                    placeholder="skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please enter your skill (eg. HTML,CSS,NODE JS ....)"
                                    required={true}
                                />
                                <TextArea
                                    placeholder="Short Bio"
                                    name='bio'
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"

                                />
                                <div className="mb-3">
                                    <button type="button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            this.setState(prestate => ({
                                                displaySocialInputs: !prestate.displaySocialInputs
                                            })
                                            )
                                        }}

                                        className="btn btn-secondary">
                                        Add Social Network Links
                                     </button>
                                    <span className="text-muted mx-3">(Optional)</span>
                                </div>
                                {socialinputs}
                                <button type="submit" value="submit" className="btn btn-info btn-block mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
EditProfile.propTypes = {
    createProfile:PropTypes.func.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors

})

export default connect(mapStateToProps,{ createProfile,getCurrentProfile })(withRouter(EditProfile));