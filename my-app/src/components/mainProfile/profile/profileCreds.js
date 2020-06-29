import React, { Component } from 'react';
import Moment from 'react-moment'
import isEmpty from '../../../validation/isEmpty';
class profileCreds extends Component {

    
    render() { 
        const { experience,education }=this.props;
        const expItems=experience.map(exp=>(
            <li key={exp._id} className="list-group-item">
                <h4>{exp.company}</h4>
                <p>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
        {exp.to===null ? (' Now') : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
                </p>
                <p>
        {isEmpty(exp.location) ? null : (<span><strong>Location:</strong>{exp.location}</span>)}
                </p>
                <p>
        {isEmpty(exp.discription) ? null : (<span><strong>Discription:</strong>{exp.discription}</span>)}
                </p>
            </li>
        ))
        const eduItems=education.map(edu=>(
            <li key={edu._id} className="list-group-item">
                <h4>{edu.college}</h4>
                <p>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
        {edu.to===null ? (' Now') : (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
                </p>
        <p><strong>Degree: </strong> {edu.degree}</p>
                <p>
         <strong>Field Of Study:</strong>{edu.fieldofstudy}
                </p>
                <p>
        {isEmpty(edu.discription) ? null : (<span><strong>Discription:</strong>{edu.discription}</span>)}
                </p>
            </li>
        ))
        return ( 
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    {expItems.length >0 ?(
                        <ul className="list-group">{expItems}</ul>
                    ):(
                        <p className="text-center">No Experience Listed</p>
                    )}

                </div>
                <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    {eduItems.length >0 ?(
                        <ul className="list-group">{eduItems}</ul>
                    ):(
                        <p className="text-center">No Education Listed</p>
                    )}

                </div>
            </div>
         );
    }
}
 
export default profileCreds;