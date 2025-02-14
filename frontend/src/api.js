const API_URL = "https://taskmanager-dx7i.onrender.com/";

// Fetch tasks from the backend
export const fetchTasks = async () => {
    try {
      const response = await fetch('https://taskmanager-dx7i.onrender.com/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error; // Re-throw the error to be caught in the caller
    }
  };
  
// Add a new task to the backend
export const addTask = async (task) => {
    try {
      const response = await fetch('https://taskmanager-dx7i.onrender.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
  
      return await response.json();  // Return the response if needed
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;  // Re-throw the error to be caught by the caller
    }
  };
  
// deleteTask function
export const deleteTask = async (id) => {
  const response = await fetch(`https://taskmanager-dx7i.onrender.com/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete the task.');
  }
};

// updateTask function
export const updateTask = async (id, task) => {
  const response = await fetch(`https://taskmanager-dx7i.onrender.com/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update the task.');
  }
  const updatedTask = await response.json();
  return updatedTask;
};
