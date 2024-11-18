import React, { useState } from 'react';
import { addTask } from '../api';  // Ensure this is the correct import for the API function
import '../styles.css';
const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure title and description are not empty
    if (!task.title || !task.description) {
      alert('Please fill out both the title and description.');
      return;
    }
    
    try {
      await addTask(task);  // Ensure the addTask API function is correct
      fetchTasks(); // Re-fetch the tasks after adding
      setTask({ title: '', description: '' }); // Clear the form
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <div className="task-form-container">
      <br></br><h2>Add a New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleInputChange}
          className="input-field"
        />
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
