import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import EditorPage from "./pages/EditorPage";
import Submissions from "./pages/Submissions";
import SubmissionDetails from "./pages/SubmissionDetails";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import CreateProblem from "./pages/CreateProblem";
import EditProblem from "./pages/EditProblem";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import ThemeProvider from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Register />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/problems"
            element={
              <ProtectedRoute>
                <Problems />
              </ProtectedRoute>
            }
          />

          <Route
            path="/problems/:id"
            element={
              <ProtectedRoute>
                <ProblemDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/submissions"
            element={
              <ProtectedRoute>
                <Submissions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/submission/:id"
            element={
              <ProtectedRoute>
                <SubmissionDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-problem"
            element={
              <ProtectedRoute>
                <CreateProblem />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-problem/:id"
            element={
              <ProtectedRoute>
                <EditProblem />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;