import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../action/postAction'
import TextArea from '../commen/TextArea'
import isEmpty from '../../validation/isEmpty'
import { storage } from '../../firebase/index'

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: '',
            src: '',
            file: null,
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.file !== null) {
            let image = this.state.file
            const uploadTask = storage.ref(`images/${image.name}`).put(image)
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage.ref('images')
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            const obj = {
                                text: this.state.text,
                                file: url
                            }
                            console.log(obj)
                            this.props.addPost(obj)
                        })
                }
            )
        } else {
            const obj = {
                text: this.state.text,
                file: null,
            }
            console.log(obj)
            this.props.addPost(obj)
        }
        //  this.props.addPost(form)
    }
    setDefault = (e) => {

        this.setState({ src: '' })
        this.setState({ file: null })
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

            this.setState({ src: '' })
            this.setState({ file: null })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Say Somthing...
              </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextArea
                                    placeholder="Create a Post"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                            </div>
                            <div className="form-group profileimg">
                                {isEmpty(this.state.src) ? (<label className="m-2 btn btn-primary ">Post Photo
                                    <input type="file" id="inputImage" className="form-control form-control-lg" onChange={this.setFile} placeholder="Display photo" name="file" accept="image/*" />
                                </label>) : (
                                        <div >
                                            <img className="postimg" src={this.state.src} alt="Profile"></img>
                                            <label className=" m-2 btn btn-danger" onClick={this.setDefault}> Cancle Photo
                                         </label>
                                            <label className=" m-2 btn btn-primary">Change Photo
                                         <input type="file" id="inputImage" className="form-control form-control-lg" onChange={this.setFile} placeholder="Display photo" name="file" accept="image/*" />
                                            </label>
                                        </div>
                                    )}

                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapstateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapstateToProps, { addPost })(PostForm);