import React, { useState } from "react";
import { deleteTask, updateTask } from "../api";

export const Task = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskName, setUpdatedTaskName] = useState(task.name);

  const handleDelete = async () => {
    const isDeleted = await deleteTask(task._id);
    if (isDeleted) {
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    }
  };

  const handleEdit = async () => {
    const updatedTask = { ...task, name: updatedTaskName };
    const result = await updateTask(task._id, updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === task._id ? result : t))
    );
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <span>{task.name}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
