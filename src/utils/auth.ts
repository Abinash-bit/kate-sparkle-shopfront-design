
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('access_token');
};

export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('access_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_dob');
  localStorage.removeItem('user_gender');
};

export const setUserEmail = (email: string): void => {
  localStorage.setItem('user_email', email);
};

export const getUserEmail = (): string | null => {
  return localStorage.getItem('user_email');
};

export const setUserProfile = (dob: string, gender: string): void => {
  localStorage.setItem('user_dob', dob);
  localStorage.setItem('user_gender', gender);
};

export const getUserProfile = (): { dob: string, gender: string } => {
  return {
    dob: localStorage.getItem('user_dob') || '',
    gender: localStorage.getItem('user_gender') || ''
  };
};
