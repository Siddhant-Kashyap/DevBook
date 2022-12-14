const express = require('express')
const router = express.Router();
const { check, validator, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts')
const Profile = require('../../models/Profile');
const User = require('../../models/User');




router.post('/', [auth, [
    check('text', 'Text should be there').not().isEmpty()
]], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {

        const user = await User.findById(req.user.id).select('-password');


        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save();

        res.json(post);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ msg: "No post from this user" })
        }
        res.json(post);

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "No post from this user" })
        }
        res.status(500).send('Server Error');
    }
})
router.delete('/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ msg: "No post from this user" })
        }
        //checkUser
        if (post.user.toString() !== req.user.id) {
            return res.status(400).json({ msg: "User Not Authorized" })
        }
        await post.remove();
        res.json({ msg: "Post Deleted" })
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "No post from this user" })
        }
        res.status(500).send('Server Error');
    }
})


//to like 
router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //check if user has already liked it 
        if(post.likes.filter(like => like.user.toString()===req.user.id).length>0){
            return res.status(400).json({ msg: "Post already Liked" })
        }
        post.likes.unshift({user:req.user.id});
        await  post.save();

        res.json(post.likes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//to unlike

router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //check if user has already liked it 
        if(post.likes.filter(like => like.user.toString()===req.user.id).length===0){
            return res.status(400).json({ msg: "Post has not liked yet" })
        }
        const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await  post.save();

        res.json(post.likes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


//for adding the comment

router.post('/comment/:id', [auth, [
    check('text', 'Text should be there').not().isEmpty()
]], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {

        const user = await User.findById(req.user.id).select('-password');
        const post =await Post.findById(req.params.id);



        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment);
         await post.save();

        res.json(post.comments);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


//to delete the comment
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //pull the comment 
        const comment =post.comments.find(comment=>comment.id=== req.params.comment_id);

        //Make sure comment exists
        if(!comment){
            return res.status(404).json({ msg: "Comment does not exist" }) 
        }
        //check usr
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "User not authorised" }) 
        }

        //get the index of comment
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex,1);

        await post.save()

        res.json(post.comments);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})






module.exports = router;