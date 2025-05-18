
import { toast } from "sonner";
import { setUserEmail, getUserEmail } from '@/utils/auth';

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
    
    console.log('Sending profile data to API:', data);
    
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        dob: data.dob,
        gender: data.gender
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Profile update failed');
    }
    
    // Successfully updated profile, get the response data
    const responseData = await response.json();
    console.log('Profile update API response:', responseData);
    
    // If the API returns the profile data directly, use it
    if (responseData.dob && responseData.gender) {
      return {
        email: getUserEmail() || '',
        dob: responseData.dob,
        gender: responseData.gender
      };
    }
    
    // If the API doesn't return the profile data, use what we sent
    return {
      email: getUserEmail() || '',
      dob: data.dob,
      gender: data.gender
    };
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
    
    // For GET requests to profile endpoint (if supported by API)
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'GET',  // Changed to GET to retrieve profile data
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    
    if (!response.ok) {
      // If GET is not supported, fall back to POST with empty body
      const postResponse = await fetch(`${API_BASE_URL}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          dob: "",
          gender: ""
        }),
      });
      
      if (!postResponse.ok) {
        const errorData = await postResponse.json();
        throw new Error(errorData.detail || 'Failed to get profile');
      }
      
      const data = await postResponse.json();
      console.log('Profile data from POST fallback:', data);
      
      if (data.dob && data.gender) {
        return data;
      }
      
      // If no profile data in response, get from localStorage
      return {
        email: getUserEmail() || '',
        dob: localStorage.getItem('user_dob') || '',
        gender: localStorage.getItem('user_gender') || ''
      };
    }
    
    const data = await response.json();
    console.log('Profile data from GET:', data);
    
    if (data.dob && data.gender) {
      return data;
    }
    
    return {
      email: getUserEmail() || '',
      dob: localStorage.getItem('user_dob') || '',
      gender: localStorage.getItem('user_gender') || ''
    };
  } catch (error) {
    console.error('Get profile error:', error);
    toast.error('Failed to get profile: ' + (error instanceof Error ? error.message : String(error)));
    throw error;
  }
};
