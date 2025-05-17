import { toast } from "sonner";
import { setUserEmail } from '@/utils/auth';

interface SignupData {
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

interface ProfileData {
  dob: string;
  gender: string;
}

interface ProfileResponse {
  email: string;
  dob: string;
  gender: string;
}

const API_BASE_URL = 'http://localhost:8000';

export const signup = async (data: SignupData): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Signup failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Signup error:', error);
    toast.error('Failed to sign up: ' + (error instanceof Error ? error.message : String(error)));
    throw error;
  }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);
    
    const response = await fetch(`${API_BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }
    
    // Save the user email when logging in
    setUserEmail(data.username);
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Failed to log in: ' + (error instanceof Error ? error.message : String(error)));
    throw error;
  }
};

export const updateProfile = async (data: ProfileData): Promise<ProfileResponse> => {
  try {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Profile update failed');
    }
    
    // After successful update, fetch the updated profile data
    return await getProfile();
  } catch (error) {
    console.error('Profile update error:', error);
    toast.error('Failed to update profile: ' + (error instanceof Error ? error.message : String(error)));
    throw error;
  }
};

export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    // We need to include default empty values for required fields to satisfy API validation
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      // Include required fields with placeholder values
      body: JSON.stringify({
        dob: "", // Default empty value
        gender: "" // Default empty value
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to get profile');
    }
    
    const data = await response.json();
    
    // Check if the API is returning just a message or the actual profile data
    if (data.msg && !data.email) {
      // If we only get a message, construct a default profile response
      // This is a workaround if the API doesn't return profile data directly
      return {
        email: localStorage.getItem('user_email') || '',
        dob: '',
        gender: ''
      };
    }
    
    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    toast.error('Failed to get profile: ' + (error instanceof Error ? error.message : String(error)));
    throw error;
  }
};
