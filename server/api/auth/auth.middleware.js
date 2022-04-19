const ls = require('local-storage');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

const verifyToken = (req,res,next)=>{
    const token = req.header('x-access-token');

    if(!token){
        return res.status(StatusCodes.FORBIDDEN).json({
            message:"a token is required for authentication"
        });
    }
    try{
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decode;
        next();
        }
    catch(err){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid Token"
        })
    }
}

module.exports = verifyToken;