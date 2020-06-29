import PropTypes from 'prop-types'
import React from 'react';
import classnames from 'classnames'


const TextArea = ({

    error,
    placeholder,
    onChange,
    value,
    name,
    info,
  
}) => {
    return (
        <div className="form-group">
            <textarea
             className={classnames("form-control form-control-lg", {
                'is-invalid':error
            })}
             placeholder={placeholder} 
             id="validationTextarea"
             onChange={onChange} 
             value={value} 
             name={name}
            required />
            {info && (<small  className="form-text text-muted mb-4">{info}</small>)}
            {{error} && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

TextArea.propTypes={
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
   error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
   
}


export default TextArea;