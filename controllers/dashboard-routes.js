// Import necessary modules and models
const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// Route to display the form for creating a new post (requires authentication)
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard', // Use the 'dashboard' layout
  });
});


// Route to display all user's posts (requires authentication)
router.get('/', withAuth, async (req, res) => {
  try {
    // Retrieve all posts associated with the user's ID
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId, // Filter by user ID from the session
      },
    });

    // Map the post data to plain objects for rendering
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'all-posts-admin' view with the user's posts
    res.render('all-posts-admin', {
      layout: 'dashboard', // Use the 'dashboard' layout
      posts,
    });
  } catch (err) {
    // If an error occurs, redirect to the login page
    res.redirect('login');
  }
});



// Route to display the form for editing a post (requires authentication)
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Find the post by its primary key (ID)
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // If the post exists, convert it to a plain object for rendering
      const post = postData.get({ plain: true });

      // Render the 'edit-post' view with the post data
      res.render('edit-post', {
        layout: 'dashboard', // Use the 'dashboard' layout
        post,
      });
    } else {
      // If the post doesn't exist, send a 404 response
      res.status(404).end();
    }
  } catch (err) {
    // If an error occurs, redirect to the login page
    res.redirect('login');
  }
});

// Export the router for use in other parts of the application
module.exports = router;
