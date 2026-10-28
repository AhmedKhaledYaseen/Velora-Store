import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../components/authContext/AuthContext";
import PageTransition from "../../components/PageTransition";
import "./register.css";

export default function Register() {
  const { register, googleSignIn, openLoginModal } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }

    if (name.trim().length < 2) {
      setError("Please enter a valid full name");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = register(name, email, password);
      setLoading(false);
      if (success) {
        navigate("/");
      } else {
        setError("An account with this email already exists");
      }
    }, 450);
  };

  const handleGoogleSignUp = () => {
    googleSignIn();
    navigate("/");
  };

  const handleOpenLogin = () => {
    openLoginModal();
  };

  return (
    <PageTransition>
      <div className="register-page">
        <div className="register-container">
          <div className="register-card">
            <div className="register-header">
              <span className="register-badge">Join Velora Store</span>
              <h1>Create an account</h1>
              <p>Sign up to track orders, save your wishlist, and enjoy exclusive deals</p>
            </div>

            {error && <div className="register-error-banner">{error}</div>}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="register-field">
                <label>Full Name</label>
                <div className="register-input-wrapper">
                  <FiUser className="register-field-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="register-field">
                <label>Email Address</label>
                <div className="register-input-wrapper">
                  <FiMail className="register-field-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="register-field">
                <label>Password</label>
                <div className="register-input-wrapper">
                  <FiLock className="register-field-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="register-pwd-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="register-field">
                <label>Confirm Password</label>
                <div className="register-input-wrapper">
                  <FiLock className="register-field-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="register-pwd-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle confirm password"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="register-perks">
                <div className="perk-item">
                  <FiCheckCircle className="perk-icon" />
                  <span>Free standard shipping on orders over $50</span>
                </div>
                <div className="perk-item">
                  <FiCheckCircle className="perk-icon" />
                  <span>Fast and secure 1-click checkout</span>
                </div>
              </div>

              <button
                type="submit"
                className="register-submit-btn"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="register-divider">
              <span>or sign up with</span>
            </div>

            <button
              type="button"
              className="register-google-btn"
              onClick={handleGoogleSignUp}
            >
              <FcGoogle className="register-google-icon" />
              <span>Sign up with Google</span>
            </button>

            <div className="register-footer">
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="login-trigger-btn"
                  onClick={handleOpenLogin}
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
