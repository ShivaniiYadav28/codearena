import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  const acceptanceRate =
    profile.totalSubmissions > 0
      ? Math.round(
          (profile.acceptedSolutions /
            profile.totalSubmissions) *
            100
        )
      : 0;

  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
  };

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
        My Profile
      </h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#2563eb",
            color: "white",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          {profile.name
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <h2
          style={{
            marginTop: "15px",
          }}
        >
          {profile.name}
        </h2>

        <p
          style={{
            color: "#6b7280",
          }}
        >
          {profile.email}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Submissions</h3>
          <h1 style={{ color: "#7c3aed" }}>
            {profile.totalSubmissions}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Accepted Solutions</h3>
          <h1 style={{ color: "#16a34a" }}>
            {profile.acceptedSolutions}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Acceptance Rate</h3>
          <h1 style={{ color: "#ea580c" }}>
            {acceptanceRate}%
          </h1>
        </div>
      </div>

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
        <h2>Performance</h2>

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
              width: `${acceptanceRate}%`,
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
          {acceptanceRate}% Acceptance Rate
        </p>
      </div>
    </div>
  );
}

export default Profile;