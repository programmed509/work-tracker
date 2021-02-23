import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext/userContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const UserItem = ({ user }) => {

    const context = useContext(UserContext);
    const { deleteUser } = context;
    const { name, username } = user;

    const onDelete = () => {
      if (window.confirm(`All the tasks assigned to or by ${name} will also be deleted!!`)){
        deleteUser(user._id);
          M.toast({ html: `${name} data has been deleted` });
        }
    };

  return (
    <li className='collection-item'>
      <div>
      Name: <strong>{name}</strong>  , Username: <strong>{username}</strong> 
        <a href='#!' className='secondary-content' onClick={onDelete}>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
}

export default  UserItem;