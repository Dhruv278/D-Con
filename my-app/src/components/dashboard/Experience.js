import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import  Moment from 'react-moment'
import {deleteExperience} from './../../action/profileAction'
class Experience extends Component {

    render() { 
       const onDelete=(id)=>{
           this.props.deleteExperience(id)
        }
        const experience=this.props.experience.map(exp=>(
            <tr key={exp._id} className="expTable">
            

                <td>{exp.company}</td>
                <td>{exp.title}</td>

        <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
    
        {exp.to===null ? (" Now") : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}

        </td>
               
       
                <td><button className="btn btn-danger" onClick={()=>onDelete(exp._id)}>Delete</button></td>
      

            </tr>
        ))
        return (
            <div>
                <h4 className="mb-4"> Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {experience}
                    </tbody>
                </table>

            </div>
          );
    }
}

Experience.propTypes={
    deleteExperience:PropTypes.func.isRequired
}
export default connect(null,{deleteExperience})(Experience);