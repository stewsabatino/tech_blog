const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{ model: User }, { model: Comment }],
        })
        const posts = postData.map((post) => post.get({ plain: true }))
        console.log(posts)
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

// POST /dashboard
router.post('/', withAuth, async (req, res) => {
    try{ 
        const postData = await Post.create({
            title: req.body.title,
            post_url: req.body.post_url,
            user_id: req.session.user_id
        })
        res.json(postData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})

// PUT /dashboard/1
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            { title: req.body.title },
            {
                where: {
                    id: req.params.id
                }
            }
            )
        if (postData[0]) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;