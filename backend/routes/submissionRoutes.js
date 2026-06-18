const express = require("express");

const router = express.Router();

const {
  createSubmission,
  getSubmissions,
  getLeaderboard,
  getSubmissionById,
} = require("../controllers/submissionController");

const { protect } = require("../middleware/authMiddleware");

router.get("/leaderboard", getLeaderboard);

router.post("/", protect, createSubmission);

router.get("/", protect, getSubmissions);

router.get("/:id", protect, getSubmissionById);

module.exports = router;