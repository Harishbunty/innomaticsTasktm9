import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';  // Import TaskList
import './styles.css';
import './App.css';
import { fetchTasks } from './api'; // Adjust the path if necessary

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchAllTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();  // Ensure fetchTasks is working correctly
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm fetchTasks={fetchAllTasks} />  {/* Pass fetchTasks to the TaskForm component */}
      <TaskList tasks={tasks} fetchTasks={fetchAllTasks} />  {/* Render TaskList */}
    </div>
  );
};

export default App;
