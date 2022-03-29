const express = require("express");
const auth = require("../middlewares/auth");
const Member = require("../models/Member");
const User = require("../models/User");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Members API" });
});

router.get("/members", async (req, res, next) => {
  try {
    let result = [];
    let members = await Member.find();
    members.forEach(member => {
      result.push(member.memberJSON());
    });
    return res.status(200).json({ members: result });
  } catch (error) {
    return res.status(400).next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.user.email });
    if (user) {
      return res
        .status(400)
        .json({ message: "A user already exists for this email" });
    }
    user = await User.create(req.body.user);
    let token = await user.signToken();
    return res.status(201).json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  let { email, password } = req.body.user;
  if (!email || !password) {
    return res.status(400).json({ error: "Email/Password required" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    let result = await user.verifyPassword(password);
    if (!result) {
      return res.status(400).json({ error: "Incorrect Password" });
    }
    let token = await user.signToken();
    return res.status(201).json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

router.post("/addmember", auth.verifyToken, async (req, res, next) => {
  try {
    let member = await Member.create(req.body.member);
    return res.status(201).json({ member: member.memberJSON() });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id/delete", auth.verifyToken, async (req, res, next) => {
  let id = req.params.id;
  try {
    let deletedMember = await Member.findByIdAndDelete(id);
    return res.status(201).json({ message: "success member deleted" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;