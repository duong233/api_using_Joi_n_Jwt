const {verifyToken} = require('../auth/auth.middleware')
const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');

router.get("/welcome", verifyToken, (req,res)=>{
    res.status(StatusCodes.OK).json({
        title: "Login success",
        description:"Authentication with jwt"
    });
});

module.exports = router;