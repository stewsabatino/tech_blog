const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// user makes posts
User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// comments are made on posts
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// users make the comments on posts
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports =  {
    User,
    Post,
    Comment,
};