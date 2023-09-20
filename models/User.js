// Import required modules
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

// Define the User model
class User extends Model {
  // Method to check if a provided password matches the user's stored password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its attributes and options
User.init(
  {
    // User ID attribute
    id: {
      type: DataTypes.INTEGER,   // Data type: INTEGER
      allowNull: false,          // Not allowed to be null
      primaryKey: true,          // Primary key of the table
      autoIncrement: true        // Auto-increment the ID
    },

    // Username attribute, stores the username of the user
    username: {
      type: DataTypes.STRING,    // Data type: STRING
      allowNull: false          // Not allowed to be null
    },

    // Password attribute, stores the hashed password of the user
    password: {
      type: DataTypes.STRING,    // Data type: STRING
      allowNull: false,         // Not allowed to be null
      validate: {
        len: [4]                 // Validate password length (minimum length of 4 characters)
      }
    }
  },
  {
    hooks: {
      // Set up beforeCreate lifecycle "hook" functionality to hash the password before creating a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Set up beforeUpdate lifecycle "hook" functionality to hash the password before updating a user
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,                 // Use the Sequelize instance for this model
    timestamps: false,         // Disable timestamps (createdAt and updatedAt columns)
    freezeTableName: true,     // Prevent table name pluralization
    underscored: true,         // Use underscored naming (e.g., user_name instead of userName)
    modelName: 'User'         // Model name for referencing
  }
);

// Export the User model for use in other parts of the application
module.exports = User;