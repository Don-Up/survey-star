// user.ts

import axios from 'axios';

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



export const registerService = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  try {
    const response = await axios.post('/api/user/register', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    return {
      success: false,
      message: 'An error occurred during registration.',
    };
  }
};
