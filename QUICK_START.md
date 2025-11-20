# Quick Start Guide

Get the Bible app running in minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Supabase account (for database features)

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment** (already set up)
   - `.env` file contains Supabase credentials
   - Update with your own Supabase project URL and keys if needed

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the app**
   - Press `w` to open in web browser
   - Scan QR code with Expo Go app for mobile
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## Features You Can Try Immediately

### Without Database Setup
1. **Browse Books**: Navigate through all 66 Bible books
2. **Select Chapters**: Choose any chapter using the grid selector
3. **Read Content**: View mock Bible verses (sample text)
4. **Search**: Try the search interface (with mock results)
5. **Customize Theme**: Toggle dark/light mode
6. **Adjust Reading**: Change font size and line spacing
7. **View Settings**: Explore all available settings

### With Database Setup (Optional)
To unlock full functionality:

1. **Set up Supabase** (see DATABASE_SETUP.md)
2. **Apply database migration**
3. **Populate Bible content**
4. **Enable authentication**
5. **Use real data for bookmarks, notes, etc.**

## Quick Feature Tour

### 📖 Read Tab
- Tap book name to select different books
- Tap chapter number to choose chapters
- Swipe to navigate (when implemented)
- Tap verses to interact (bookmark, highlight, note)

### 🔍 Search Tab
- Type keywords to search verses
- Tap results to navigate to verse
- Clear search to start over

### 🔖 Bookmarks Tab
- View saved bookmarks
- Switch to Notes view
- Requires sign-in (authentication setup needed)

### 📅 Plans Tab
- Browse reading plans
- View devotionals
- Track progress (with database)

### ⚙️ Settings Tab
- Toggle dark/light theme
- Adjust font size (4 options)
- Change line spacing (3 options)
- Show/hide verse numbers
- Sign in/out

## Customization

### Change Theme Colors
Edit `constants/theme.ts`:
```typescript
export const Colors = {
  light: {
    primary: '#2563eb',  // Change to your color
    // ... more colors
  }
}
```

### Add Bible Books Data
Books are in `constants/bibleBooks.ts`:
```typescript
export const BIBLE_BOOKS: BibleBook[] = [
  // All 66 books defined
];
```

### Modify Font Sizes
Edit `constants/theme.ts`:
```typescript
export const FontSizes = {
  medium: {
    base: 16,  // Adjust base reading size
    // ... more sizes
  }
}
```

## Common Commands

```bash
# Start development
npm run dev

# Build for web
npm run build:web

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Troubleshooting

### App won't start
- Clear cache: Delete `.expo` folder
- Reinstall: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)

### Import errors
- All imports use relative paths
- Check file exists at specified path
- Restart Metro bundler

### Theme not persisting
- Check AsyncStorage is installed
- Clear app data and restart
- Check browser local storage (web)

### Supabase connection issues
- Verify `.env` file has correct credentials
- Check Supabase project is active
- Test connection in Supabase dashboard

## Project Structure

```
├── app/               # Screens (Expo Router)
│   ├── (tabs)/       # Main navigation tabs
│   └── _layout.tsx   # Root with providers
├── components/       # Reusable components
├── contexts/         # State management
├── constants/        # Theme & data
├── types/           # TypeScript types
└── lib/             # Utilities
```

## Next Steps

1. **Explore the Code**
   - Read `README.md` for detailed documentation
   - Check `IMPLEMENTATION_SUMMARY.md` for architecture
   - Review `DATABASE_SETUP.md` for database info

2. **Customize**
   - Change theme colors
   - Modify font sizes
   - Add your branding

3. **Integrate Bible Content**
   - Set up Supabase
   - Import Bible text
   - Enable all features

4. **Deploy**
   - Build for web
   - Deploy to Expo hosting
   - Publish to app stores

## Support

For detailed information, see:
- `README.md` - Complete documentation
- `DATABASE_SETUP.md` - Database guide
- `IMPLEMENTATION_SUMMARY.md` - Architecture overview

## Tips

- Use `Cmd/Ctrl + D` in app to open developer menu
- Enable Fast Refresh for instant updates
- Check Expo DevTools for logs and debugging
- Test on both light and dark themes
- Try all font sizes and spacing options

Happy coding! 📖✨
