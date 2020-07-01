import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import TextFeildGroup from './../commen/inputFeild'

import TextArea from './../commen/TextArea'
import { addExperience} from './../../action/profileAction'


class AddExperience extends Component {
    constructor(){
        super()
        this.state={
            company:'',
            title:'',
            location:'',
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
    //  console.log(this.state)
     this.props.addExperience(this.state,this.props.history)
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
                               placeholder="Company"
                               name="company"
                               value={this.state.company}
                               onChange={this.onChange}
                               error={errors.company}
                               required={true}
                               />
                               <TextFeildGroup 
                               placeholder="Job Title"
                               name="title"
                               value={this.state.title}
                               onChange={this.onChange}
                               error={errors.title}
                               required={true}
                               />
                               <TextFeildGroup 
                               placeholder="Job Location"
                               name="location"
                               value={this.state.location}
                               onChange={this.onChange}
                               error={errors.location}
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
                               placeholder='Job discription'
                               name="discription"
                               value={this.state.discription}
                               onChange={this.onChange}
                               error={errors.jobdiscription}
                               info="Tell us about your current or past job"
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
AddExperience.propsTypes={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    addExperience:PropTypes.func.isRequired
}
 const mapStateToProps=state=>({
   errors:state.errors,
   profile:state.profile
 })
export default connect(mapStateToProps,{addExperience})(withRouter(AddExperience));