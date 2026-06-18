import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(
          "/users/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  const progress =
    data.totalSubmissions > 0
      ? Math.round(
          (data.acceptedSolutions /
            data.totalSubmissions) *
            100
        )
      : 0;

  return (
    <div
      style={{
        padding: "20px 30px",
        background: "#f3f4f6",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
          color: "#111827",
        }}
      >
        Dashboard
      </h1>

      {/* Profile Card */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "25px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#2563eb,#60a5fa)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            {data.name?.charAt(0)}
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                color: "#111827",
              }}
            >
              {data.name}
            </h2>

            <p
              style={{
                marginTop: "8px",
                color: "#6b7280",
              }}
            >
              {data.email}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#60a5fa)",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow:
              "0 10px 25px rgba(37,99,235,0.3)",
          }}
        >
          <h3>Problems Solved</h3>
          <h1>{data.problemsSolved}</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#7c3aed,#a855f7)",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow:
              "0 10px 25px rgba(124,58,237,0.3)",
          }}
        >
          <h3>Total Submissions</h3>
          <h1>{data.totalSubmissions}</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#16a34a,#22c55e)",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow:
              "0 10px 25px rgba(34,197,94,0.3)",
          }}
        >
          <h3>Accepted Solutions</h3>
          <h1>{data.acceptedSolutions}</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#ea580c,#fb923c)",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow:
              "0 10px 25px rgba(234,88,12,0.3)",
          }}
        >
          <h3>Leaderboard Rank</h3>
          <h1>#{data.rank}</h1>
        </div>
      </div>

      {/* Success Rate */}

      <div
        style={{
          marginTop: "30px",
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Success Rate</h2>

        <div
          style={{
            width: "100%",
            height: "25px",
            background: "#e5e7eb",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background:
                "linear-gradient(to right,#22c55e,#16a34a)",
            }}
          />
        </div>

        <p
          style={{
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          {progress}% Success Rate
        </p>
      </div>

      {/* Recent Submissions */}

      <div
        style={{
          marginTop: "30px",
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Recent Submissions</h2>

        {data.recentSubmissions &&
        data.recentSubmissions.length >
          0 ? (
          <table
            style={{
              width: "100%",
              marginTop: "20px",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background:
                    "#f3f4f6",
                }}
              >
                <th style={{ padding: "12px" }}>
                  Problem
                </th>

                <th style={{ padding: "12px" }}>
                  Status
                </th>

                <th style={{ padding: "12px" }}>
                  Language
                </th>
              </tr>
            </thead>

            <tbody>
              {data.recentSubmissions.map(
                (submission) => (
                  <tr
                    key={submission._id}
                  >
                    <td
                      style={{
                        padding: "12px",
                        textAlign:
                          "center",
                      }}
                    >
                      {
                        submission
                          .problem?.title
                      }
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        textAlign:
                          "center",
                      }}
                    >
                      {submission.status ===
                      "Accepted"
                        ? "✅ Accepted"
                        : "❌ Wrong Answer"}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        textAlign:
                          "center",
                      }}
                    >
                      {
                        submission.language
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <p>No submissions yet.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;