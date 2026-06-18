const Problem = require("../models/Problem");

const runCode = async (req, res) => {
  try {
    const { code, problemId } = req.body;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    try {
      const result = new Function(
        code + "; return 'Code Executed Successfully';"
      )();

      res.status(200).json({
        success: true,
        verdict: "Accepted",
        output: result,
      });
    } catch (err) {
      res.status(200).json({
        success: true,
        verdict: "Runtime Error",
        output: err.message,
      });
    }
  } catch (error) {
    console.log("CODE EXECUTION ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Code execution failed",
    });
  }
};

module.exports = {
  runCode,
};