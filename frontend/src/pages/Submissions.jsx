import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Submissions() {
  const [submissions, setSubmissions] =
    useState([]);

  useEffect(() => {
    const fetchSubmissions =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res = await API.get(
            "/submissions",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSubmissions(res.data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchSubmissions();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
        }}
      >
        My Submissions
      </h1>

      {submissions.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <p>No submissions found.</p>
        </div>
      ) : (
        submissions.map(
          (submission) => (
            <Link
              key={submission._id}
              to={`/submission/${submission._id}`}
              style={{
                textDecoration:
                  "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  background:
                    "white",
                  padding: "20px",
                  borderRadius:
                    "15px",
                  marginBottom:
                    "20px",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08)",
                  transition:
                    "0.3s",
                }}
              >
                <h2
                  style={{
                    marginBottom:
                      "10px",
                    color:
                      "#111827",
                  }}
                >
                  {submission.problem
                    ?.title ||
                    "Unknown Problem"}
                </h2>

                <p>
                  <strong>
                    Language:
                  </strong>{" "}
                  {
                    submission.language
                  }
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  <span
                    style={{
                      color:
                        submission.status ===
                        "Accepted"
                          ? "#16a34a"
                          : submission.status ===
                            "Runtime Error"
                          ? "#dc2626"
                          : "#ea580c",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {submission.status ===
                    "Accepted"
                      ? "✅ Accepted"
                      : submission.status ===
                        "Runtime Error"
                      ? "💥 Runtime Error"
                      : "❌ Wrong Answer"}
                  </span>
                </p>

                <p>
                  <strong>
                    Submitted:
                  </strong>{" "}
                  {new Date(
                    submission.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </Link>
          )
        )
      )}
    </div>
  );
}

export default Submissions;