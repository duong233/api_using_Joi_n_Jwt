const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

const User = require("./user.model");
const {
  createUser,
  findAll,
  findById,
  deleteById,
  updateById,
} = require("./user.service");
const { userSchema } = require("./user.validation");
const transporter = require('../../helpers/email');

//POST /register
const create = async (req, res, next) => {
  const {name, username, password, confirmPassword} = req.body;

  const isValid = await userSchema.validate({
    name,
    username,
    password,
    confirmPassword
  });
  if (isValid.error)
    return res.status(StatusCodes.BAD_REQUEST).json(isValid.error.message);
  
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const confirmHashPw = await bcrypt.hash(req.body.confirmPassword, salt);

  if (hashPassword !== confirmHashPw)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "password doesnt match with confirm password",
    });

  //send email
    const options = {
      from: `${process.env.NODE_USER}`,
      to: username,
      subject: 'Test send email to an account',
      html: `<p>WWF's goal is to: <q>Build a future where people live in harmony with nature.</q></p>`
    }
    
    transporter.sendMail(options);

    const user = createUser(name, username, hashPassword, confirmHashPw);
  
    user
    .save()
    .then((data) => {
      res.status(StatusCodes.CREATED).json({
        message: "item saved to database",
      });
    })
    .catch((err) => {
      next(err);
      // res.status(StatusCodes.BAD_REQUEST).json({
      //   message: "unable to save data",
      // });
    });
};

//GET /user
const getAllUser = async (req, res, next) => {
    try{
        const user = await findAll();
        res.status(StatusCodes.OK).json(user);
    }catch(err){
      console.log(err);
        // next(err);
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "no user found"
        });
    };
};

//GET /user/:id
const getUserById = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await findById(id);
        res.status(StatusCodes.OK).send(user);
    }catch(err){
        // next(err);
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "wrong id"
        })
    }
};

//DELETE /delete/:id
const deleteUser = async (req, res, next) => {

  const id = req.params.id;

  try{
    await deleteById(id);
    res.status(StatusCodes.OK).json({
      message:"delete success"
    })
  }catch(err){
    res.status(StatusCodes.BAD_REQUEST).json({
      message:"unable to delete"
    });
    next(err);
  }
};

//put //update/:id
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const isValid = User.validate(req.body);
    if(isValid.error) {
      return res.status(StatusCodes.BAD_REQUEST).json(isValid.error.message);
    }
    try{
      await updateById(id);
      return res.status(StatusCodes.OK).json({
        message:"update success"
      })
    }catch(err){
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:"update fail"
      })
      next(err);
    }
};

module.exports = {
  create,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
};
