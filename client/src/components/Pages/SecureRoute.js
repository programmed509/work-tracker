import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({component: Component, ...rest}) => {
    
    const token = localStorage.getItem('token');

    return (
        <Route {...rest} render={ props =>
        (token) ? <Component {...props} /> : <Redirect to ='/Login'/>
        }/>
    )
}

export default SecureRoute;