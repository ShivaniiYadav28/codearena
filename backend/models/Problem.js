const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      default: "Easy",
    },

    starterCode: {
      type: String,
      default: "",
    },

    testCases: [
      {
        input: {
          type: String,
          required: true,
        },

        output: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Problem",
  problemSchema
);