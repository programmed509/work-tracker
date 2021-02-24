import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext/userContext';

const SecureRoute = ({component: Component, ...rest}) => {
    const context = useContext(UserContext);
    useEffect(()=>{
        authUser();
    },[])
    const { isAuthenticated, authUser, loading } = context;

    return (
        <Route {...rest} render={ props =>
        isAuthenticated && !loading  ? <Component {...props} /> : <Redirect to ='/Login'/>
        }/>
    )
}

export default SecureRoute;