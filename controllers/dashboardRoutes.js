const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

router.get('/newPost', async (req, res) => {
    try {
        res.render('newPost')
    } catch (err) {
        res.status(500).json(err)
    }
});



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