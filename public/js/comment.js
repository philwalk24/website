// Function to handle the submission of a comment form
const commentFormHandler = async function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values of postId and body from the form inputs
  const postId = document.querySelector('input[name="post-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  // Check if the 'body' field is not empty
  if (body) {
    // Send a POST request to the '/api/comment' endpoint
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Reload the page after submitting the comment
    document.location.reload();
  }
};

// Add an event listener to the comment form for form submission
document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);