import React, { useState, useEffect } from 'react'; 
import { fetchTasks, deleteTask, updateTask } from '../api'; // Ensure these API functions are correct
import '../styles.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({ id: '', title: '', description: '' });

  // Fetch tasks from the backend
  useEffect(() => {
    async function loadTasks() {
      const tasksFromAPI = await fetchTasks();
      console.log("tasksFromAPI", tasksFromAPI);
      setTasks(tasksFromAPI);
    }
    loadTasks();
  }, []);

  // Delete task function
  const handleDelete = async (id) => {
    await deleteTask(id); // Call delete API
    setTasks(tasks.filter(task => task._id !== id)); // Update state after deletion
  };

  // Edit task function
  const handleEdit = (task) => {
    console.log("Editing task:", task);  // Check if this is logged in the console
    setEditTask({ id: task._id, title: task.title, description: task.description });
  };

  // Handle task update
  const handleUpdate = async () => {
    if (!editTask.title || !editTask.description) {
      alert("Please fill in the title and description.");
      return;
    }
    
    const updatedTask = await updateTask(editTask.id, editTask); // Call update API
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task)); // Update task in the list
    setEditTask({ id: '', title: '', description: '' }); // Reset edit form
  };

  // Handle change in task form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <div className="task-container">
        {tasks.map((task) => (
          <div key={task._id} className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleEdit(task)} className="edit-btn">Edit</button>
            <button onClick={() => handleDelete(task._id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>

      {/* Edit Task Form */}
      {editTask.id && (
        <div className="edit-task">
          <h3>Edit Task</h3>
          <input
            type="text"
            name="title"
            value={editTask.title}
            onChange={handleChange}
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={editTask.description}
            onChange={handleChange}
            placeholder="Task Description"
          />
          <button onClick={handleUpdate}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default TaskList;
