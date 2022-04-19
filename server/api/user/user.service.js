const User = require("./user.model");

const createUser = (name, username, password, confirmPassword) => {
  return new User({name, username, password, confirmPassword});
};

const findByUsername = (username) => User.findOne({username: username});

const findAll = () =>  User.find();

const findById = (user_id) => User.findOne({ where: { id: user_id } });

const deleteById = (userId) => User.findByIdAndDelete(user_id);

const updateById = (user_id) => User.findByIdAndUpdate(user_id);

// const upad

module.exports = {
  createUser,
  findAll,
  findById,
  findByUsername,
  deleteById,
  updateById,
};
