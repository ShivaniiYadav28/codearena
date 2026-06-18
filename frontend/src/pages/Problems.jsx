import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const problemsRes = await API.get("/problems");
        setProblems(problemsRes.data);

        const token =
          localStorage.getItem("token");

        const submissionsRes =
          await API.get("/submissions", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        const solvedIds =
          submissionsRes.data
            .filter(
              (submission) =>
                submission.status ===
                "Accepted"
            )
            .map(
              (submission) =>
                submission.problem?._id
            );

        setSolvedProblems(solvedIds);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this problem?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(`/problems/${id}`);

      setProblems((prev) =>
        prev.filter(
          (problem) =>
            problem._id !== id
        )
      );

      alert(
        "Problem Deleted Successfully"
      );
    } catch (error) {
      console.log(error);
      alert(
        "Failed To Delete Problem"
      );
    }
  };

  const filteredProblems =
    problems.filter((problem) => {
      const matchesDifficulty =
        filter === "All"
          ? true
          : problem.difficulty ===
            filter;

      const matchesSearch =
        problem.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesDifficulty &&
        matchesSearch
      );
    });

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
        Problems
      </h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Problems"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        >
          <option value="All">
            All
          </option>
          <option value="Easy">
            Easy
          </option>
          <option value="Medium">
            Medium
          </option>
          <option value="Hard">
            Hard
          </option>
        </select>
      </div>

      {filteredProblems.length ===
      0 ? (
        <h3>No Problems Found</h3>
      ) : (
        filteredProblems.map(
          (problem) => (
            <div
              key={problem._id}
              style={{
                background:
                  "white",
                borderRadius:
                  "15px",
                padding: "20px",
                marginBottom:
                  "20px",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <Link
                to={`/problems/${problem._id}`}
                style={{
                  textDecoration:
                    "none",
                }}
              >
                <h2
                  style={{
                    color:
                      "#111827",
                  }}
                >
                  {problem.title}
                </h2>
              </Link>

              <p>
                <strong>
                  Difficulty:
                </strong>{" "}
                <span
                  style={{
                    color:
                      problem.difficulty ===
                      "Easy"
                        ? "green"
                        : problem.difficulty ===
                          "Medium"
                        ? "orange"
                        : "red",
                    fontWeight:
                      "bold",
                  }}
                >
                  {
                    problem.difficulty
                  }
                </span>
              </p>

              <p
                style={{
                  marginTop:
                    "10px",
                }}
              >
                {
                  problem.description
                }
              </p>

              <p
                style={{
                  marginTop:
                    "10px",
                }}
              >
                <strong>
                  Status:
                </strong>{" "}
                {solvedProblems.includes(
                  problem._id
                )
                  ? "✅ Solved"
                  : "❌ Unsolved"}
              </p>

              <div
                style={{
                  marginTop:
                    "15px",
                  display:
                    "flex",
                  gap: "10px",
                }}
              >
                <Link
                  to={`/editor/${problem._id}`}
                >
                  <button
                    style={{
                      background:
                        "#2563eb",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "10px 15px",
                      borderRadius:
                        "8px",
                      cursor:
                        "pointer",
                    }}
                  >
                    Solve
                  </button>
                </Link>

                <Link
                  to={`/edit-problem/${problem._id}`}
                >
                  <button
                    style={{
                      background:
                        "#f59e0b",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "10px 15px",
                      borderRadius:
                        "8px",
                      cursor:
                        "pointer",
                    }}
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      problem._id
                    )
                  }
                  style={{
                    background:
                      "#ef4444",
                    color:
                      "white",
                    border:
                      "none",
                    padding:
                      "10px 15px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}

export default Problems;