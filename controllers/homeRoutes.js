const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth')

// GET all posts on homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment }],
        })
        const posts = postData.map((post) => post.get({ plain: true }))
        console.log(posts)
        res.render('homepage', {
            posts,
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

    res.render('login')
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup')
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})


// Get Single Post on homepage
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = Post.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { model: Comment },
                { model: User }
            ],
        })
        const posts = postData.get({ plain: true })
        console.log(posts)
        res.render('singlePost', {
            posts,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
        };
})
module.exports = router;
