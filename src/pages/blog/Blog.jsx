import { useState } from "react";
import PageTransition from "../../components/PageTransition";
import { FaCalendarAlt, FaClock, FaArrowRight, FaTimes } from "react-icons/fa";
import "../category/categoryProducts.css";
import "./blog.css";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Essential Mobile Accessories You Need in 2026",
    category: "Gadgets",
    date: "Sep 8, 2026",
    readTime: "5 min read",
    image: "assets/img/blog-1.avif",
    excerpt:
      "From high-speed magnetic wireless chargers to multi-angle tripods and studio selfie rings, discover how these must-have accessories elevate your daily routine.",
    content:
      "Mobile devices have evolved into high-performance workstations and creative studios. To get the most out of your smartphone, having the right accessories is paramount. In this guide, we break down the top accessories of 2026: ultra-compact GaN wall chargers, MagSafe modular wallets, gimbal stabilizers, and studio illumination rings. Investing in quality accessories protects your device and multiplies your productivity.",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Wireless Earbuds for Your Lifestyle",
    category: "Buying Guides",
    date: "Sep 3, 2026",
    readTime: "6 min read",
    image: "assets/img/blog-2.avif",
    excerpt:
      "Active Noise Cancellation vs. Battery Life vs. Spatial Audio. Find out which features matter most for commuters, athletes, and audiophiles.",
    content:
      "With countless wireless earbuds flooding the market, picking the right pair can feel daunting. Start by identifying your primary use case: if you commute frequently, prioritize Active Noise Cancellation (ANC) with transparency mode. If you are an athlete, look for IPX7 water resistance and secure wingtips. Battery life, multipoint Bluetooth connectivity, and companion equalizer apps also play crucial roles in your listening experience.",
  },
  {
    id: 3,
    title: "Smartwatches vs Fitness Trackers: Which One Is Right for You?",
    category: "Smart Tech",
    date: "Aug 27, 2026",
    readTime: "4 min read",
    image: "assets/img/blog-3.avif",
    excerpt:
      "Understand the key differences between full-featured smartwatches and dedicated fitness trackers to meet your wellness goals.",
    content:
      "Smartwatches and fitness bands continue to converge, yet clear distinctions remain. Smartwatches offer app ecosystems, cellular connectivity, NFC payments, and rich interactive displays. In contrast, fitness trackers emphasize battery longevity (often lasting weeks), lightweight wearability, and specialized sleep and heart rate tracking metrics. We compare both options to help you choose the ideal wrist companion.",
  },
  {
    id: 4,
    title: "5 Proven Habits to Extend Your Smartphone Battery Health",
    category: "Tips & Tricks",
    date: "Aug 20, 2026",
    readTime: "4 min read",
    image: "assets/img/blog-4.avif",
    excerpt:
      "Simple, science-backed charging tips to keep your lithium-ion battery in optimal health for 3+ years without performance degradation.",
    content:
      "Lithium-ion batteries naturally degrade over charge cycles, but simple charging habits can double their lifespan. Avoid extreme heat exposure, especially while fast charging. Keep battery levels between 20% and 80% whenever possible, turn on optimized battery charging in your settings, and always use certified charging cables and adapters.",
  },
  {
    id: 5,
    title: "The Ultimate Guide to Modern Ergonomic Workstations",
    category: "Tips & Tricks",
    date: "Aug 15, 2026",
    readTime: "7 min read",
    image: "assets/img/blog-5.avif",
    excerpt:
      "Upgrade your desk with laptop risers, mechanical keyboards, ergonomic mice, and cable management for all-day comfort.",
    content:
      "Remote and hybrid work require a workstation setup that supports your body. Placing your laptop screen at eye level using an adjustable aluminum riser prevents neck strain. Pairing it with a supportive ergonomic mouse and mechanical keyboard keeps your wrists neutral. Add ambient desk lighting and clean cable management to complete your modern productive sanctuary.",
  },
];

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalPost, setActiveModalPost] = useState(null);

  const categories = ["All", "Gadgets", "Buying Guides", "Smart Tech", "Tips & Tricks"];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <PageTransition>
      <div className="blog_page">
        <div className="container">
          <div className="top_slide">
            <h2>Velora Blog & Insights</h2>
            <p>Stay updated with the latest tech news, expert buying guides, and tips</p>
          </div>

          <div className="blog_filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={selectedCategory === cat ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog_grid">
            {filteredPosts.map((post) => (
              <article className="blog_card" key={post.id}>
                <div className="blog_img_wrapper">
                  <img src={post.image} alt={post.title} />
                  <span className="blog_category_badge">{post.category}</span>
                </div>

                <div className="blog_content">
                  <div className="blog_meta">
                    <span>
                      <FaCalendarAlt /> {post.date}
                    </span>
                    <span>
                      <FaClock /> {post.readTime}
                    </span>
                  </div>

                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>

                  <button
                    className="blog_btn"
                    onClick={() => setActiveModalPost(post)}
                  >
                    Read Article <FaArrowRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Modal preview */}
        {activeModalPost && (
          <div
            className="blog_modal_overlay"
            onClick={() => setActiveModalPost(null)}
          >
            <div
              className="blog_modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="blog_modal_close"
                onClick={() => setActiveModalPost(null)}
              >
                <FaTimes />
              </button>
              <span className="blog_category_badge" style={{ position: "static", display: "inline-block" }}>
                {activeModalPost.category}
              </span>
              <h2>{activeModalPost.title}</h2>
              <div className="blog_meta">
                <span>
                  <FaCalendarAlt /> {activeModalPost.date}
                </span>
                <span>
                  <FaClock /> {activeModalPost.readTime}
                </span>
              </div>
              <img src={activeModalPost.image} alt={activeModalPost.title} />
              <p>{activeModalPost.content}</p>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default Blog;
