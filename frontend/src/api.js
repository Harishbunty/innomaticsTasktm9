const API_URL = "http://localhost:3000/todos";

// Fetch tasks from the backend
export const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
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
      const response = await fetch('http://localhost:3000/todos', {
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
  
// Update an existing task
export const updateTask = async (id, updatedTask) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
  const data = await response.json();
  return data;
};

// Delete a task from the backend
export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};
