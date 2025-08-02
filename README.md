# Insight - Gamified Knowledge Marketplace

A competitive platform where users share valuable insights daily, with community-driven scoring and dynamic leaderboards.

## 🎯 Core Concept

Insight is a gamified knowledge marketplace where the value of knowledge is determined by the community. Users are motivated by competition and recognition to share their best insights. The "one post per day" rule creates anticipation and encourages high-quality, impactful contributions rather than high-volume content.

## ✨ Key Features

- **Daily Knowledge Posts**: Users can make one post per day focusing on valuable insights, unique tips, or groundbreaking ideas
- **Community-Based Scoring**: Simple upvote/downvote mechanism where the community collectively determines post value
- **Dual Daily Leaderboards**: 
  - Top 10 Users: Ranked by total score of their posts for that day
  - Top 10 Posts: Showcases individual posts with highest scores
- **User Profiles**: Highlight expertise, ranking history, top-scoring posts, and overall contribution score
- **Comments & Discussions**: Engage with insights through threaded discussions
- **Achievement System**: Unlock badges and milestones based on contributions

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color scheme
- **State Management**: React hooks with localStorage for user persistence
- **API**: Next.js API routes for backend communication

### Backend
- **Framework**: Spring Boot 3.2.0 with Java 17
- **Database**: H2 in-memory database (configurable for production)
- **Security**: Spring Security with JWT authentication
- **ORM**: JPA/Hibernate for data persistence
- **Build Tool**: Maven

## 🏗️ Project Structure

```
insight/
├── src/                    # Next.js frontend
│   ├── app/               # App Router pages and API routes
│   ├── components/        # Reusable React components
│   ├── types/            # TypeScript type definitions
│   └── lib/              # Utility functions
├── backend/               # Spring Boot backend
│   ├── src/main/java/com/insight/backend/
│   │   ├── model/        # JPA entity classes
│   │   ├── controller/   # REST API controllers
│   │   ├── service/      # Business logic layer
│   │   ├── config/       # Configuration classes
│   │   └── security/     # Security configurations
│   └── pom.xml           # Maven configuration
├── package.json          # Frontend dependencies
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Java 17+ and Maven

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies and compile
mvn clean install

# Run Spring Boot application
mvn spring-boot:run

# Run tests
mvn test
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- H2 Console: http://localhost:8080/h2-console (JDBC URL: jdbc:h2:mem:insightdb)

## 🔧 Development Commands

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run linting
```

### Backend
```bash
mvn spring-boot:run  # Run Spring Boot application
mvn test            # Run tests
mvn clean package   # Build the project
```

## 🎯 Usage

1. **Register/Login**: Create an account or log in to start sharing insights
2. **Daily Post**: Create one post per day with your best knowledge or insight
3. **Vote**: Upvote or downvote posts based on their value
4. **Compete**: Climb the daily leaderboards with high-quality content
5. **Engage**: Comment on posts to add additional perspectives
6. **Track Progress**: View your profile for achievements and ranking history

## 📈 Product Development Phases

### ✅ Phase 1: Core MVP (Current)
- Basic posting with daily limit
- Simple voting system
- Basic user authentication
- Feed and leaderboard display
- Comments and discussions
- User profiles with achievements

### 🔄 Phase 2: Enhanced Gamification
- Achievement system with badges and milestones
- Streaks and daily engagement tracking
- Advanced leaderboard features (weekly, monthly, all-time)
- Notification system for interactions

### 🔮 Phase 3: Social Features
- Direct messaging between users
- Topic channels and categories
- Content curation and featured posts
- Advanced moderation tools

### 🚀 Phase 4: Platform Growth
- Mobile app development
- API for third-party integrations
- Advanced analytics and insights
- Monetization features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For questions or support, please open an issue on the GitHub repository.
