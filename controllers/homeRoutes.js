const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth')

// GET route to homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [['createdAt', 'ASC'], ['name', 'ASC']]
        })
        const posts = postData.map((post) => post.get({ plain: true }))

        const commentData = await Post.findAll({
            order: [['createdAt', 'ASC'], ['name', 'ASC']]
        })
        const comments = commentData.map((comment) => comment.get({ plain: true }))

        const userData = await Post.findAll({
            order: [['name', 'ASC']]
        })
        const users = userData.map((user) => user.get({ plain: true }))

        
        res.render('homepage', {
            posts,
            comments,
            users,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET on homepage to login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('log_in')
});

// POST on homepage to make a comment on a post
router.post('/', (req, res) => {
    if (logged_in) {
        try {
            // save comment to db and send back comment
            const commentData = await User.findOne({ where: { user_id: req.body.user_id}})

            res.json({ comment: commentData })

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        // do nothing
    }
})

module.exports = router;
