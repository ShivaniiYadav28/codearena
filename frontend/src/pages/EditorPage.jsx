import { useEffect, useState } from "react";
import API from "../services/api";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const res = await API.get(
          "/submissions/leaderboard"
        );

        setLeaders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadLeaderboard();
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
          fontSize: "48px",
          marginBottom: "25px",
          color: "#111827",
        }}
      >
        🏆 Leaderboard
      </h1>

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background:
                  "linear-gradient(90deg,#0f172a,#1e293b)",
                color: "white",
              }}
            >
              <th
                style={{
                  padding: "18px",
                }}
              >
                Rank
              </th>

              <th
                style={{
                  padding: "18px",
                }}
              >
                Name
              </th>

              <th
                style={{
                  padding: "18px",
                }}
              >
                Email
              </th>

              <th
                style={{
                  padding: "18px",
                }}
              >
                Accepted Solutions
              </th>
            </tr>
          </thead>

          <tbody>
            {leaders.map(
              (user, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
                    textAlign:
                      "center",
                  }}
                >
                  <td
                    style={{
                      padding:
                        "20px",
                      fontSize:
                        "24px",
                    }}
                  >
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : `#${index + 1}`}
                  </td>

                  <td
                    style={{
                      padding:
                        "20px",
                      fontWeight:
                        "600",
                    }}
                  >
                    {user.name}
                  </td>

                  <td
                    style={{
                      padding:
                        "20px",
                    }}
                  >
                    {user.email}
                  </td>

                  <td
                    style={{
                      padding:
                        "20px",
                      color:
                        "#16a34a",
                      fontWeight:
                        "bold",
                      fontSize:
                        "22px",
                    }}
                  >
                    {
                      user.acceptedCount
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "white",
          padding: "25px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          🏅 Top performers are ranked by
          Accepted Solutions
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginTop: "10px",
          }}
        >
          Solve more problems and climb
          the leaderboard!
        </p>
      </div>
    </div>
  );
}

export default Leaderboard;