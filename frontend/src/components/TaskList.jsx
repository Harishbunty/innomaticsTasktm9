import React, { useState } from 'react';
import { deleteTask, updateTask } from '../api';
import '../styles.css';

function TaskList({ tasks, fetchTasks, setTasks }) {
  const [editTask, setEditTask] = useState({ id: '', title: '', description: '' });

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      // Update the tasks state immediately after deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleEdit = (task) => {
    setEditTask({ id: task._id, title: task.title, description: task.description });
  };

  const handleUpdate = async () => {
    if (!editTask.title || !editTask.description) {
      alert('Please fill in the title and description.');
      return;
    }

    try {
      const updatedTask = await updateTask(editTask.id, editTask);
      // Update the tasks state immediately after editing
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      setEditTask({ id: '', title: '', description: '' });
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

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
 