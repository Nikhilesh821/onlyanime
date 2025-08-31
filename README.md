
<p align="center">
  <img src="public/logos/logot.svg" alt="OnlyAnime Logo" width="300"/>
</p>

# OnlyAnime

**OnlyAnime** is a modern, full-stack web platform for anime fans to access exclusive content, buy anime-themed merchandise, and join a vibrant weeb community. Built with Next.js, Prisma, TailwindCSS, Stripe, and Kinde Auth, it offers a seamless, feature-rich experience for both users and admins.

---

## 🚀 Features

### 🏠 Home & Auth
- **Dynamic Landing Page**: Hero section, highlights, and testimonials for new users.
- **Authentication**: Secure login/signup via [Kinde Auth](https://kinde.com/).
- **Personalized Home**: Authenticated users see their profile, posts, and exclusive content.

### 📰 Content & Community
- **Posts Feed**: Browse, like, and comment on posts (images/videos) from the community.
- **Exclusive Content**: Access special posts and behind-the-scenes content as a subscriber.
- **Rewards & Badges**: Earn weeb badges, gift hampers, and exclusive rewards.

### 🛒 Merchandise Store
- **Product Catalog**: Browse anime-themed T-shirts and goods with images and details.
- **Product Details**: View, select size, and purchase products securely.
- **Checkout & Orders**: Stripe-powered checkout, order history, and purchase success summary.

### 💳 Pricing & Subscriptions
- **Flexible Plans**: Monthly and annual subscription tiers with discounts.
- **Stripe Integration**: Secure payments, subscription management, and webhooks.
- **Premium Perks**: Priority support, exclusive goodies, and more for premium users.

### 🛠️ Admin Dashboard
- **Secret Dashboard**: Admin-only area to manage content, products, and analytics.
- **Content Management**: Create/edit posts, moderate comments, and manage visibility.
- **Store Management**: Add/edit/archive products, view orders, and manage inventory.
- **Analytics**: Track revenue, sales, and subscriptions in real time.

### 👥 Team & About
- **Meet the Team**: Dedicated section introducing the developers and designers.
- **Testimonials**: Community feedback and user stories.

### 🎨 UI/UX
- **Modern Design**: Responsive, dark/light mode, glassmorphism, and animated backgrounds.
- **Reusable Components**: Built with shadcn/ui, Radix UI, and custom TailwindCSS utilities.

---

## 🗂️ Project Structure

- `src/app/` — Main Next.js app, routing, and API endpoints
- `src/components/` — UI components, layouts, and feature modules
- `src/db/` — Prisma database client
- `src/emails/` — Transactional email templates
- `src/lib/` — Utility functions and Stripe integration
- `prisma/schema.prisma` — Database schema (users, posts, products, orders, etc.)
- `public/` — Static assets (images, logos, gifs)

---

## 🧑‍💻 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in required values (database, Stripe, Kinde, etc.)
3. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Visit** [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Tech Stack
- **Frontend:** Next.js 14, React 18, TailwindCSS, shadcn/ui, Radix UI
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL
- **Auth:** Kinde Auth
- **Payments:** Stripe
- **Email:** Resend, React Email
- **Cloud Media:** Cloudinary

---

## 📦 Main Features Explained

### Authentication & User Profiles
- Secure login/signup with Kinde Auth
- User profiles with avatars, subscription status, and order history

### Content Feed
- Users can create, like, and comment on posts (images/videos)
- Admins can moderate and create public/exclusive posts

### Merchandise Store
- Product listing, details, and secure checkout
- Admins can add/archive products and manage orders

### Subscriptions & Payments
- Multiple pricing tiers (monthly/yearly)
- Stripe integration for payments and webhooks
- Premium users get exclusive content and perks

### Admin Dashboard
- Tabs for Content, Store, and Analytics
- Create/manage posts and products
- View sales, revenue, and subscription analytics

### Team & Community
- Team section with bios and avatars
- Testimonials and user feedback

---

## 🗄️ Database Models (Prisma)
- **User**: Profile, subscription, orders, comments, likes
- **Post**: Media, text, likes, comments, visibility
- **Comment**: Linked to user and post
- **Like**: Linked to user and post
- **Subscription**: Plan, price, start/end dates
- **Product**: Name, image, price, archive status
- **Order**: User, product, price, size, shipping
- **ShippingAddress**: Linked to orders

---

## 📬 Emails
- Welcome and receipt emails sent via Resend/React Email

---

## 📝 Customization & Extending
- Add new products or posts via the admin dashboard
- Update pricing, features, and team info in code
- Extend database schema with Prisma

---

## 🤝 Contributing
Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.