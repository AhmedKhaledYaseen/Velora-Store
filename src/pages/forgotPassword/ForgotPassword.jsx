import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { AuthContext } from "../../components/authContext/AuthContext";
import PageTransition from "../../components/PageTransition";
import "./forgotPassword.css";

export default function ForgotPassword() {
  const { forgotPassword, openLoginModal } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = forgotPassword(email);
      setLoading(false);
      if (success) {
        setIsSubmitted(true);
      } else {
        setError("We couldn't find an account with that email address.");
      }
    }, 450);
  };

  const handleOpenLogin = () => {
    openLoginModal();
    navigate("/");
  };

  return (
    <PageTransition>
      <div className="forgot-pwd-page">
        <div className="forgot-pwd-container">
          <div className="forgot-pwd-card">
            <Link to="/" className="back-link">
              <FiArrowLeft />
              <span>Back to Store</span>
            </Link>

            {isSubmitted ? (
              <div className="forgot-success-state">
                <div className="success-icon-wrapper">
                  <FiCheckCircle />
                </div>
                <h2>Check your inbox</h2>
                <p>
                  We have sent password reset instructions to{" "}
                  <strong>{email}</strong>. Please check your spam folder if you
                  don&apos;t see it shortly.
                </p>
                <div className="success-actions">
                  <button
                    type="button"
                    className="primary-action-btn"
                    onClick={handleOpenLogin}
                  >
                    Return to Sign In
                  </button>
                  <button
                    type="button"
                    className="secondary-action-btn"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try another email
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="forgot-pwd-header">
                  <span className="forgot-badge">Account Recovery</span>
                  <h1>Forgot password?</h1>
                  <p>
                    No worries! Enter your registered email address and we&apos;ll send
                    you instructions to reset your password.
                  </p>
                </div>

                {error && <div className="forgot-error-banner">{error}</div>}

                <form onSubmit={handleSubmit} className="forgot-pwd-form">
                  <div className="forgot-field">
                    <label>Email Address</label>
                    <div className="forgot-input-wrapper">
                      <FiMail className="forgot-field-icon" />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="forgot-submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Sending link..." : "Send Reset Link"}
                  </button>
                </form>

                <div className="forgot-pwd-footer">
                  <p>
                    Remember your password?{" "}
                    <button
                      type="button"
                      className="login-link-btn"
                      onClick={handleOpenLogin}
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
