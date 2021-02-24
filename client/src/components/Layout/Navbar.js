import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext/userContext';
import TaskContext from '../../context/TaskContext/taskContext';


const Navbar = () => {
    const userContext = useContext(UserContext);
    const taskContext = useContext(TaskContext);
    const { isAuthenticated} = userContext
    const { search, clearSearch } = taskContext
    
    const [text, setText] = useState('')
    
    const onSearch=(e)=>{
        setText(e.target.value)
        search(text);
    }

    const clearSearchBar=(e)=>{
        clearSearch();
        setText('');
    }

    const guestLinks=()=>{
        return(
            <ul className='right'>
                <li>
                <Link to='/About'>About</Link>
                </li>
                <li>
                <Link to='/Login'>Login</Link>
                </li>
            </ul>
        )
    }

    const onEnter=(e)=>{
        if(e.keycode == 13){
            e.preventDefault();
        }
    }

    const authLinks=()=>{
        return(
            <form>
                <div className="input-field">
                    <input type="search" name='search' value={text} onChange={onSearch} placeholder="Search tasks based on title, description, status, priority, users..."/>
                    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                    <i className="material-icons" onClick={clearSearchBar}>close</i>
                </div>
            </form>
        )
    }
    return (
        <nav className='grey darken-3'>
        <div className='nav-wrapper'>
            { isAuthenticated ? 
            authLinks() :     
            guestLinks()
            }   
        </div>
        </nav>
    )
}

export default Navbar;
