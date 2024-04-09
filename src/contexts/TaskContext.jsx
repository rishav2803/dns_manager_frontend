import React, { useState, useEffect, useContext } from "react";

//Create the context
export const TaskContext = React.createContext();

export function TaskProvider({ children }) {
  const [tasks,setTasks] = useState([]);
  const [selectedTask,setSelectedTask]=useState("");

  function storeTask(task){
    setTasks(task);
  }

  function updateTask(newTask){
    const updatedTasks = tasks.map((task) => {
      //Return new task for the given/selected task
      if (task.id === selectedTask) {
        return newTask;
      }
      // return same task that is dont do anything
      return task;
    });
    setTasks(updatedTasks);
    return true;
  }

  function addTask(task) {
    const updatedTask=[...tasks];
    updatedTask[tasks.length]=task
    setTasks(updatedTask);
    return true;
  }

  function selectTask(taskId){
    setSelectedTask(taskId);
  }


  const value = {
    tasks,
    storeTask,
    addTask,
    updateTask,
    selectTask,
    selectedTask,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
