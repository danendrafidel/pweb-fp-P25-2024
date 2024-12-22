import { reactive } from 'vue';

export const authState = reactive({
  isLoggedIn: localStorage.getItem('authToken') !== null,  // Check if token exists
  user: localStorage.getItem('username') || null, // Get user data from localStorage
});

export function login(username) {
  authState.isLoggedIn = true;
  authState.username = username;
}

export function logout() {
  authState.isLoggedIn = false;
  authState.user = null;
  localStorage.removeItem('authToken'); 
  localStorage.removeItem('username'); 
}
