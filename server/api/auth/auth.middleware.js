const ls = require("local-storage");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcryptjs');

const userService = require("../user/user.service");
const { userSchema } = require("../user/user.validation");
const APIPres = require("../../utils/APIres");

const verifyToken = (req, res, next) => {
  const token = req.headers("x-access-token");

  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: "a token is required for authentication",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid Token",
    });
  }
};

const regValidation = async (req, res) => {
  const { name, username, password, confirmPassword } = req.body;

  const isValid = await userSchema.validate(
    {
      name,
      username,
      password,
      confirmPassword,
    },
    {
      abortEarly: false,
    }
  );

  if (isValid.error)
    return res.status(StatusCodes.BAD_REQUEST).json(isValid.error);
  // return res.status(StatusCodes.OK).json({
  //     message: "valid"
  // })
};

const loginValidation = async (req, res) => {
  const { username, password } = req.body;

  //check username
  const user = await userService.findByUsername(username);
  if(!user) {
      const err = new Error("User not found");
      err.StatusCode = StatusCodes.BAD_REQUEST;
      return next(err);
  }

  //check password
  const isPassword = await bcrypt.compare(password, user.password);
  if(!isPassword){
      const err = new Error("Password incorrect");
      err.StatusCode = StatusCodes.BAD_REQUEST;
      return next(err);
  }
};

module.exports = { verifyToken, regValidation, loginValidation };
