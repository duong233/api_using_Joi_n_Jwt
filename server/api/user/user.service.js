const User = require("./user.model");

const createUser = (name, username, password, confirmPassword) => {
  return new User({name, username, password, confirmPassword});
};

const findByUsername = (username) => User.findOne({username: username});

const findAll = () =>  User.find();

const findById = (userId) => User.findOne({ where: { id: userId } });

const deleteById = (userId) => User.findByIdAndDelete(userId);

const updateById = (userId) => User.findByIdAndUpdate(userId);

// const upad

module.exports = {
  createUser,
  findAll,
  findById,
  findByUsername,
  deleteById,
  updateById,
};
