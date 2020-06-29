import PropTypes from 'prop-types'
import React from 'react';
import classnames from 'classnames'


const TextFeildGroup = ({
    type,
    error,
    placeholder,
    onChange,
    value,
    name,
    info,
    disabled,
    required
}) => {
    return (
        <div className="form-group  mb-4">
            <input type={type} className={classnames("form-control form-control-lg", {
                'is-invalid':error
            })} placeholder={placeholder} onChange={onChange} value={value} name={name}
            disabled={disabled} required={required} />
            {info && (<small  className="form-text text-muted">{info}</small>)}
            {{error} && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

TextFeildGroup.propTypes={
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    type:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    disabled:PropTypes.string,
    required:PropTypes.bool,
}

TextFeildGroup.defaultProps={
    type:'text',
    required:false
}

export default TextFeildGroup;