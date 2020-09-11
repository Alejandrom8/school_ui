import React from 'react';

function Error({error}) {

    console.log(error);
    return (
        <div>
            <h4>Error</h4>
            <p>{error.message}</p>
        </div>
    )
}

export default Error;