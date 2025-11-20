# Database Setup Guide

This guide explains how to set up the Supabase database for the Bible app.

## Database Schema Overview

The Bible app uses a comprehensive PostgreSQL database hosted on Supabase with the following structure:

### Core Bible Data Tables
- `bible_books` - All 66 books of the Bible
- `bible_translations` - Multiple Bible translations (NIV, ESV, KJV, etc.)
- `bible_verses` - Complete Bible text for each translation

### User Data Tables
- `user_bookmarks` - User-saved verse bookmarks with optional notes
- `user_highlights` - Verse highlights with color coding
- `user_notes` - Personal annotations linked to verses or chapters
- `user_preferences` - User settings (theme, font size, etc.)

### Reading Plans & Devotionals
- `reading_plans` - Predefined reading plans
- `reading_plan_days` - Daily reading assignments
- `user_reading_progress` - User progress tracking
- `devotionals` - Daily devotional content

## SQL Migration Script

The complete database schema is defined in the migration file that should be applied to your Supabase instance. Here's the SQL to create all tables:

```sql
-- See the detailed schema in the codebase comments
-- The migration includes:
-- 1. All table definitions with proper constraints
-- 2. Indexes for performance optimization
-- 3. Row Level Security (RLS) policies
-- 4. Foreign key relationships
```

## Key Schema Features

### 1. Row Level Security (RLS)

All user data tables implement strict RLS policies:

**User-Specific Data**
```sql
-- Users can only access their own bookmarks
CREATE POLICY "Users can view own bookmarks"
  ON user_bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
```

**Public Content**
```sql
-- Bible content is publicly readable
CREATE POLICY "Bible verses are publicly readable"
  ON bible_verses FOR SELECT
  TO authenticated, anon
  USING (true);
```

### 2. Performance Optimization

**Indexes for Fast Lookups**
```sql
-- Composite index for verse lookups
CREATE INDEX idx_bible_verses_lookup
  ON bible_verses(translation_id, book_id, chapter, verse);

-- Full-text search index
CREATE INDEX idx_bible_verses_search
  ON bible_verses USING gin(to_tsvector('english', text));
```

### 3. Data Integrity

- Foreign key constraints ensure referential integrity
- Unique constraints prevent duplicate data
- Check constraints validate data values
- Default values for sensible defaults

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key
4. Add them to your `.env` file

### 2. Apply Database Migration

Run the migration SQL through the Supabase SQL Editor:

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Create a new query
4. Paste the complete migration SQL
5. Execute the query

### 3. Populate Bible Data

You'll need to populate the Bible content. Options:

**Option A: Use Bible API**
- Fetch data from APIs like Bible Gateway or ESV API
- Import into your database

**Option B: Use Bible JSON Data**
- Download Bible JSON datasets
- Import using Supabase client

**Option C: Manual Entry**
- Add books and translations manually
- Useful for testing with small datasets

### 4. Add Sample Reading Plans

Create sample reading plans:

```sql
INSERT INTO reading_plans (name, description, duration_days, category)
VALUES
  ('Bible in One Year', 'Read through the entire Bible in 365 days', 365, 'Complete Bible'),
  ('New Testament in 90 Days', 'Complete the New Testament in 3 months', 90, 'New Testament');
```

### 5. Configure Authentication

Supabase Auth is pre-configured. To customize:

1. Go to Authentication → Settings
2. Configure email templates
3. Set up social providers (optional)
4. Configure password requirements

## Database Maintenance

### Backup Strategy

Supabase automatically backs up your database. For additional safety:

1. Enable Point-in-Time Recovery (PITR)
2. Regular exports of user data
3. Version control for schema changes

### Performance Monitoring

Monitor database performance:

1. Check slow queries in Supabase Dashboard
2. Review index usage
3. Optimize queries as needed

### Scaling Considerations

As your app grows:

1. **Caching** - Implement caching for frequently accessed verses
2. **Partitioning** - Consider partitioning `bible_verses` by book
3. **Read Replicas** - Use read replicas for heavy read operations

## Security Best Practices

### 1. Row Level Security

Always enable RLS on new tables:

```sql
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
```

### 2. API Keys

- Never expose service role key in client code
- Use anon key for client-side operations
- Rotate keys periodically

### 3. Input Validation

- Validate all user inputs before database operations
- Use Supabase client parameterized queries
- Sanitize text content

## Troubleshooting

### Common Issues

**Issue: Cannot connect to database**
- Check `.env` file has correct credentials
- Verify Supabase project is running
- Check network connectivity

**Issue: RLS blocking queries**
- Verify user is authenticated
- Check RLS policies are correct
- Test with service role key temporarily

**Issue: Slow queries**
- Check indexes are created
- Review query execution plans
- Consider adding composite indexes

## Sample Data

For development and testing, you can use mock data:

```typescript
// Sample verse data
const mockVerses = [
  {
    book_id: 43,
    chapter: 3,
    verse: 16,
    text: 'For God so loved the world...',
    translation_id: 'niv'
  }
];
```

## Next Steps

1. Apply the migration to create all tables
2. Populate Bible content (books, translations, verses)
3. Add sample reading plans and devotionals
4. Test authentication flow
5. Verify RLS policies work correctly

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Bible API Resources](https://scripture.api.bible)

---

For questions or issues, refer to the main README.md file.
