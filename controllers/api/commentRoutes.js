const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models')

router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    // try{ 
        const commentData = await Comment.create({
            entry: req.body.entry,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        res.json(commentData)
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json(err);
    // };
})

module.exports = router;