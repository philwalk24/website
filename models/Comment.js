// Import required modules
const { Sequelize, Model, DataTypes } = require('sequelize');

// Import Sequelize configuration
const sequelize = require('../config/config');

// Define the Comment model
class Comment extends Model {}

// Initialize the Comment model with its attributes and options
Comment.init(
  {
    // Comment body attribute
    body: {
      type: DataTypes.STRING,    // Data type: STRING
      allowNull: false          // Not allowed to be null
    }
  },
  {
    sequelize                    // Use the Sequelize instance for this model
  }
);

// Export the Comment model
module.exports = Comment;