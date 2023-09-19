// Import necessary modules and models
const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// Route to display all posts on the homepage
router.get('/', async (req, res) => {
  try {
    // Retrieve all posts with associated user data
    const postData = await Post.findAll({
      include: [User], // Include the User model to fetch user data
    });

    // Map the post data to plain objects for rendering
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'all-posts' view with the posts
    res.render('all-posts', { posts });
  } catch (err) {
    // If an error occurs, send a 500 (Internal Server Error) response with the error details
    res.status(500).json(err);
  }
});

// Route to display a single post and its associated comments
router.get('/post/:id', async (req, res) => {
  try {
    // Find a post by its primary key (ID) and include user and comment data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User, // Include the User model for the post's author
        {
          model: Comment, // Include the Comment model for the post's comments
          include: [User], // Include the User model for the comments' authors
        },
      ],
    });

    if (postData) {
      // If the post exists, convert it to a plain object for rendering
      const post = postData.get({ plain: true });

      // Render the 'single-post' view with the post data
      res.render('single-post', { post });
    } else {
      // If the post doesn't exist, send a 404 (Not Found) response
      res.status(404).end();
    }
  } catch (err) {
    // If an error occurs, send a 500 (Internal Server Error) response with the error details
    res.status(500).json(err);
  }
});

// Route to display the login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    // If the user is already logged in, redirect to the homepage
    res.redirect('/');
    return;
  }

  // Render the 'login' view
  res.render('login');
});

// Route to display the signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    // If the user is already logged in, redirect to the homepage
    res.redirect('/');
    return;
  }

  // Render the 'signup' view
  res.render('signup');
});

// Export the router for use in other parts of the application
module.exports = router;