// user.ts

import axios from 'axios';
import instance from "./ajax";

interface RegisterPayload {
  email: string;
  name?: string; // 可选的用户名
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  email?: string;
  accessToken?: string;
  message: string;
}

export const registerService = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  try {
    const response = await axios.post('/api/user/register', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extract message from server response
      const serverMessage = error.response.data?.message || 'An error occurred during registration.';
      console.error('Registration failed:', serverMessage);
      return {
        success: false,
        message: serverMessage,
      };
    }

    // Handle other errors
    console.error('Registration failed:', error);
    return {
      success: false,
      message: 'An unexpected error occurred.',
    };
  }
};

export const loginService = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axios.post('/api/auth/login', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extract message from server response
      const serverMessage = error.response.data?.message || 'An error occurred during registration.';
      console.error('Registration failed:', serverMessage);
      return {
        success: false,
        message: serverMessage,
      };
    }

    // Handle other errors
    console.error('Registration failed:', error);
    return {
      success: false,
      message: 'An unexpected error occurred.',
    };
  }
};

export const getUserInfoService = async (): Promise<any> => {
  try {
    const response = await instance.get('/api/user/profile');
    return response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extract message from server response
      const serverMessage = error.response.data?.message || 'An error occurred during registration.';
      console.error('Registration failed:', serverMessage);
      return {}
    }
  }
}