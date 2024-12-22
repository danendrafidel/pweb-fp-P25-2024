const express = require("express");
const User = require("../schema/User");
const Role = require("../enum/role");
const { authenticateToken, authorizeRole } = require("./middleware");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Get all operators
router.get(
  "/admin/all-operator",
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  async (req, res) => {
    try {
      const users = await User.find({ role: "operator" });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user ", error });
    }
  }
);


router.get(
    "/admin/all-operator/sum",
    authenticateToken,
    authorizeRole([Role.ADMIN]),
    async (req, res) => {
      try {
        const count = await User.countDocuments({ role: "operator" });
        res.json({totalAmount: count});
      } catch (error) {
        res.status(500).json({ message: "Error fetching user ", error });
      }
    }
  );

// Create operator
router.post(
  "/admin/all-operator/create",
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  async (req, res) => {
    const userRequest = req.body;
    const isExist = await User.findOne({
      username: userRequest.username,
    });
    try {
      if (isExist) {
        if (userRequest.role === userRequest[0].role) {
          return res.status(409).json({ message: "Existing data found." });
        }
      }

      const user = new User({
        ...userRequest,
      });
      await user.save();
      return res
        .status(201)
        .json({ message: "Data has been created successfully. ", user });
    } catch (err) {
      res.status(500).json({ message: "Error creating user ", err });
    }
  }
);

// Edit single operator
router.put("/admin/all-operator/update/:id", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password, role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
});

// Delete operator
router.delete("/admin/all-operator/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Login
router.post("/", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPassValid = password === user.password;
    const isRoleValid = role === user.role;

    if (!isPassValid) {
      return res.status(401).json({ message: "Invalid password." });
    }
    if (!isRoleValid) {
      return res.status(401).json({ message: "Invalid role" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successfull",
      token: token,
      user: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching data ", error });
  }
});

module.exports = router;
