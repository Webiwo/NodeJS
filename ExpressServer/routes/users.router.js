const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.route("/").post(usersController.postUser);
router.route("/").get(usersController.getUsers);
router.route("/:userId").get(usersController.getUser);

module.exports = router;
