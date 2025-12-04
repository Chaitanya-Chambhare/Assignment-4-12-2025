import { useState } from "react";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import Toast from "./components/Toast.jsx";
import Footer from "./components/Footer.jsx";

/**
 * App
 * ----
 * - Handles tab switching between Login & Signup
 * - Holds toast state and passes showToast to children
 */
function App() {
  const [activeTab, setActiveTab] = useState("login"); // "login" | "signup"

  const [toast, setToast] = useState({
    visible: false,
    message: "",
  });

  // Show toast for 2.5 seconds
  const showToast = (message) => {
    setToast({ visible: true, message });

    setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, 2500);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-card">
          {/* Branding / Header */}
          <div className="auth-header">
            <h1>Aruba Networks</h1>
            <p>Login & Signup Page</p>
          </div>

          {/* Tab Switcher */}
          <div className="tab-switcher">
            <button
              type="button"
              className={`tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => handleTabChange("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => handleTabChange("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          {activeTab === "login" && (
            <LoginForm
              onSuccess={() => showToast("Login successful")}
              switchToSignup={() => handleTabChange("signup")}
            />
          )}

          {activeTab === "signup" && (
            <SignupForm
              onSuccess={() => showToast("Signup successful")}
              switchToLogin={() => handleTabChange("login")}
            />
          )}
        </div>
      </div>

      {/* Toast at root level */}
      <Toast visible={toast.visible} message={toast.message} />
      <Footer />
    </>
  );
}

export default App;
