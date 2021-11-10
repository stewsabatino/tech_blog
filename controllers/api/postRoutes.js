const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post } = require('../../models')

router.post('/', withAuth, async (req, res) => {
    try{ 
        const postData = await Post.create({
            title: req.body.title,
            entry: req.body.entry,
            user_id: req.session.user_id
        })
        res.json(postData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})

module.exports = router;