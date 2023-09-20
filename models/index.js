// Import User, Post, and Comment models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between models

// A Post belongs to a User (each Post is associated with a User)
Post.belongsTo(User, {
  foreignKey: 'userId', // Specify the foreign key for the association
  onDelete: 'CASCADE', // Delete associated Posts if the User is deleted
});

// A Post has many Comments (each Post can have multiple Comments)
Post.hasMany(Comment, {
  foreignKey: 'postId', // Specify the foreign key for the association
  onDelete: 'CASCADE', // Delete associated Comments if the Post is deleted
});

// A Comment belongs to a User (each Comment is associated with a User)
Comment.belongsTo(User, {
  foreignKey: 'userId', // Specify the foreign key for the association
  onDelete: 'CASCADE', // Delete associated Comments if the User is deleted
});

// Export User, Comment, and Post models for use in other parts of the application
module.exports = {
  User,
  Comment,
  Post,
};