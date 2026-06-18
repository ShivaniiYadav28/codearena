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

    let verdict = "Accepted";

    try {
      const solve = new Function(
        `${code}; return solve;`
      )();

      for (const testCase of problem.testCases) {
        const userOutput = solve(testCase.input);

        if (
          String(userOutput).trim() !==
          String(testCase.output).trim()
        ) {
          verdict = "Wrong Answer";
          break;
        }
      }
    } catch (err) {
      verdict = "Runtime Error";
    }

    res.status(200).json({
      success: true,
      verdict,
      output: verdict,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Code execution failed",
    });
  }
};

module.exports = {
  runCode,
};