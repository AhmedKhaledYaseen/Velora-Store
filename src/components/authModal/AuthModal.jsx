import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../authContext/AuthContext";
import "./authModal.css";

export default function AuthModal() {
  const { isLoginModalOpen, closeLoginModal, login, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    closeLoginModal();
  };

  useEffect(() => {
    if (!isLoginModalOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    // Lock scroll when modal is open
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      if (success) {
        resetForm();
      } else {
        setError("Invalid email or password");
      }
    }, 400);
  };

  const handleRegisterClick = () => {
    handleClose();
    navigate("/register");
  };

  const handleForgotClick = () => {
    handleClose();
    navigate("/forgot-password");
  };

  const fillDemoAccount = () => {
    setEmail("demo@velora.com");
    setPassword("password123");
    setError("");
  };

  return (
    <AnimatePresence>
      <div className="auth-modal-overlay" onClick={handleClose}>
        <motion.div
          className="auth-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
            <IoCloseOutline />
          </button>

          <div className="auth-modal-header">
            <span className="auth-badge">Welcome to Velora</span>
            <h2>Sign in to your account</h2>
            <p>Enter your details below to continue shopping</p>
          </div>

          {error && <div className="auth-error-banner">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FiMail className="field-icon" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="field-header">
                <label>Password</label>
                <button
                  type="button"
                  className="link-btn forgot-link"
                  onClick={handleForgotClick}
                >
                  Forgot password?
                </button>
              </div>
              <div className="input-wrapper">
                <FiLock className="field-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-pwd-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button
            type="button"
            className="auth-google-btn"
            onClick={googleSignIn}
          >
            <FcGoogle className="google-icon" />
            <span>Sign in with Google</span>
          </button>

          <div className="demo-credentials-box">
            <p>
              💡 Quick test?{" "}
              <button type="button" className="demo-fill-btn" onClick={fillDemoAccount}>
                Use demo account
              </button>
            </p>
          </div>

          <div className="auth-modal-footer">
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="link-btn register-link"
                onClick={handleRegisterClick}
              >
                Create one now
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
