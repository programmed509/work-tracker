import { REGISTER, LOGIN, LOAD_USERS, AUTH_USER, LOGOUT, USER_ERROR, CLEAR_ERRORS, DELETE_USER, CHANGE_PASSWORD } from '../types';

export default (state, action) => {
    switch(action.type){

        case REGISTER:
        case LOGIN:
        localStorage.setItem('token', action.payload)
        return{
            ...state,
            token: action.payload,
            isAuthenticated: true,
        }

        case AUTH_USER:
        return{
            ...state,
            user: action.payload,
            isAuthenticated: true,
            loading: false,
            isAdmin: action.payload.username === 'pmishra' ? true : false,            
        }

        case LOAD_USERS: return{
            ...state,
            users: action.payload
        }

        case USER_ERROR:
        return{
            ...state,
            error: action.payload
        }

        case DELETE_USER:
            return{
                ...state,
                users: state.users.filter( user => user._id !== action.payload )
            }
        
        case CHANGE_PASSWORD:
            return{
                ...state,
                pinAlert: action.payload
            }

        case CLEAR_ERRORS: return {
            ...state,
            error: null
        }

        case LOGOUT:
        localStorage.removeItem('token');
        return{
            ...state,
            user : null,
            users: null,
            token: null,
            isAuthenticated: false,
            error: null
        }

        default : return state
    }
}