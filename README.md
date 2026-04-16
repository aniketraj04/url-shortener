# ShortLink - Modern URL Shortener

A sleek, modern URL shortener built with cutting-edge 2026 design principles. Features glassmorphism UI, real-time analytics, and enterprise-grade security.

## ✨ Features

### 🚀 Core Features
- **Lightning Fast**: Create short links in milliseconds
- **Custom Aliases**: Choose memorable, branded short URLs
- **Real-time Analytics**: Track clicks by location, device, and browser
- **Anonymous Usage**: Create links without registration
- **User Accounts**: Sign up for advanced features and link management

### 🎨 Modern Design (2026)
- **Glassmorphism UI**: Beautiful backdrop blur effects and transparency
- **Dark Theme**: Modern dark aesthetic with gradient accents
- **Smooth Animations**: Fluid transitions and hover effects
- **Responsive Design**: Perfect on all devices
- **Accessibility**: WCAG compliant with proper contrast and navigation

### 🔒 Security & Performance
- **JWT Authentication**: Secure user sessions
- **Bcrypt Passwords**: Industry-standard encryption
- **Rate Limiting**: Protection against abuse
- **SQLite Database**: Fast, reliable data storage
- **Express.js Backend**: Scalable Node.js API

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Beautiful data visualizations
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Database (no external setup required)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **GeoIP** - Location tracking
- **Helmet** - Security headers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aniketraj04/url-shortener.git
   cd url-shortener
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend**
   ```bash
   cd ../backend
   npm start
   ```
   Backend runs on http://localhost:5000

5. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:5173

## 📱 Usage

### Creating Links
1. Visit the homepage
2. Enter your long URL
3. Optionally add a custom alias
4. Click "Shorten URL"
5. Copy your new short link

### User Features
1. **Sign Up**: Create an account for advanced features
2. **Dashboard**: View all your shortened links
3. **Analytics**: Detailed click tracking and insights
4. **Management**: Edit and organize your links

## 🎯 API Endpoints

### Public Endpoints
- `POST /api/links` - Create a short link
- `GET /:code` - Redirect to original URL

### Authenticated Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/links` - Get user's links
- `GET /api/links/:id/analytics` - Link analytics

## 🎨 Design Philosophy

This project embraces 2026 design trends:
- **Glassmorphism**: Subtle transparency and blur effects
- **Micro-interactions**: Smooth animations and feedback
- **Dark Mode First**: Modern dark aesthetic
- **Minimalism**: Clean, focused user experience
- **Performance**: Optimized for speed and accessibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by 2026 design trends
- Thanks to the open-source community

---

**Made with ❤️ for the future of web design**