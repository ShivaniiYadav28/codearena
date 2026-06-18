const Submission = require("../models/Submission");
const Problem = require("../models/Problem");

const createSubmission = async (req, res) => {
  try {
    const { problem, code, language } = req.body;

    const problemData = await Problem.findById(
      problem
    );

    if (!problemData) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    let status = "Accepted";

    if (!code || code.trim().length < 10) {
      status = "Wrong Answer";
    }

    const submission =
      await Submission.create({
        user: req.user.id,
        problem,
        code,
        language,
        status,
      });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSubmissions = async (
  req,
  res
) => {
  try {
    const submissions =
      await Submission.find({
        user: req.user.id,
      })
        .populate("problem")
        .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSubmissionById = async (
  req,
  res
) => {
  try {
    const submission =
      await Submission.findById(
        req.params.id
      ).populate("problem");

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLeaderboard = async (
  req,
  res
) => {
  try {
    const leaderboard =
      await Submission.aggregate([
        {
          $match: {
            status: "Accepted",
            user: { $ne: null },
          },
        },
        {
          $group: {
            _id: "$user",
            acceptedCount: {
              $sum: 1,
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            acceptedCount: 1,
            name: "$user.name",
            email: "$user.email",
          },
        },
        {
          $sort: {
            acceptedCount: -1,
          },
        },
      ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSubmission,
  getSubmissions,
  getSubmissionById,
  getLeaderboard,
};