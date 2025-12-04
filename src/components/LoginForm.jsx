import { useState } from "react";

/**
 * LoginForm
 * - onSuccess: function called when validation passes
 * - switchToSignup: function to switch tab to signup
 */
function LoginForm({ onSuccess, switchToSignup }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Simple email regex for client-side validation
  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email.trim());
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };
    let isValid = true;

    const { email, password } = form;

    // Email validations
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    // Password validations
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    // In real app, send form to backend here.
    console.log("Login data:", form);

    if (onSuccess) onSuccess();
  };

  return (
    <form className="form active" onSubmit={handleSubmit}>
      <h2>Welcome back</h2>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="loginEmail">Email</label>
        <input
          id="loginEmail"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
        />
        <small className="error-message">{errors.email}</small>
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="loginPassword">Password</label>
        <div className="password-wrapper">
          <input
            id="loginPassword"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            👁
          </button>
        </div>
        <small className="error-message">{errors.password}</small>
      </div>

      {/* Extra Field: Remember me + Forgot password */}
      <div className="form-footer">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
          />
          <span>Remember me</span>
        </label>
        <a href="#" className="link">
          Forgot password?
        </a>
      </div>

      <button type="submit" className="btn primary">
        Login
      </button>

      <p className="hint">
        New here?{" "}
        <button
          type="button"
          className="link"
          onClick={switchToSignup}
        >
          Create an account
        </button>
      </p>
    </form>
  );
}

export default LoginForm;
