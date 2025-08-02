# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Concept: Gamified Knowledge Marketplace

Insight is a platform where the value of knowledge is determined by the community. Users are motivated by competition and recognition to share their best insights. The "one post per day" rule is critical, as it encourages high-quality, impactful contributions rather than a high volume of content.

### Key Differentiators from Existing Platforms
- **Daily Posting Limit**: Creates anticipation and encourages users to post their best content
- **Competitive Focus**: Daily leaderboards create dynamic and engaging competition
- **Singular Focus on Knowledge**: Dedicated solely to sharing valuable information and ideas

## Product Vision

### Core Features
- **Daily Knowledge Posts**: Users can make one post per day (text, images, links) focusing on valuable insights, unique tips, or groundbreaking ideas
- **Community-Based Scoring**: Simple upvote/downvote mechanism where the community collectively determines post value
- **Dual Daily Leaderboards**: 
  - Top 10 Users: Ranked by total score of their posts for that day
  - Top 10 Posts: Showcases individual posts with highest scores
- **User Profiles**: Highlight expertise, ranking history, top-scoring posts, and overall contribution score

### Gamification Strategy
Gamification is the engine of engagement, enhancing both quantity and quality of knowledge sharing through three categories:

#### Achievement-Related Features
- Scoring system and leaderboards provide clear objectives and feedback
- Points, ranks, and achievements motivate continued participation

#### Social-Related Features
- Comments and discussions add layers of knowledge sharing
- Direct messaging enables private collaboration and connection
- Enhanced sense of belonging and community

#### Immersion-Related Features
- Customizable profiles with avatars and banners
- Specialized topics/channels for specific knowledge areas
- Self-directed exploration of content

### Content Moderation
- Reporting and flagging system for guideline violations
- Combination of automated filters and human moderation
- Clear community guidelines to maintain high-quality platform

## Technical Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color scheme
- **State Management**: React hooks with localStorage for user persistence
- **API**: Next.js API routes for backend communication

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.0 with Java 17
- **Database**: H2 in-memory database
- **Security**: Spring Security with JWT authentication
- **ORM**: JPA/Hibernate for data persistence
- **Build Tool**: Maven

## Development Commands

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Backend Development
```bash
# Navigate to backend directory
cd backend

# Run Spring Boot application
mvn spring-boot:run

# Run tests
mvn test

# Build the project
mvn clean package
```

## Project Structure

### Frontend Structure
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable React components
- `src/types/` - TypeScript type definitions
- `src/lib/` - Utility functions and helpers

### Backend Structure
- `backend/src/main/java/com/insight/backend/` - Java source code
  - `model/` - JPA entity classes (User, Post, Vote, etc.)
  - `controller/` - REST API controllers
  - `service/` - Business logic layer
  - `config/` - Configuration classes
  - `security/` - Security configurations

## Key Components

### Core Models
- **User**: User profile with score, rank, and achievements
- **Post**: Knowledge content with voting and comments
- **Vote**: User votes on posts (up/down)
- **Achievement**: User accomplishments and badges

### API Endpoints
- `/api/posts` - CRUD operations for posts
- `/api/posts/[id]/vote` - Voting on posts
- `/api/auth/login` - User authentication
- `/api/auth/register` - User registration
- `/api/users/leaderboard` - User rankings

### UI Components
- **Feed**: Main content display with voting
- **CreatePostForm**: Daily insight posting
- **Leaderboard**: User ranking display
- **Navigation**: Main navigation header

## Data Flow

1. **User Authentication**: JWT tokens stored in localStorage
2. **Post Creation**: One post per user per day limit
3. **Voting**: Real-time score updates with optimistic UI
4. **Leaderboard**: Dynamic ranking based on user scores

## Development Notes

- The frontend uses mock data in API routes during development
- User authentication state is persisted in localStorage
- Posts are limited to one per user per day to maintain quality (core product constraint)
- The voting system prevents duplicate votes and allows vote changes
- The application uses a custom primary color scheme (primary-500: #3b82f6)
- Daily reset logic should be implemented for post limits and leaderboards

## Testing

- Frontend: React component testing (framework not yet implemented)
- Backend: Spring Boot test framework with JUnit
- Integration: API testing between frontend and backend

## Product Development Priorities

### Phase 1: Core MVP (Current)
- ✅ Basic posting with daily limit
- ✅ Simple voting system
- ✅ Basic user authentication
- ✅ Feed and leaderboard display
- 🔄 Comments and discussions
- 🔄 User profiles with achievements

### Phase 2: Enhanced Gamification
- Achievement system with badges and milestones
- Streaks and daily engagement tracking
- Advanced leaderboard features (weekly, monthly, all-time)
- Notification system for interactions

### Phase 3: Social Features
- Direct messaging between users
- Topic channels and categories
- Content curation and featured posts
- Advanced moderation tools

### Phase 4: Platform Growth
- Mobile app development
- API for third-party integrations
- Advanced analytics and insights
- Monetization features