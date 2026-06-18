const User = require("../models/User");
const Submission = require("../models/Submission");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const totalSubmissions = await Submission.countDocuments({
      user: req.user.id,
    });

    const acceptedSolutions = await Submission.countDocuments({
      user: req.user.id,
      status: "Accepted",
    });

    res.json({
      name: user.name,
      email: user.email,
      totalSubmissions,
      acceptedSolutions,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const totalSubmissions = await Submission.countDocuments({
      user: req.user.id,
    });

    const acceptedSolutions = await Submission.countDocuments({
      user: req.user.id,
      status: "Accepted",
    });

    const problemsSolved = acceptedSolutions;

    const leaderboard = await Submission.aggregate([
      {
        $match: {
          status: "Accepted",
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
        $sort: {
          acceptedCount: -1,
        },
      },
    ]);

    let rank = "N/A";

    const userIndex = leaderboard.findIndex(
      (item) => item._id.toString() === req.user.id
    );

    if (userIndex !== -1) {
      rank = userIndex + 1;
    }

    const recentSubmissions = await Submission.find({
      user: req.user.id,
    })
      .populate("problem", "title")
      .sort({
        createdAt: -1,
      })
      .limit(5);

    res.json({
      name: user.name,
      email: user.email,
      problemsSolved,
      totalSubmissions,
      acceptedSolutions,
      rank,
      recentSubmissions,
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  getDashboard,
};