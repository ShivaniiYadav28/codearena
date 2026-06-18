const createSubmission = async (req, res) => {
  try {
    console.log("===== CREATE SUBMISSION =====");
    console.log("REQ USER:", req.user);
    console.log("REQ BODY:", req.body);

    const { problem, code, language } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const problemData = await Problem.findById(problem);

    if (!problemData) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    let status = "Accepted";

    if (!code || code.trim().length < 10) {
      status = "Wrong Answer";
    }

    const submission = await Submission.create({
      user: req.user.id,
      problem,
      code,
      language,
      status,
    });

    console.log("SUBMISSION SAVED:", submission._id);

    res.status(201).json(submission);
  } catch (error) {
    console.error("SUBMISSION ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};