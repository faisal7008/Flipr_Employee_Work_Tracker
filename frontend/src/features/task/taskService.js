import axios from 'axios';

const api_url = `${process.env.REACT_APP_API_URL}`;

// Create a task
export const createTask = async (token, taskData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(api_url + '/task', taskData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all tasks
export const getTasksByEmployee = async (token, employeeId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(api_url + `/task/employee/${employeeId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a task by ID
export const getTaskById = async (token, taskId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(api_url + `/task/${taskId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a task by ID
export const updateTaskById = async (token, taskId, taskData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(api_url + `/task/${taskId}`, taskData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a task by ID
export const deleteTaskById = async (token, taskId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(api_url + `/task/${taskId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
