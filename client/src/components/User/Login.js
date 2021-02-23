import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext/userContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const Login = () => {
    const context = useContext(UserContext)
    const history = useHistory();
    const { login, isAuthenticated , error, clearErrors } = context

    const [user, setuser ] = useState({
        username:'',
        pin:''
    });

    useEffect(() => {
        if (isAuthenticated===true){
            history.push('/')
        }
        if (error !== null){
            M.toast({html: error})
            clearErrors();
        }
        let elem2 = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elem2, {
          margin: 9
        }); 
        //eslint-disable-next-line
    }, [isAuthenticated, history, error])

    const changeHandler=(e)=>{
        setuser({...user, [e.target.name]: e.target.value});
    }

    const submitHandler= async (e)=>{
        e.preventDefault();
        login(user);    
    }

    const { username, pin } = user; 

    return (
        <>
        <h5 style={{position: 'absolute', top: '20%', left: '0', right: '0', margin:'auto', textAlign:'center'}}>Login to see your Dashboard</h5>
        <form id='login' className='myCard z-depth-1' style={{width:'20rem', position: 'absolute', left: '0',  right: '0', margin: 'auto' }} onSubmit={submitHandler}>
        
        <div className="input-field">
            <input type="text" id="username1" name="username" value={username} onChange={changeHandler}/>
            <label htmlFor="username">Username</label>
        </div>

        <div className="input-field">
            <input type="password" id="pin1" name="pin" value={pin} pattern="[0-9]{4}" onChange={changeHandler}/>
            <label htmlFor="pin">PIN</label>
        </div>
            <input type="submit" className='btn blue' value='Login' /><br/>
            <a className='tooltipped right' data-position='right' data-tooltip='Kindly raise a request to Admin and get registered'>New User?</a>
        </form>   
        </>
    )
}

export default Login