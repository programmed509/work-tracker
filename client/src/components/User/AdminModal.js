import React, { useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext/userContext';
import UserItem from './UserItem';

const AdminModal = () => {
    
    const context = useContext(UserContext);
    const { loadUsers, users, isAdmin } = context 
    
    useEffect(()=>{
      if(isAdmin){
        loadUsers();
      }
        //eslint-disable-next-line
    },[])
    
    
    return (
        <div id='admin-modal' className='modal bottom-sheet' style={{width:'50%', height:'50%'}}>
      <div className='modal-content'>
        <h4>Users List  <span><a href='#add-user-modal' className='btn-floating blue modal-trigger'>
            <i className='material-icons'>add</i>
          </a></span><span><a href='#!' className='material-icons right red-text modal-close'>close</a></span></h4>
        <ul className='collection'>
          { users && isAdmin &&
            users.map(user => <UserItem  key={user._id} user={user} />)}
        </ul>
      </div>
    </div>
        )
}

export default AdminModal
