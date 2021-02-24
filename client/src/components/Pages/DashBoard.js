import React,{ useContext, useEffect } from 'react';
import AssignedTasks from '../Task/AssignedTasks';
import SubmittedTasks from '../Task/SubmittedTasks';
import TaskForm from '../Task/TaskForm';
import UserContext from '../../context/UserContext/userContext'
import MenuButton from '../Layout/MenuButton';

const DashBoard = () => {
    useEffect(() => {
        authUser();
    },[])
    
    const userContext = useContext(UserContext);
    const { authUser, user } = userContext;

    return(
        <>
            <div className="row">
                <div className="col m4">
                    <SubmittedTasks/>
                </div>
                <div className="col m4">
                    <AssignedTasks/> 
                </div>
                <div className="col m4 sticky">
                    <TaskForm/> 
                </div>
                { user && <MenuButton/>}
            </div>
        
        </>
    )
}

export default DashBoard;
