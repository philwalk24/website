// Function to handle the submission of the signup form
const signupFormHandler = async function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the input elements for username and password
  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');

  // Send a POST request to the '/api/user' endpoint with user credentials
  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Check if the response status is OK (200)
  if (response.ok) {
    // If signup is successful, redirect to the dashboard
    document.location.replace('/dashboard');
  } else {
    // If signup fails, display an alert to the user
    alert('Failed to sign up');
  }
};

// Add an event listener to the signup form for form submission
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);