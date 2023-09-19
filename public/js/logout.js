// Function to handle user logout
const logout = async function() {
  // Send a POST request to the '/api/user/logout' endpoint to log the user out
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // Check if the response status is OK (200)
  if (response.ok) {
    // If logout is successful, redirect to the homepage
    document.location.replace('/');
  } else {
    // If logout fails, display an alert to the user
    alert('Failed to log out');
  }
};

// Add an event listener to the logout link for click events
document.querySelector('#logout-link').addEventListener('click', logout);