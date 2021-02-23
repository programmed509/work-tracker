import React,{ useEffect, useContext, useState } from 'react';
import TaskItem from './TaskItem';
import TaskContext from '../../context/TaskContext/taskContext';
import Preloader from '../Layout/Preloader';

const AssignedTasks=()=>{

const taskContext = useContext(TaskContext);

const { assignedTasks, assignTasks, filteredAssign, loading } = taskContext;

useEffect(()=>{
    assignedTasks();
    //eslint-disable-next-line
},[]);

const onSort=(e)=>{
  if(e.target.id==='assignDate'){
    assignedTasks('date');
  }
  if(e.target.id==='assignPriority'){
    assignedTasks('priority');
  }
}

if( assignTasks === null || loading ){
  return <Preloader/>
}


return(
      <>
      <div className="container">
        <h5>Assigned to you:</h5> 
        <form>
        Sort by: <label>&nbsp;&nbsp;
        <input className='blue' name="sort"  id="assignDate" value="date" type="radio" onChange={onSort}/>
        <span>Latest</span>
        </label>&nbsp;&nbsp;
        <label>
        <input className='blue' name="sort" id="assignPriority" value="priority" type="radio" onChange={onSort}/>
        <span>Priority</span>
        </label>
        </form>
        {filteredAssign && filteredAssign!==null ? 
          filteredAssign.map(task=>{
            return(
            <TaskItem key={task._id} task={task} name={task.submitter.name} deleteBool={false}/>
                  )    
            }) : 
        
            assignTasks && assignTasks.length !== 0 ?
          assignTasks.map(task=>{
            return(
            <TaskItem key={task._id} task={task} name={task.submitter.name} deleteBool={false}/>
                  )    
          }) :

        <p>No assigned task</p>
        }
      </div>
      </>
    )
}

export default AssignedTasks