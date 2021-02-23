import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'
import Home from './components/Pages/DashBoard';
import About from './components/Pages/About';
import NotFound from './components/Pages/NotFound';
import Login from './components/User/Login';
import AdminModal from './components/User/AdminModal';
import AddUserModal from './components/User/AddUserModal';
import TaskState from './context/TaskContext/TaskState'
import UserState from './context/UserContext/UserState'
import SecureRoute from './components/Pages/SecureRoute';
import Api from './components/Pages/Api';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Logout from './components/Layout/Logout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChangePinModal from './components/User/ChangePinModal';

function App() {
  
  useEffect(()=>{
    M.AutoInit();
  },[])

  return (
    <>
    <TaskState>
    <UserState>
    <Router>
      <Navbar/>
      <AdminModal/>
      <AddUserModal/>
      <ChangePinModal/>
      <Switch>
        <SecureRoute exact path='/' component = {Home}/>
        <Route exact path='/Logout' component = {Logout}/>
        <Route exact path='/About' component = {About}/>
        <Route exact path='/Login' component = {Login}/>
        <Route exact path='/Api' component = {Api}/>
        <Route component={NotFound}/>
      </Switch> 
    </Router>
    </UserState>
    </TaskState>
    </>
  );
}

export default App;
