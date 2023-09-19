// Get the post ID from the input field
const postIdInput = document.querySelector('input[name="post-id"]');
const postId = postIdInput.value;

// Function to handle the submission of the edit form
const editPostHandler = async function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the updated title and body from the form inputs
  const updatedTitle = document.querySelector('input[name="post-title"]').value;
  const updatedBody = document.querySelector('textarea[name="post-body"]').value;

  // Function to handle the click event for deleting a post
const deletePostHandler = async function() {
  // Send a DELETE request to delete the post
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  // Redirect to the dashboard after deleting
  document.location.replace('/dashboard');
};

  // Send a PUT request to update the post with the new data
  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: updatedTitle,
      body: updatedBody
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Redirect to the dashboard after editing
  document.location.replace('/dashboard');
};

// Add event listeners for form submission and delete button click
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editPostHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deletePostHandler);