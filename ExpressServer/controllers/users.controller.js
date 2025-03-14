const users = require("../model/users.model");

function postUser(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing user name",
    });
  }
  const newUser = {
    id: users.length,
    name: req.body.name,
  };
  users.push(newUser);
  res.json(newUser);
}

function getUsers(req, res) {
  res.status(200).json(users);
}

function getUser(req, res) {
  const userId = Number(req.params.userId);
  const user = users[userId];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      error: "User does not exist",
    });
  }
}

module.exports = {
  postUser,
  getUsers,
  getUser,
};
