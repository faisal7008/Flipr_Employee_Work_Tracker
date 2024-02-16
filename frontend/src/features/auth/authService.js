import axios from 'axios';

const api_url = `${process.env.REACT_APP_API_URL}`;

// Register a new user
export const registerUser = async (token, userData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(config);
    const response = await axios.post(api_url + '/auth/register', userData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login a user
export const loginUser = async (userData) => {
  try {
    // console.log(userData);
    const response = await axios.post(api_url + '/auth/login', userData);
    if (response.data) {
      localStorage.setItem('worktrackr_user', JSON.stringify(response.data.user));
      localStorage.setItem('worktrackr_token', JSON.stringify(response.data.token));
    }
    return response.data;
  } catch (error) {
    // console.log(error)
    throw error;
  }
};

// Get all employees
export const getAllEmployees = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(api_url + '/auth/employees', config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get current user's profile
export const getMe = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(api_url + '/auth/me', config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update current user's profile
export const updateMe = async (token, userData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(api_url + '/auth/me', userData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user by ID (Admin)
export const getUserById = async (token, userId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(api_url + `/auth/users/${userId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user by ID (Admin)
export const updateUserById = async (token, userId, userData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(api_url + `/auth/users/${userId}`, userData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete user by ID (Admin)
export const deleteUserById = async (token, userId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(userId);
    const response = await axios.delete(api_url + `/auth/users/${userId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload profile picture
export const uploadProfilePic = async (body, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const response = await axios.post(api_url + `/auth/uploadProfile`, body, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
