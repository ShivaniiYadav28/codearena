import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function ProblemDetails() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await API.get(
          `/problems/${id}`
        );

        setProblem(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProblem();
  }, [id]);

  if (!problem) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Problem...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "15px",
            color: "#111827",
          }}
        >
          {problem.title}
        </h1>

        <p>
          <strong>
            Difficulty:
          </strong>{" "}
          <span
            style={{
              color:
                problem.difficulty ===
                "Easy"
                  ? "#16a34a"
                  : problem.difficulty ===
                    "Medium"
                  ? "#ea580c"
                  : "#dc2626",
              fontWeight: "bold",
            }}
          >
            {problem.difficulty}
          </span>
        </p>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <h2>Description</h2>

          <p
            style={{
              lineHeight: "1.8",
              marginTop: "10px",
            }}
          >
            {problem.description}
          </p>
        </div>

        <div
          style={{
            marginTop: "25px",
          }}
        >
          <h2>Sample Input</h2>

          <pre
            style={{
              background:
                "#111827",
              color: "white",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "10px",
              overflowX: "auto",
            }}
          >
            {problem.sampleInput ||
              "No sample input provided"}
          </pre>
        </div>

        <div
          style={{
            marginTop: "25px",
          }}
        >
          <h2>Sample Output</h2>

          <pre
            style={{
              background:
                "#111827",
              color: "white",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "10px",
              overflowX: "auto",
            }}
          >
            {problem.sampleOutput ||
              "No sample output provided"}
          </pre>
        </div>

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <Link
            to={`/editor/${problem._id}`}
          >
            <button
              style={{
                background:
                  "#2563eb",
                color: "white",
                border: "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "10px",
                cursor:
                  "pointer",
                fontSize: "16px",
                fontWeight:
                  "600",
              }}
            >
              🚀 Solve Problem
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetails;