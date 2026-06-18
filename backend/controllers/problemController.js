const Problem = require("../models/Problem");

// Get all problems
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single problem
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(
      req.params.id
    );

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create problem
const createProblem = async (req, res) => {
  try {
    const problem = await Problem.create({
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
      starterCode: req.body.starterCode,
      testCases: req.body.testCases,
    });

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update problem
const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(
      req.params.id
    );

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    problem.title =
      req.body.title || problem.title;

    problem.description =
      req.body.description ||
      problem.description;

    problem.difficulty =
      req.body.difficulty ||
      problem.difficulty;

    problem.starterCode =
      req.body.starterCode ||
      problem.starterCode;

    problem.testCases =
      req.body.testCases ||
      problem.testCases;

    const updatedProblem =
      await problem.save();

    res.json(updatedProblem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete problem
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(
      req.params.id
    );

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    await problem.deleteOne();

    res.json({
      message:
        "Problem deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
};