const express = require("express");

const router = express.Router();

const {
  getProfile,
  getDashboard,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, getProfile);

router.get("/dashboard", protect, getDashboard);

module.exports = router;