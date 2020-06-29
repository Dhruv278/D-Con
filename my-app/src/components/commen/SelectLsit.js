import PropTypes from 'prop-types'
import React from 'react';
import classnames from 'classnames'


const SelectList = ({

    error,
 
    onChange,
    value,
    name,
    info,
    options
}) => {
    const selectOption = options.map(option => (
        <option key={option.lable} value={option.value}>{option.lable}</option>
    ))
    return (
        <div className="form-group mb-4">
            <select
                className={classnames("form-control form-control-lg custom-select", {
                    'is-invalid': error
                })}
                onChange={onChange}
                value={value}
                name={name}
                >
                    {selectOption}
                </select>
            {info && (<small className="form-text text-muted ">{info}</small>)}
            {{ error } && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

SelectList.propTypes = {
    name: PropTypes.string.isRequired,

    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    error:PropTypes.string

}



export default SelectList;