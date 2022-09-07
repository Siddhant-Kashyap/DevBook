const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {check , validationResult} = require('express-validator')
const config = require('config')

const User = require('../../models/User.js')


router.get('/',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (error) {
        res.status(500).send("Server Error")
    }
})


//to login
router.post('/',[
    check('email','Please enter the email').isEmail(),
    check('password','please enter the password').exists()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body;

    try {
        let user  =await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"Invalid credential"})
        }
         const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid credential"})
        }
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:3600000
        },(err,token)=>{
            if(err) throw err;
            res.json({token})
        })
        
    } catch (error) {
        res.status(500).send("Server Eroor")
    }
})

module.exports = router;