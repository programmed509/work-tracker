import React,{ useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext/userContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const ChangePinModal = () => {
    const context = useContext(UserContext);
    const { changePassword, pinAlert } = context

    const [ pin , setPin ] = useState({
        oldPin:'',
        newPin:''
    })

    useEffect(()=>{
        if(pinAlert !== null){
            M.toast({html: pinAlert})
        }
    },[pinAlert])

    const changeHandler=(e)=>{
        setPin({...pin, [e.target.name]:e.target.value})
    }

    const submitHandler=async (e)=>{
        e.preventDefault();
        if( oldPin === '' || newPin === ''){
            M.toast({html: `Please enter all details`})
        }
        else{
            changePassword(pin);            
        setPin({
            oldPin:'',
            newPin:''
        })
        }       
    }

    const { oldPin, newPin } = pin;

    return (
        <div id='change-pin-modal' className='modal bottom-sheet' style={{width:'20%', height:'35%'}}>
        
        <form style={{width:'20rem', position: 'absolute', left: 0,  right: 0, margin: 'auto' }} onSubmit={submitHandler}>
            <h5>Change Your PIN <span><a href='#!' className='material-icons right red-text modal-close'>close</a></span></h5>
            <div className="input-field">
                <input type="password" id="oldPin" name="oldPin" value={oldPin} onChange={changeHandler} />
                <label htmlFor="oldPin">Current PIN</label>
            </div>
            
            <div className="input-field">
                <input type="password" id="newPin" name="newPin" value={newPin} onChange={changeHandler}/>
                <label htmlFor="newPin">New PIN</label>
            </div>
            <input type="submit" className='btn blue' value='Change'/>
        </form> 
        </div>
    )
}

export default ChangePinModal;