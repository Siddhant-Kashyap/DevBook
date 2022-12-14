const express = require("express");
const request = require('request')
const config = require('config')
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validator, validationResult } = require("express-validator");
const { response } = require("express");

//route to get profile /api/profile/me

router.get("/me", auth,async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).send("There is no profile for this user ");
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("/me wala Server Error");
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //Build profile objects

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername =githubusername;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //for social objects
    profileFields.social ={}

    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook =facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

    try {

        let profile = await Profile.findOne({user:req.user.id})

        if(profile){
            //UPDATE
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set : profileFields},
                {new :true}
            )

            return res.json(profile)
        }

        //Create
        profile = new Profile(profileFields);
        await profile.save()
        res.json(profile)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error");
    }


  }
);


//to get all the Profile
router.get("/",async(req,res)=>{
    try {

        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles)
        
    } catch (error) {
        console.error(error.message);
        req.status(500).send('Server error')
    }
})


//get profile of one person by id
router.get('/user/:user_id',async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name',"avatar"])
        if(!profile){
            return res.status(400).json({msg:"There is no profile for this User"})
        }
        res.json(profile)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})


//to delete the profile and user
router.delete('/',auth,async(req,res)=>{
    try {
      //to remove profile
      await Profile.findOneAndRemove({user: req.user.id})
      //to remove user
      await User.findOneAndRemove({_id:req.user.id});

      res.json({msg:'User has been deleted'})
      
    } catch (error) {
      console.error(error.message);
        res.status(500).send('Server error')
    }
})

//to add the experience 
//we will use the route /api/profile/experience
router.put('/experience',[auth,[
  check('title','Title is required').not().isEmpty(),
  check('company','Company name is Required ').not().isEmpty(),
  check('from','Date is required ').not().isEmpty()
  

]],async(req,res)=>{
  const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }= req.body;



    const newExp={
      title,    // {this is similar to title :title}
      company,
      location,
      from,
      to,
      current,
      description
    }



    try {

        const profile = await Profile.findOne({user: req.user.id});

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile)


      
    } catch (error) {
      console.error(error.message);
        res.status(500).send('Server error')
    }


})

//to delete the experience 
//@route  --> api/experience/:exp_id

router.delete('/experience/:exp_id',auth,async(req,res)=>{

  try{
  const profile = await Profile.findOne({user:req.user.id})
  //get remove index
  const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

  profile.experience.splice(removeIndex,1);

  await profile.save();

  res.json(profile);
  }
  catch(err){
    console.err(err.message);
    res.status(400).send('Server Error');
  }


})


// to add the education //put /api/profile/education
//private

router.put('/education',[auth,[
  check('school','School id required').not().isEmpty(),
  check('degree','Degree is required').not().isEmpty(),
  check('fieldofstudy','Feild is required').not().isEmpty(),
  check('from','from date is required').not().isEmpty()
]],async(req,res)=>{
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({error:error.array()});
  }

  const {   
  
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }= req.body;



  const newEdu={
       // {this is similar to title :title}
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }



  try {
    const profile = await Profile.findOne({user:req.user.id});
    profile.education.unshift(newEdu)

    await profile.save()
    res.json(profile);



  } catch (err) {
    console.err(err.message);
    res.status(400).send('Server Error');
  }
  
})

//to delete the education from the profile

router.delete('/education/:edu_id',auth,async(req,res)=>{
    try {
      const profile = await Profile.findOne({user:req.user.id})

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.edu_id)

        profile.education.splice(removeIndex,1);
        await profile.save();

        res.json(profile);

      
      



    } catch (error) {
      console.error(error.message);
    res.status(400).send('Server Error');
    }
})


//to get the github repositry
router.get('/github/:username',(req,res)=>{
  try {

    const options ={
      // uri:`https://github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
      uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
      method:'GET',
      headers : {'user-agent':'node.js'}

    }

    request(options,(error,response,body)=>{
      if(error) console.log(error);
      if(response.statusCode !== 200){
        return res.status(400).json({msg:'NO GITHUB PROFILE FOUND'})
      }

      res.json(JSON.parse(body));
    })


    
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server Error');
  }

})





module.exports = router;
