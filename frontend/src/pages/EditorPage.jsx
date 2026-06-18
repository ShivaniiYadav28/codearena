import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import API from "../services/api";

function EditorPage() {
  const { id } = useParams();

  console.log("Editor Page Loaded");
  console.log(id);

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await API.get(`/problems/${id}`);

        setProblem(res.data);

        setCode(
          res.data.starterCode ||
            "// Write your solution here"
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchProblem();
  }, [id]);

  const handleRun = async () => {
    try {
      const res = await API.post("/code/run", {
        code,
        language: "javascript",
        problemId: id,
      });

      setOutput(res.data.output);
    } catch (error) {
      console.log(error);
      setOutput("Error running code");
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const runRes = await API.post(
        "/code/run",
        {
          code,
          language: "javascript",
          problemId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const finalVerdict =
        runRes.data.verdict || "Accepted";

      setOutput(runRes.data.output);
      setVerdict(finalVerdict);

      await API.post(
        "/submissions",
        {
          problem: id,
          code,
          language: "javascript",
          status: finalVerdict,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        `Submission Result: ${finalVerdict}`
      );
    } catch (error) {
      console.log(error);
      alert(
        "Failed to save submission"
      );
    }
  };

  if (!problem) {
    return (
      <div
        style={{
          padding: "30px",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#f3f4f6",
      }}
    >
      {/* LEFT PANEL */}

      <div
        style={{
          width: "40%",
          background: "#ffffff",
          padding: "25px",
          overflowY: "auto",
          borderRight:
            "1px solid #e5e7eb",
        }}
      >
        <h1
          style={{
            marginBottom: "15px",
          }}
        >
          {problem.title}
        </h1>

        <p>
          <strong>Difficulty:</strong>{" "}
          <span
            style={{
              color:
                problem.difficulty ===
                "Easy"
                  ? "#16a34a"
                  : problem.difficulty ===
                    "Medium"
                  ? "#f59e0b"
                  : "#dc2626",
              fontWeight: "bold",
            }}
          >
            {problem.difficulty}
          </span>
        </p>

        <hr
          style={{
            margin: "20px 0",
          }}
        />

        <h3>Description</h3>

        <p
          style={{
            lineHeight: "1.8",
            marginTop: "10px",
          }}
        >
          {problem.description}
        </p>

        {problem.testCases &&
          problem.testCases.length >
            0 && (
            <>
              <hr
                style={{
                  margin:
                    "20px 0",
                }}
              />

              <h3>
                Sample Test Cases
              </h3>

              {problem.testCases.map(
                (
                  test,
                  index
                ) => (
                  <div
                    key={index}
                    style={{
                      background:
                        "#f8fafc",
                      padding:
                        "15px",
                      borderRadius:
                        "10px",
                      marginTop:
                        "10px",
                    }}
                  >
                    <p>
                      <strong>
                        Input:
                      </strong>{" "}
                      {
                        test.input
                      }
                    </p>

                    <p>
                      <strong>
                        Output:
                      </strong>{" "}
                      {
                        test.output
                      }
                    </p>
                  </div>
                )
              )}
            </>
          )}
      </div>

      {/* RIGHT PANEL */}

      <div
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* CODE EDITOR */}

        <Editor
          height="65%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) =>
            setCode(value || "")
          }
          options={{
            fontSize: 16,
            minimap: {
              enabled: false,
            },
            automaticLayout: true,
            scrollBeyondLastLine:
              false,
          }}
        />

        {/* BUTTONS */}

        <div
          style={{
            background: "#ffffff",
            padding: "15px",
            display: "flex",
            gap: "10px",
            borderBottom:
              "1px solid #e5e7eb",
          }}
        >
          <button
            onClick={handleRun}
            style={{
              background:
                "#2563eb",
              color: "white",
              border: "none",
              padding:
                "10px 20px",
              borderRadius:
                "8px",
              cursor:
                "pointer",
              fontWeight:
                "600",
            }}
          >
            ▶ Run Code
          </button>

          <button
            onClick={handleSubmit}
            style={{
              background:
                "#16a34a",
              color: "white",
              border: "none",
              padding:
                "10px 20px",
              borderRadius:
                "8px",
              cursor:
                "pointer",
              fontWeight:
                "600",
            }}
          >
            ✓ Submit
          </button>
        </div>

        {/* OUTPUT */}

        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            background:
              "#ffffff",
          }}
        >
          <h2>Output</h2>

          <pre
            style={{
              background:
                "#f8fafc",
              padding: "15px",
              borderRadius:
                "10px",
              minHeight:
                "100px",
            }}
          >
            {output ||
              "Run your code to see output"}
          </pre>

          <h2
            style={{
              marginTop: "20px",
            }}
          >
            Verdict
          </h2>

          <h3>
            {verdict ===
            "Accepted"
              ? "✅ Accepted"
              : verdict ===
                "Wrong Answer"
              ? "❌ Wrong Answer"
              : verdict ===
                "Runtime Error"
              ? "💥 Runtime Error"
              : "No Submission Yet"}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;