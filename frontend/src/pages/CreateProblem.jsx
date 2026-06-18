import { useState } from "react";
import API from "../services/api";

function CreateProblem() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    starterCode: "",
    testCases: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        starterCode: formData.starterCode,
        testCases: JSON.parse(formData.testCases),
      };

      await API.post("/problems", payload);

      alert("✅ Problem Created Successfully");

      setFormData({
        title: "",
        description: "",
        difficulty: "Easy",
        starterCode: "",
        testCases: "",
      });
    } catch (error) {
      console.log(error);
      alert("❌ Failed to Create Problem");
    }
  };

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
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
          }}
        >
          ➕ Create Problem
        </h1>

        <form onSubmit={handleSubmit}>
          <label>
            Problem Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter problem title"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "10px",
              border:
                "1px solid #ddd",
            }}
          />

          <label>
            Description
          </label>

          <textarea
            name="description"
            placeholder="Enter problem description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "10px",
              border:
                "1px solid #ddd",
            }}
          />

          <label>
            Difficulty
          </label>

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "10px",
              border:
                "1px solid #ddd",
            }}
          >
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

          <label>
            Starter Code
          </label>

          <textarea
            name="starterCode"
            placeholder="Write starter code here..."
            value={formData.starterCode}
            onChange={handleChange}
            rows="8"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "10px",
              border:
                "1px solid #ddd",
              fontFamily:
                "monospace",
            }}
          />

          <label>
            Test Cases (JSON)
          </label>

          <textarea
            name="testCases"
            placeholder='[{"input":"2 3","output":"5"}]'
            value={formData.testCases}
            onChange={handleChange}
            rows="8"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "10px",
              border:
                "1px solid #ddd",
              fontFamily:
                "monospace",
            }}
          />

          <button
            type="submit"
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
              fontSize:
                "16px",
              fontWeight:
                "600",
            }}
          >
            🚀 Create Problem
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProblem;