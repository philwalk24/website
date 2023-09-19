// Function to handle the submission of a new post form
const newFormHandler = async function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the new post's title and body from the form inputs
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  // Send a POST request to the '/api/post' endpoint to create a new post
  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Redirect to the dashboard after creating the new post
  document.location.replace('/dashboard');
};

// Add an event listener to the new post form for form submission
document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);