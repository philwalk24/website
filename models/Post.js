// Import required modules
const { Sequelize, Model, DataTypes } = require('sequelize');

// Import Sequelize configuration
const sequelize = require('../config/config');

// Define the Post model
class Post extends Model {}

// Initialize the Post model with its attributes and options
Post.init(
  {
    // Title attribute, stores the title of the post
    title: DataTypes.STRING, // Data type: STRING

    // Body attribute, stores the content of the post
    body: DataTypes.STRING   // Data type: STRING
  },
  {
    sequelize // Use the Sequelize instance for this model
  }
);

// Export the Post model for use in other parts of the application
module.exports = Post;