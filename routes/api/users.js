//to access the router 
const express = require('express');
const router = express.Router();
const {check , validationResult} = require('express-validator')




//@route  POST api/users
//to register User

router.post('/',[
    check('name',"Name is Required").not().isEmpty(),
    check('email','Please enter a valid Mail').isEmail(),
    check('password','Please Enter a password with 6 letter').isLength({min:6})
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    console.log(req.body);
    res.send("User Route")
})

module.exports = router;
