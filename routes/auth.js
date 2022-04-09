const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation.js')

router.post('/register', async (req,res)=>{

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if exist
    // const emailExist = await User.findOne({email: req.body.email});
    // if(emailExist) return res.status(400).send('email already exist');

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/login', (req, res)=>{

});

router.get('userDetail', (req,res)=>{

})

module.exports = router;