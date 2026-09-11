import PageTransition from "../../components/PageTransition";
import { FaShippingFast, FaShieldAlt, FaAward, FaHeadset } from "react-icons/fa";
import "../category/categoryProducts.css";
import "./about.css";

function About() {
  return (
    <PageTransition>
      <div className="about_page">
        <div className="container">
          <div className="top_slide">
            <h2>About Velora Store</h2>
            <p>Empowering your digital lifestyle with top-tier technology and accessories</p>
          </div>

          <div className="about_story">
            <div className="about_story_text">
              <h3>Your Premier Tech & Lifestyle Destination</h3>
              <p>
                Founded with a passion for innovation, Velora Store brings together
                the finest selection of smartphones, mobile accessories, laptops,
                smart wearables, and lifestyle gear. We believe modern technology
                should be seamless, reliable, and accessible to everyone.
              </p>
              <p>
                Our team meticulously curates every product in our catalog to ensure
                premium build quality, high performance, and unbeatable value.
                Whether you are upgrading your setup or looking for the ideal tech
                gift, Velora is committed to delivering excellence.
              </p>
            </div>

            <div className="about_stats">
              <div className="stat_card">
                <h4>10K+</h4>
                <p>Happy Customers</p>
              </div>
              <div className="stat_card">
                <h4>500+</h4>
                <p>Curated Products</p>
              </div>
              <div className="stat_card">
                <h4>99%</h4>
                <p>Satisfaction Rate</p>
              </div>
              <div className="stat_card">
                <h4>24/7</h4>
                <p>Dedicated Support</p>
              </div>
            </div>
          </div>

          <div className="about_features">
            <div className="feature_box">
              <div className="feature_icon">
                <FaShippingFast />
              </div>
              <h4>Fast & Free Delivery</h4>
              <p>
                Enjoy swift and reliable dispatch right to your doorstep on all
                qualifying orders.
              </p>
            </div>

            <div className="feature_box">
              <div className="feature_icon">
                <FaShieldAlt />
              </div>
              <h4>Secure Payments</h4>
              <p>
                Shop with complete peace of mind using enterprise-grade encrypted
                payment channels.
              </p>
            </div>

            <div className="feature_box">
              <div className="feature_icon">
                <FaAward />
              </div>
              <h4>Quality Guarantee</h4>
              <p>
                Every product is 100% genuine, rigorously tested, and backed by
                our satisfaction warranty.
              </p>
            </div>

            <div className="feature_box">
              <div className="feature_icon">
                <FaHeadset />
              </div>
              <h4>24/7 Expert Support</h4>
              <p>
                Our friendly support specialists are always on standby to assist
                with any questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default About;
