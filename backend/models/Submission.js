const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Accepted",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Submission",
  submissionSchema
);