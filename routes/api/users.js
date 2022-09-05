//to access the router 
const express = require('express');
const router = express.Router();
const {check , validationResult} = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require("bcryptjs")

const User = require('../../models/User')


//@route  POST api/users
//to register User

router.post('/',[
    check('name',"Name is Required").not().isEmpty(),
    check('email','Please enter a valid Mail').isEmail(),
    check('password','Please Enter a password with 6 letter').isLength({min:6})
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name,email,password} = req.body;

    try {
         //if User Exixt
        let user = await User.findOne({email});
        if(user){
           return res.send(400).json({errors :[{msg:"user already exist"}]})
        }
    //Get user avatar
        const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});

        user = new User({
            name,
            email,
            avatar,
            password
        })
    //Encrypt password
    var salt = await bcrypt.genSaltSync(10);
    user.password =  await bcrypt.hash(password,salt);
    //SAVE IN DB
    await user.save();
    //REturn jsonWebToken


    
    res.send("User Register")
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server error');
    }
   
    
})

module.exports = router;
