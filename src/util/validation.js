export const emailValidation = (email) => {
  if (email.trim().includes('@')) {
    return { success: true };
  } else {
    return { textError: 'Please enter a valid email.' };
  }
};

export const usernameValidation = (username) => {
  if (username.trim().length < 6) {
    return { textError: 'Username must be at least 6 characters.' }
  } else if (username.trim().length > 20) {
    return { textError: 'Username must be within 21 characters.' }
  } else {
    return { success: true };
  }
};

export const passwordValidation = (password) => {
  if (password.trim().length < 6) {
    return { textError: 'Password must be at least 6 characters.' }
  } else if (password.trim().length > 20) {
    return { textError: 'Password must be within 21 characters.' }
  } else {
    return { success: true };
  }
};
