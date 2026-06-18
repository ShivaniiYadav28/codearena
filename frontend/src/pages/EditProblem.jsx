import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import API from "../services/api";

function EditProblem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      difficulty: "Easy",
      starterCode: "",
      testCases: "",
    });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await API.get(
          `/problems/${id}`
        );

        setFormData({
          title: res.data.title,
          description:
            res.data.description,
          difficulty:
            res.data.difficulty,
          starterCode:
            res.data.starterCode,
          testCases: JSON.stringify(
            res.data.testCases,
            null,
            2
          ),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProblem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.put(
        `/problems/${id}`,
        {
          ...formData,
          testCases: JSON.parse(
            formData.testCases
          ),
        }
      );

      alert(
        "✅ Problem Updated Successfully"
      );

      navigate("/problems");
    } catch (error) {
      console.log(error);

      alert(
        "❌ Failed To Update Problem"
      );
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
          ✏️ Edit Problem
        </h1>

        <form onSubmit={handleSubmit}>
          <label>
            Problem Title
          </label>

          <input
            type="text"
            name="title"
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
            value={
              formData.description
            }
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
            value={
              formData.difficulty
            }
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
            value={
              formData.starterCode
            }
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
            value={
              formData.testCases
            }
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
                "#f59e0b",
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
            💾 Update Problem
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProblem;