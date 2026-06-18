import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] =
    useState(false);

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav
      style={{
        background:
          "linear-gradient(90deg,#020617,#0f172a)",
        padding: "15px 30px",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        to="/dashboard"
        style={{
          textDecoration: "none",
        }}
      >
        <h1
          style={{
            color: "#60a5fa",
            margin: 0,
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          🚀 CodeArena
        </h1>
      </Link>

      {token ? (
        <div
          style={{
            display: "flex",
            gap: "25px",
            alignItems: "center",
          }}
        >
          <Link
            to="/dashboard"
            style={linkStyle}
          >
            Dashboard
          </Link>

          <Link
            to="/problems"
            style={linkStyle}
          >
            Problems
          </Link>

          <Link
            to="/submissions"
            style={linkStyle}
          >
            Submissions
          </Link>

          <Link
            to="/leaderboard"
            style={linkStyle}
          >
            Leaderboard
          </Link>

          <Link
            to="/profile"
            style={linkStyle}
          >
            Profile
          </Link>

          <Link
            to="/create-problem"
            style={linkStyle}
          >
            Create Problem
          </Link>

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            style={{
              background:
                darkMode
                  ? "#f59e0b"
                  : "#374151",
              color: "white",
              border: "none",
              padding:
                "10px 15px",
              borderRadius:
                "10px",
              cursor:
                "pointer",
              fontWeight:
                "bold",
            }}
          >
            {darkMode
              ? "☀️ Light"
              : "🌙 Dark"}
          </button>

          <span
            style={{
              color: "#93c5fd",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            👋{" "}
            {user.name ||
              "User"}
          </span>

          <button
            onClick={handleLogout}
            style={{
              background:
                "#ef4444",
              color: "white",
              border: "none",
              padding:
                "10px 18px",
              borderRadius:
                "10px",
              cursor:
                "pointer",
              fontWeight:
                "bold",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Link
            to="/login"
            style={linkStyle}
          >
            Login
          </Link>

          <Link
            to="/"
            style={linkStyle}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "18px",
};

export default Navbar;