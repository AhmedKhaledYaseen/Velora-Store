<div align="center">

# 🛍️ Velora Store

**A modern e-commerce web application for tech & lifestyle products**

Built with React 19 · Vite · Clerk Authentication · DummyJSON API

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-velora--store-0090f0?style=for-the-badge)](https://velora-store-tawny-nine.vercel.app/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6c47ff?style=flat-square&logo=clerk&logoColor=white)](https://clerk.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛒 **Shopping Cart** | Add, remove, and adjust quantities with real-time totals — persisted to localStorage |
| ❤️ **Wishlist** | Save favorite products and manage them from a dedicated page |
| 🔍 **Live Search** | Debounced autocomplete with product thumbnails and instant results |
| 🏷️ **Category Browsing** | Dynamic category dropdown fetched from API with dedicated listing pages |
| 📦 **Product Details** | Image gallery, ratings, stock status, related products carousel |
| 🔐 **Authentication** | Sign in / Sign up powered by Clerk with user profile management |
| 🎠 **Carousels** | Hero banner and product sliders with autoplay via Swiper |
| ✨ **Page Transitions** | Smooth fade & slide animations between routes using Framer Motion |
| 📝 **Blog** | Articles with category filtering and modal reader |
| 📱 **Responsive** | Clean, responsive design across devices |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 6](https://vite.dev/) |
| **Routing** | [React Router 7](https://reactrouter.com/) |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Carousels** | [Swiper](https://swiperjs.com/) |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) |
| **API** | [DummyJSON](https://dummyjson.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
src/
├── App.jsx                        # Routes & layout
├── App.css                        # Global styles & CSS variables
├── main.jsx                       # Entry point & providers
│
├── components/
│   ├── header/
│   │   ├── TopHeader.jsx          # Logo, search, user/cart/favorites icons
│   │   ├── BtmHeader.jsx          # Nav bar, category dropdown, auth
│   │   └── SearchBox.jsx          # Autocomplete search input
│   ├── cartContext/               # Cart state (Context API + localStorage)
│   ├── favoritesContext/          # Wishlist state (Context API + localStorage)
│   ├── slideProducts/             # Product card & carousel components
│   ├── HeroSlider.jsx             # Hero banner carousel
│   ├── PageTransition.jsx         # Route transition wrapper
│   └── ScrollToTop.jsx            # Scroll reset on navigation
│
├── pages/
│   ├── home/                      # Homepage — hero + 6 category carousels
│   ├── productDetails/            # Product page — gallery, info, related
│   ├── category/                  # Dynamic category listing
│   ├── cart/                      # Cart — quantities, totals, checkout
│   ├── favorites/                 # Wishlist page
│   ├── accessories/               # Accessories with tab filters
│   ├── about/                     # Company info & stats
│   ├── blog/                      # Articles with category filters
│   ├── contact/                   # Contact form & info
│   ├── auth/                      # Clerk sign-in / sign-up pages
│   └── SearchResults.jsx          # Search results page
│
└── public/assets/img/             # Logo, hero banners, blog images
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ 
- A [Clerk](https://clerk.com/) account (for authentication)

### Installation

```bash
# Clone the repository
git clone https://github.com/AhmedKhaledYaseen/Velora-Store.git
cd Velora-Store

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

> Get your publishable key from the [Clerk Dashboard](https://dashboard.clerk.com/).

### Development

```bash
npm run dev        # Start dev server at http://localhost:5173
```

### Build & Preview

```bash
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

## 🌐 API

All product data is fetched at runtime from the [DummyJSON API](https://dummyjson.com/):

| Endpoint | Usage |
|---|---|
| `GET /products/categories` | Category dropdown navigation |
| `GET /products/category/{slug}` | Products by category |
| `GET /products/{id}` | Single product details |
| `GET /products/search?q={query}` | Search autocomplete & results |

---

## 🗺️ Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/accessories` | Accessories |
| `/blog` | Blog |
| `/contact` | Contact |
| `/cart` | Shopping Cart |
| `/favorites` | Wishlist |
| `/search?query=` | Search Results |
| `/product/:id` | Product Details |
| `/category/:category` | Category Products |
| `/sign-in` | Sign In |
| `/sign-up` | Sign Up |

---

## 📄 License

This project is open source and available for personal and educational use.

---

<div align="center">

**Built with ❤️ by [Ahmed Khaled](https://github.com/AhmedKhaledYaseen)**

</div>
