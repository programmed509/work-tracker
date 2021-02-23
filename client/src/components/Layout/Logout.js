import React, { useEffect, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext/userContext';
import TaskContext from '../../context/TaskContext/taskContext';

const Logout = () => {
    
    const taskContext = useContext(TaskContext);
    const userContext = useContext(UserContext);
    const history = useHistory();

    const { clearTasks } = taskContext;
    const { logout } = userContext;
      
    const redirect=()=>{
        logout();
        clearTasks();
        history.push('/Login');
        window.location.reload();      
    }

    return (
            <>
            <p>You are logging out...</p>
            { 
            redirect()}
            </>
    )
}

export default Logout
