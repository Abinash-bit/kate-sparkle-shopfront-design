
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
};

export const setUserEmail = (email: string): void => {
  localStorage.setItem('user_email', email);
};

export const getUserEmail = (): string | null => {
  return localStorage.getItem('user_email');
};
