import React , { useReducer } from 'react';
import TaskReducer from './taskReducer';
import TaskContext from './taskContext';
import axios from 'axios';
import {
TASK_ERROR,
SUBMITTED_TASKS,
ASSIGNED_TASKS,
CLEAR_TASKS,
ADD_TASK,
DELETE_TASK,
SET_LOADING,
UPDATE_TASK,
SEARCH_TASKS,
CLEAR_SEARCH,
CLEAR_MESSAGE,
} from '../types'

const TaskState = props =>{
    const initialState = {
        assignTasks: null,
        submitTasks: null,
        error: null,
        loading: false,
        filteredSubmit: null,
        filteredAssign: null
    }

    const [ state, dispatch ] = useReducer(TaskReducer, initialState);     
    
    //addTask
    const addTask=async (task)=>{
        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }

        try {
            const res = await axios.post('/api/tasks/', task, config)

            dispatch({
                type: ADD_TASK,
                payload: res.data 
            })
        }
        
        catch (error) {
            console.log(error)

            dispatch({
                type: TASK_ERROR,
                payload: error.response.data.msg
            })
        }        
    }

    //loadTasks
    const submittedTasks = async (sort) =>{
        setLoading();
        const config = {
            headers:{
                'x-auth-token': localStorage.getItem('token')
            }
        }
        try {
            const res = await axios.get(`/api/tasks/submitted/${sort}`, config)
            
            dispatch({
                type: SUBMITTED_TASKS,
                payload: res.data 
            })
        }
        catch (error) {
            console.log(error)

            dispatch({
                type: TASK_ERROR,
                payload: error.response.data
            })
        }  
    }

    const assignedTasks = async (sort) =>{
        setLoading();
        const config = {
            headers:{
                'x-auth-token': localStorage.getItem('token')
            }
        }
        try {
            const res = await axios.get(`/api/tasks/assigned/${sort}`, config)
            
            dispatch({
                type: ASSIGNED_TASKS,
                payload: res.data 
            })
        }
        catch (error) {
            console.log(error)

            dispatch({
                type: TASK_ERROR,
                payload: error.response.data.msg
            })
        }  
    }

    //deleteTask
    const deleteTask=async (id)=>{
        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth-token':localStorage.getItem('token'),
            }
        }

        try {
            await axios.delete(`/api/tasks/${id}`,config)

            dispatch({
                type: DELETE_TASK,
                payload: id 
            })
        }
        catch (error) {
            console.log(error)

            dispatch({
                type: TASK_ERROR,
                payload: error.response.data.msg
            })
        }  
    }

    //changeStatus
    const updateTask = async (task) => {  
        setLoading();
        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth-token':localStorage.getItem('token')
            }
        }

        try {
            const res = await axios.put(`/api/tasks/${task.id}`, task, config)

            dispatch({
                type: UPDATE_TASK,
                payload: res.data 
            })
        }
        catch (error) {
            console.log(error)

            dispatch({
                type: TASK_ERROR,
                payload: error.response.data.msg
            })
        }  
    }

    const setLoading=()=>{
        dispatch({
            type: SET_LOADING
        })
    }

    //search tasks
    const search = (text)=>{
        dispatch({
            type: SEARCH_TASKS,
            payload: text
        })
    }

    const clearSearch = ()=>{
        dispatch({
            type: CLEAR_SEARCH
        })
    }

    //clear tasks
    const clearTasks = () => {
        dispatch({
            type: CLEAR_TASKS
        }) 
    }

    const clearMessage = async (id) =>{   
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }
        try 
        {
            const res = await axios.post(`/api/tasks/msg/${id}`)

            dispatch({
                type: CLEAR_MESSAGE,
                payload: res.data
            })
        }
        catch (error) {
            console.log(error)

            dispatch({
                type: TASK_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    return(
        <TaskContext.Provider value={{
            submitTasks: state.submitTasks,
            assignTasks: state.assignTasks,
            loading: state.loading,
            error: state.error,
            filteredAssign: state.filteredAssign,
            filteredSubmit: state.filteredSubmit,
            addTask,
            assignedTasks,
            submittedTasks,
            deleteTask,
            updateTask,
            clearTasks,
            search, 
            clearSearch,
            clearMessage,
        }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;