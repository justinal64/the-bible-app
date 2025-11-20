# Bible App - Comprehensive Mobile Bible Reader

A feature-rich React Native Bible application built with Expo, providing an intuitive Bible reading experience with multiple translations, bookmarks, highlights, notes, reading plans, and devotionals.

## Features

### Core Features
- **Complete Bible Text** - Access to all 66 books of the Bible with multiple translations
- **Chapter & Verse Navigation** - Easy navigation between books, chapters, and verses
- **Search Functionality** - Full-text search across all verses
- **Bookmarks** - Save your favorite verses for quick access
- **Highlights** - Color-coded verse highlighting
- **Notes & Annotations** - Create personal notes linked to verses or chapters
- **Reading Plans** - Follow structured reading plans (e.g., Bible in One Year)
- **Daily Devotionals** - Inspirational daily content with scripture references
- **Offline Reading** - Access Bible content without internet connection

### Design & UX
- **Dark & Light Themes** - Beautiful themes for comfortable reading in any environment
- **Customizable Reading** - Adjustable font sizes (Small, Medium, Large, XLarge)
- **Line Spacing Control** - Compact, Normal, or Relaxed spacing for optimal readability
- **Toggle Verse Numbers** - Show or hide verse numbers based on preference
- **Clean, Minimalist UI** - Focus on content without distractions
- **Smooth Animations** - Polished transitions and interactions

### Technical Features
- **TypeScript** - Full type safety throughout the application
- **Supabase Backend** - Secure cloud storage for user data
- **AsyncStorage** - Local preference caching
- **Row Level Security** - Secure user data with RLS policies
- **Responsive Design** - Optimized for both iOS and Android

## Project Structure

```
├── app/
│   ├── (tabs)/                 # Tab-based navigation
│   │   ├── index.tsx          # Read screen - Bible reader
│   │   ├── search.tsx         # Search functionality
│   │   ├── bookmarks.tsx      # Bookmarks & notes
│   │   ├── plans.tsx          # Reading plans & devotionals
│   │   └── settings.tsx       # App settings
│   └── _layout.tsx            # Root layout with providers
├── components/
│   ├── BibleReader.tsx        # Main Bible reading component
│   ├── BookSelector.tsx       # Book selection interface
│   ├── ChapterSelector.tsx    # Chapter grid selector
│   ├── SearchBar.tsx          # Search input component
│   ├── SearchResults.tsx      # Search results display
│   ├── BookmarksList.tsx      # Bookmarks list view
│   ├── NotesList.tsx          # Notes list view
│   ├── ReadingPlanCard.tsx    # Reading plan card
│   └── DevotionalCard.tsx     # Devotional content card
├── contexts/
│   ├── ThemeContext.tsx       # Theme & preferences management
│   └── AuthContext.tsx        # Authentication state
├── constants/
│   ├── theme.ts               # Design tokens (colors, spacing, typography)
│   └── bibleBooks.ts          # Complete Bible books data
├── types/
│   └── bible.ts               # TypeScript type definitions
├── lib/
│   └── supabase.ts            # Supabase client configuration
└── data/                      # Static data files
```

## Database Schema

### Tables

#### `bible_books`
- All 66 books of the Bible with metadata
- Testament classification, chapter counts, canonical order

#### `bible_translations`
- Multiple Bible translations (NIV, ESV, KJV, etc.)
- Translation metadata and availability

#### `bible_verses`
- Complete Bible text for each translation
- Optimized with indexes for fast lookups
- Full-text search capability

#### `user_bookmarks`
- User-saved verse bookmarks
- Optional notes per bookmark
- Secured with RLS

#### `user_highlights`
- Verse highlights with color coding
- User-specific highlight data

#### `user_notes`
- Personal annotations linked to verses/chapters
- Rich text content support

#### `reading_plans`
- Predefined reading plans with categories
- Duration and completion tracking

#### `reading_plan_days`
- Daily reading assignments for each plan
- Scripture references per day

#### `user_reading_progress`
- User progress tracking on reading plans
- Completion status and dates

#### `devotionals`
- Daily devotional content
- Scripture references and author attribution

#### `user_preferences`
- Theme, font size, line spacing settings
- Default translation selection

## Technology Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Local Storage**: AsyncStorage
- **Icons**: Lucide React Native
- **Styling**: React Native StyleSheet

## Key Architectural Decisions

### 1. Expo Managed Workflow
- No native code modifications required
- Easy deployment and updates
- Cross-platform compatibility guaranteed

### 2. Context API for State Management
- Theme management via ThemeContext
- Authentication state via AuthContext
- Simpler than Redux for this use case
- No prop drilling

### 3. File-based Routing
- Expo Router provides intuitive navigation
- Tab-based structure for main features
- Modal navigation for selectors

### 4. Supabase Backend
- Real-time sync capabilities
- Built-in authentication
- Row Level Security for data protection
- PostgreSQL for complex queries

### 5. Design System
- Centralized theme constants
- Consistent spacing and typography
- Support for light and dark modes
- Responsive font scaling

## Performance Optimizations

### 1. Efficient Data Loading
- Lazy loading of Bible verses
- Pagination for large result sets
- Caching of frequently accessed data

### 2. Search Optimization
- Full-text search indexes in database
- Debounced search input
- Result limiting

### 3. UI Performance
- StyleSheet.create for optimized styles
- Minimal re-renders with proper memoization
- Efficient list rendering with FlatList

### 4. Offline Capability
- AsyncStorage for user preferences
- Supabase local caching
- Graceful offline degradation

## Security Best Practices

### Row Level Security (RLS)
All user data tables implement strict RLS policies:
- Users can only access their own bookmarks, notes, and highlights
- Bible content is publicly readable
- Authentication required for personal data

### Authentication
- Email/password authentication via Supabase
- Secure session management
- Auto-refresh tokens

### Data Validation
- Input validation on all user inputs
- SQL injection prevention via Supabase client
- XSS protection in text rendering

## Future Enhancements

### Planned Features
- Audio Bible integration
- Verse sharing to social media
- Cross-references between verses
- Study tools (commentaries, concordances)
- Group reading plans
- Prayer journal
- Verse of the day notifications
- Multiple language support
- Verse memorization tools

### Technical Improvements
- Offline-first architecture with sync
- Bible text downloads for offline use
- Advanced search with filters
- Export notes and highlights
- Cloud backup and restore
- Analytics for reading habits

## Development Guidelines

### Adding New Features
1. Define types in `types/bible.ts`
2. Create database schema if needed
3. Build reusable components
4. Add to appropriate tab screen
5. Test on both iOS and Android

### Styling Guidelines
- Always use theme colors from context
- Use spacing constants for consistency
- Support both light and dark themes
- Test font scaling at all sizes
- Maintain 8px spacing grid

### Code Quality
- Write TypeScript with strict mode
- Use meaningful variable names
- Add JSDoc comments for complex logic
- Keep components focused and small
- Follow React best practices

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Supabase account (optional - app works with mock data)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

The app will run with mock data. To enable full functionality with real database:
1. Set up a Supabase project
2. Add your credentials to `.env` file
3. Apply the database migration (see DATABASE_SETUP.md)

### Building
```bash
npm run build:web
```

### Type Checking
```bash
npm run typecheck
```

### Running Without Supabase

The app is configured to work without Supabase credentials:
- All UI features work with mock data
- Theme preferences are saved locally with AsyncStorage
- Database features (bookmarks, notes) show empty states
- Authentication is optional

To add real data:
1. Configure Supabase in `.env`
2. Apply database migration
3. Populate Bible content

## License
MIT License - feel free to use this project as a foundation for your own Bible app!
