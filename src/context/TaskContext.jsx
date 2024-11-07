// src/context/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the TaskContext
const TaskContext = createContext();

// Helper function to fetch tasks from localStorage
const fetchTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : []; // Return tasks or an empty array if no tasks exist
};

// Helper function to save tasks to localStorage
const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(fetchTasksFromLocalStorage());

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const startTimer = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, timerRunning: true, lastStartTime: Date.now() }
        : task
    );
    setTasks(updatedTasks);
  };

  const stopTimer = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            timerRunning: false,
            timeSpent: task.timeSpent + (Date.now() - task.lastStartTime),
          }
        : task
    );
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, startTimer, stopTimer }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use TaskContext
export const useTasks = () => useContext(TaskContext);
