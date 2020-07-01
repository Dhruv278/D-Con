import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react';
import {storage} from '../../firebase/index'

import { connect } from 'react-redux'
import { registerUser } from './../../action/authAction'
import TextFeildGroup from '../commen/inputFeild'
class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            file: null,
            src: 'img/imgdp/default.jpg',
            errors: {}
        }
    }
    componentDidMount(){
       
        if(this.props.auth.isAuenticated){
            this.props.history.push('/dashboard')
        }
      }
    onChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }
    setFile = (e) => {
        try {
            this.setState({ file: e.target.files[0] })
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {

                    this.setState({ src: reader.result })
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } catch (err) {

            // this.setState({ src: 'img/imgdp/default.jpg' })
            // this.setState({ file:null })
        }
    }
    onsubmit = (event) => {
        event.preventDefault()
        // console.log('working')
        if (this.state.file !== null) {
            let image = this.state.file
            const defaultdate=`${Date.now()}`
            const uploadTask = storage.ref(`userimages/${defaultdate}`).put(image)
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage.ref('userimages')
                        .child(defaultdate)
                        .getDownloadURL()
                        .then(url => {
                            const obj = {
                                name: this.state.name,
                                email: this.state.email,
                                password: this.state.password,
                                confirm_password: this.state.confirm_password,
                                file: url
                            }
                            console.log(obj)
                            this.props.registerUser(obj,this.props.history)
                            
                        })
                }
            )
        } else {
            const obj = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirm_password: this.state.confirm_password,
                file: null
            }
            console.log(obj)
            this.props.registerUser(obj,this.props.history)
        }
        
      

    }
    setDefault=(e)=>{
        this.setState({src:'img/imgdp/default.jpg',file:null})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    render() {
        const { errors } = this.state;


        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your D-Connector account</p>

                            <form id="signupform" onSubmit={this.onsubmit} >

                            <TextFeildGroup
                                    type="name"
                                    name="name"
                                    value={this.state.name}
                                    placeholder="Enter your Name"
                                    onChange={this.onChange}
                                    error={errors.name}
                                    />
                                 <TextFeildGroup
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    placeholder="Enter your Email"
                                    onChange={this.onChange}
                                    error={errors.email}
                                    />
                                <TextFeildGroup
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    placeholder="Enter your password"
                                    onChange={this.onChange}
                                    error={errors.password}
                                    info="Please enter password greter than 6 character"
                                    />
                               <TextFeildGroup
                                    type="password"
                                    name="confirm_password"
                                    value={this.state.confirm_password}
                                    placeholder="Confirm the Password"
                                    onChange={this.onChange}
                                    error={errors.password}
                                    />
                                <div className="form-group profileimg">
                                    <img className="dpimg" src={this.state.src} alt="Profile"></img>
                                    <label className="btn btn-danger" onClick={this.setDefault}> Default
                                    </label>
                                    <label className="btn btn-primary m-2">Profile Photo
                                    <input type="file" id="inputImage" className="form-control form-control-lg" onChange={this.setFile} placeholder="Display photo" name="file" accept="image/*" />
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-info btn-block mt-4">Sign Up</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,

    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { registerUser })(withRouter(Signup));