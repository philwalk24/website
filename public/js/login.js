// Function to handle the submission of the login form
const loginFormHandler = async function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the input elements for username and password
  const nameEl = document.querySelector('#username-input-login');
  const passEl = document.querySelector('#password-input-login');

  // Send a POST request to the '/api/user/login' endpoint with user credentials
  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: nameEl.value,
      password: passEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Check if the response status is OK (200)
  if (response.ok) {
    // If successful, redirect to the dashboard
    document.location.replace('/dashboard');
  } else {
    // If login failed, display an alert
    alert('Failed to login');
  }
};

// Add an event listener to the login form for form submission
document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);