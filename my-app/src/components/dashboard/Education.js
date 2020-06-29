import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {deleteEducation} from '../../action/profileAction'
class Education extends Component {

    render() { 
       const onDelete=(id)=>{
           this.props.deleteEducation(id)
        }
        const education=this.props.education.map(exp=>(
         

            <tr key={exp._id}>
                <td>{exp.college}</td>
                <td>{exp.degree}</td>
                <td>{exp.fieldofstudy}</td>
          
        

                <td><button className="btn btn-danger" onClick={()=>onDelete(exp._id)}>Delete</button></td>
       
            </tr>

        ))
        return (
            <div>
                <h4 className="mb-4"> Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>College</th>
                            <th>Degree</th>
                            <th>Field</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {education}
                    </tbody>
                </table>

            </div>
          );
    }
}

Education.propTypes={
    deleteEducation:PropTypes.func.isRequired
}
export default connect(null,{deleteEducation})(Education);