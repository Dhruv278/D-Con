import PropTypes from 'prop-types'
import React from 'react';
import classnames from 'classnames'


const Icon = ({

    error,
    placeholder,
    onChange,
    value,
    name,
    type,
    icon
  
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}></i>
                </span>
            </div>

            <input
            
             className={classnames("form-control form-control-lg", {
                'is-invalid':error
            })}
            aria-hidden="true"
             placeholder={placeholder} 
             onChange={onChange} 
             value={value} 
             name={name}
         />
           
            {{error} && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

Icon.propTypes={
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
   
   error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
   icon:PropTypes.string,
   type:PropTypes.string,
}

Icon.defaultProps={
    type:'text'
}

export default Icon;