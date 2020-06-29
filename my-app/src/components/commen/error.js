import React from 'react';
import PropTypes from 'prop-types'

const Error=({
    error,
    type
})=>{
    return(
        <div className={type} role="alert">
{error}
</div>
    )
}

Error.propTypes={
    error:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired
}

export default Error;

