import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function SubmissionDetails() {
  const { id } = useParams();

  const [submission, setSubmission] =
    useState(null);

  useEffect(() => {
    const fetchSubmission =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res = await API.get(
            `/submissions/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSubmission(res.data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchSubmission();
  }, [id]);

  if (!submission) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Submission Details</h1>

      <p>
        <strong>Problem:</strong>{" "}
        {
          submission.problem?.title
        }
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {submission.status}
      </p>

      <p>
        <strong>Language:</strong>{" "}
        {submission.language}
      </p>

      <p>
        <strong>Submitted:</strong>{" "}
        {new Date(
          submission.createdAt
        ).toLocaleString()}
      </p>

      <h3>Code</h3>

      <pre
        style={{
          background: "#f4f4f4",
          padding: "15px",
          overflowX: "auto",
        }}
      >
        {submission.code}
      </pre>
    </div>
  );
}

export default SubmissionDetails;