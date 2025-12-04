import { useState } from "react";

/**
 * SignupForm
 * ----------
 * Props:
 * - onSuccess: function called when validation passes
 * - switchToLogin: function to switch tab to login
 */
function SignupForm({ onSuccess, switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  // Reusable client-side email validator
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

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: "",
    };
    let isValid = true;

    const { name, email, password, confirmPassword, termsAccepted } = form;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Full name is required.";
      isValid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password =
        "Use at least 1 capital letter and 1 number.";
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    // Terms validation
    if (!termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms to continue.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    // In real app, send signup data to backend here.
    console.log("Signup data:", form);

    if (onSuccess) onSuccess();

    // Optional: reset form
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    });
  };

  return (
    <form className="form active" onSubmit={handleSubmit}>
      <h2>Create account</h2>

      {/* Name */}
      <div className="form-group">
        <label htmlFor="signupName">Full Name</label>
        <input
          id="signupName"
          name="name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
        />
        <small className="error-message">{errors.name}</small>
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="signupEmail">Email</label>
        <input
          id="signupEmail"
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
        <label htmlFor="signupPassword">Password</label>
        <div className="password-wrapper">
          <input
            id="signupPassword"
            name="password"
            type={showPassword.password ? "text" : "password"}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
          >
            👁
          </button>
        </div>
        <small className="error-message">{errors.password}</small>
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="signupConfirmPassword">Confirm Password</label>
        <div className="password-wrapper">
          <input
            id="signupConfirmPassword"
            name="confirmPassword"
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Re-enter password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error" : ""}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                confirm: !prev.confirm,
              }))
            }
          >
            👁
          </button>
        </div>
        <small className="error-message">
          {errors.confirmPassword}
        </small>
      </div>

      {/* Terms & Conditions */}
      <div className="form-footer form-footer-column">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={form.termsAccepted}
            onChange={handleChange}
          />
          <span>
            I agree to the{" "}
            <a href="#" className="link">
              Terms &amp; Privacy
            </a>
          </span>
        </label>
        <small className="error-message">{errors.termsAccepted}</small>
      </div>

      <button type="submit" className="btn primary">
        Create Account
      </button>

      <p className="hint">
        Already have an account?{" "}
        <button
          type="button"
          className="link"
          onClick={switchToLogin}
        >
          Login
        </button>
      </p>
    </form>
  );
}

export default SignupForm;
