import { useState } from "react";
import PageTransition from "../../components/PageTransition";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import "../category/categoryProducts.css";
import "./contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.success("Thank you! Your message has been sent successfully.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageTransition>
      <div className="contact_page">
        <div className="container">
          <div className="top_slide">
            <h2>Contact Us</h2>
            <p>We would love to hear from you. Get in touch with our team</p>
          </div>

          <div className="contact_wrapper">
            <div className="contact_info">
              <div className="contact_card">
                <div className="contact_icon">
                  <FaPhoneAlt />
                </div>
                <div className="contact_details">
                  <h5>Call Us</h5>
                  <p>+1 (800) 123-4567</p>
                </div>
              </div>

              <div className="contact_card">
                <div className="contact_icon">
                  <FaEnvelope />
                </div>
                <div className="contact_details">
                  <h5>Email Us</h5>
                  <p>support@velorastore.com</p>
                </div>
              </div>

              <div className="contact_card">
                <div className="contact_icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact_details">
                  <h5>Visit Us</h5>
                  <p>123 Tech Avenue, Silicon Valley, CA</p>
                </div>
              </div>

              <div className="contact_card">
                <div className="contact_icon">
                  <FaClock />
                </div>
                <div className="contact_details">
                  <h5>Working Hours</h5>
                  <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact_form_box">
              <h3>Send us a Message</h3>
              <p>Fill out the form below and we will respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="contact_form">
                <div className="form_row">
                  <div className="form_group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="email">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form_group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Inquiry about product order"
                  />
                </div>

                <div className="form_group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn_submit">
                  Send Message <FaPaperPlane />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;
