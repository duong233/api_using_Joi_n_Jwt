const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ls = require("local-storage");
const { StatusCodes } = require("http-status-codes");

const userService = require("../user/user.service");
const { changePwSchema } = require("./auth.validation");

const login = async (req, res, next) => {
  const { username, password } = req.body ;

  //check username
  const user = await userService.findByUsername(username);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  console.log(user);

  //check password
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    const err = new Error("Password incorrect");
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }

  //create token
  const token = jwt.sign(
    {
      id: user._id
    },
    process.env.TOKEN_SECRET, 
    {
      expiresIn: "12h",
    }
  );
  ls.set("token", token);
  return res.status(StatusCodes.OK).json({
    token: token,
  });
};

const changePassword = async (req, res, next) => {
  const { id, newPassword, confirmPassword } = req.body;
  if (!id) {
    const err = new Error("User not found");
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }

  //check password valid
  const isValid = await changePwSchema.validate(
    {
      newPassword,
      confirmPassword,
    },
    { abortEarly: false }
  );

  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).json(isValid.error.message);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    await userService.updateById(id, hash);
    return res.status(StatusCodes.OK).json({
      message: "Password has been changed",
    });
  } catch (err) {
    return res.status(StatusCodes, BAD_REQUEST).json(err);
  }
};

module.exports = { login, changePassword };
