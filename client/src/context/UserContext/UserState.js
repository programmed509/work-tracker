import { useReducer } from 'react';
import UserReducer from './userReducer';
import axios from 'axios';
import UserContext from './userContext';
import {
    LOAD_USERS,
    LOGOUT,
    USER_ERROR,
    REGISTER,
    LOGIN,
    AUTH_USER,
    CLEAR_ERRORS,
    DELETE_USER,
    CHANGE_PASSWORD
} from '../types'

const UserState = props => {
    
    const initialState = {
        users: null,
        user: null,
        token: null,
        error: null,
        isAuthenticated: false,
        isAdmin: false,
        pinAlert: null
    }

    const [ state, dispatch ] = useReducer(UserReducer, initialState)

    //register user
    const register = async (user)=>{
        try{ 
            const res = await axios.post('/api/users/register/', user, {headers:{'Content-type':'application/json'}} )

            dispatch({
                type: REGISTER,
                payload: res.data
            })
            authUser();
        }
        catch(error){
            dispatch({
                type: USER_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //login user
    const login = async user =>{
        try{ 
            const res = await axios.post('/api/users/login/', user, {headers:{'Content-type':'application/json'}});

            dispatch({
                type: LOGIN,
                payload: res.data
            })

           authUser();
           
        }
        catch(error){

            dispatch({
                type: USER_ERROR,
                payload: error.response.data.msg
            })
        }
        }
    
    //get logged in user
    const authUser = async () => {
        
        const config={
            headers:{
                'x-auth-token': localStorage.getItem('token')
            }
        }
        try {
            const res = await axios.get(`/api/users/auth`, config)

            dispatch({
                type: AUTH_USER,
                payload: res.data
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: USER_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //load all users
    const loadUsers = async () => {
        try{ 
            const res = await axios.get('/api/users/all')
            dispatch({
                type: LOAD_USERS,
                payload: res.data
            })
        }
        catch(error){
            dispatch({
                type: USER_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const deleteUser = async (id) =>{
        const config={
            headers:{
                'x-auth-token': localStorage.getItem('token')
            }
        }
        try{
            await axios.delete(`/api/users/${id}`, config)
            dispatch({
                type: DELETE_USER,
                payload: id
            })
        }
        catch(error){
            dispatch({
                type: USER_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const changePassword=async (pin)=>{
        const config={
            headers:{
                'Content-type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }
        try{
            const res = await axios.put(`/api/users/`, pin, config)
            dispatch({
                type: CHANGE_PASSWORD,
                payload: res.data.msg
            })
        }
        catch(error){
            dispatch({
                type: USER_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //logout user
    const logout=()=>{
        dispatch({
            type: LOGOUT
        })
    }

    const clearErrors=()=>{
        dispatch({
            type: CLEAR_ERRORS
        })
    }

    return <UserContext.Provider value={{
        users: state.users,
        user: state.user,
        token: state.token,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        pinAlert: state.pinAlert,
        register,
        login,
        loadUsers,
        logout,
        authUser,
        clearErrors,
        deleteUser,
        changePassword
    }}>
        {props.children}
    </UserContext.Provider>

}

export default UserState;