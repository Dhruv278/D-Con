import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import TextFeildGroup from './../commen/inputFeild'

import TextArea from './../commen/TextArea'
import { addEducation} from './../../action/profileAction'


class AddEducation extends Component {
    constructor(){
        super()
        this.state={
            college:'',
            degree:'',
            fieldofstudy:'',
            from:'',
            to:'',
            current:false,
            disabled:false,
            errors:{},
            discription:''
        }
    }
    onChange=(e)=>{ 
        this.setState({ [e.target.name]: e.target.value })
 
    }
    onSubmit=(e)=>{
     e.preventDefault()
     console.log(this.state)
     this.props.addEducation(this.state,this.props.history)
    }
    onClick=()=>{
        this.setState({
            disabled:!this.state.disabled,
            current:!this.state.current
        })

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }
    render() { 
        const { errors }=this.state;
  
        return (  
            <div className="add-experience">
               <div className="container">
                   <div className="row">
                       <div className="col-md-8 m-auto">
                           <Link to="/dashboard" className="btn btn-secondary">Go Back</Link>
                           <h1 className="display-4 text-center">Add Experience</h1>
                           <p className="lead text-center">Add any job or position experience that you have experienced in past or in current</p>
                           <form onSubmit={this.onSubmit}>
                               <TextFeildGroup 
                               placeholder="College"
                               name="college"
                               value={this.state.college}
                               onChange={this.onChange}
                               error={errors.college}
                               required={true}
                               />
                               <TextFeildGroup 
                               placeholder="Degree"
                               name="degree"
                               value={this.state.degree}
                               onChange={this.onChange}
                               error={errors.degree}
                               required={true}
                               />
                               <TextFeildGroup 
                               placeholder="Field of Study"
                               name="fieldofstudy"
                               value={this.state.fieldofstudy}
                               onChange={this.onChange}
                               error={errors.fieldofstudy}
                               required={true}
                               />
                               <h6>Job Starting DATE</h6>
                               <TextFeildGroup 
                               
                               type="date"
                               name="from"
                               value={this.state.from}
                               onChange={this.onChange}
                               error={errors.from}
                               required={true}
                               />
                               <h6>TO DATE</h6>
                               <TextFeildGroup 
                               type="date"
                               name="to"
                               value={this.state.to}
                               onChange={this.onChange}
                               error={errors.to}
                               disabled={this.state.disabled?'disabled':''}
                               />
                               <div className="form-check mb-4">
                                   <input type="checkbox" 
                                   className="form-check-input"
                                   name="current"
                                   value={this.state.current}
                                   checked={this.state.current}
                                   onChange={this.onClick}
                                   id='current'

                                   ></input>
                                   <label htmlFor="current" className="form-check-lable">
                                       Current Working
                                   </label>
                               </div>
                               <TextArea 
                               placeholder=''
                               name="discription"
                               value={this.state.discription}
                               onChange={this.onChange}
                               error={errors.jobdiscription}
                               info="Tell us about your College Project"
                               />

                        <button type="submit" value="submit" className="btn btn-info btn-block mt-4" >Submit</button>
                             
                           </form>
                       </div>
                   </div>
               </div>
            </div>
        );
    }
}
AddEducation.propsTypes={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    addEducation:PropTypes.func.isRequired
}
 const mapStateToProps=state=>({
   errors:state.errors,
   profile:state.profile
 })
export default connect(mapStateToProps,{addEducation})(withRouter(AddEducation));