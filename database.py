"""
iLearnHow Database Setup and Migration Utilities
Handles database initialization, migrations, and data seeding
"""

import sqlite3
import os
from datetime import datetime
import json

def init_database(db_path='ilearnhow.db'):
    """Initialize SQLite database with all required tables"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP,
            preferences TEXT DEFAULT '{}'
        )
    ''')
    
    # Lesson progress table (for 5-phase system)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS lesson_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            lesson_day INTEGER NOT NULL,
            phase INTEGER NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            answers TEXT DEFAULT '[]',
            time_spent INTEGER DEFAULT 0,
            completed_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            UNIQUE(user_id, lesson_day, phase)
        )
    ''')
    
    # User sessions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            session_id TEXT UNIQUE NOT NULL,
            streak_days INTEGER DEFAULT 0,
            last_lesson_day INTEGER,
            total_lessons_completed INTEGER DEFAULT 0,
            total_time_spent INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Habit formation table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS habit_formation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            streak_days INTEGER DEFAULT 0,
            longest_streak INTEGER DEFAULT 0,
            current_streak_start DATE,
            last_activity_date DATE,
            daily_goal_met BOOLEAN DEFAULT FALSE,
            weekly_goal_met BOOLEAN DEFAULT FALSE,
            monthly_goal_met BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Lesson variants table (for 3,285 variants per lesson)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS lesson_variants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lesson_day INTEGER NOT NULL,
            age_group TEXT NOT NULL,
            tone TEXT NOT NULL,
            language TEXT NOT NULL,
            avatar TEXT NOT NULL,
            phase INTEGER NOT NULL,
            content TEXT NOT NULL,
            choices TEXT DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(lesson_day, age_group, tone, language, avatar, phase)
        )
    ''')
    
    # User preferences table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_preferences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            age_group TEXT DEFAULT 'age_25',
            tone TEXT DEFAULT 'neutral',
            language TEXT DEFAULT 'english',
            avatar TEXT DEFAULT 'kelly',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    conn.commit()
    conn.close()
    print(f"✅ Database initialized: {db_path}")

def create_migration_table(db_path='ilearnhow.db'):
    """Create migrations table to track database schema changes"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            migration_name TEXT UNIQUE NOT NULL,
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def run_migration(migration_name, sql_commands, db_path='ilearnhow.db'):
    """Run a database migration"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if migration already applied
    cursor.execute('SELECT id FROM migrations WHERE migration_name = ?', (migration_name,))
    if cursor.fetchone():
        print(f"⏭️  Migration already applied: {migration_name}")
        conn.close()
        return
    
    # Run migration
    for command in sql_commands:
        cursor.execute(command)
    
    # Record migration
    cursor.execute('INSERT INTO migrations (migration_name) VALUES (?)', (migration_name,))
    
    conn.commit()
    conn.close()
    print(f"✅ Migration applied: {migration_name}")

def seed_test_data(db_path='ilearnhow.db'):
    """Seed database with test data"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create test user
    import hashlib
    
    def simple_hash(password):
        return hashlib.sha256(password.encode()).hexdigest()
    
    test_user_data = [
        ('testuser', simple_hash('password123'), 'test@ilearnhow.com'),
        ('demo', simple_hash('demo123'), 'demo@ilearnhow.com')
    ]
    
    for username, password_hash, email in test_user_data:
        cursor.execute('''
            INSERT OR IGNORE INTO users (username, password_hash, email)
            VALUES (?, ?, ?)
        ''', (username, password_hash, email))
    
    # Create test lesson progress
    test_progress = [
        (1, 1, 1, True, '["A"]', 120),  # Day 1, Phase 1, completed
        (1, 1, 2, True, '["B"]', 180),  # Day 1, Phase 2, completed
        (1, 1, 3, False, '[]', 60),     # Day 1, Phase 3, in progress
        (2, 1, 1, True, '["A"]', 150),  # Day 2, Phase 1, completed
    ]
    
    for lesson_day, user_id, phase, completed, answers, time_spent in test_progress:
        cursor.execute('''
            INSERT OR IGNORE INTO lesson_progress 
            (user_id, lesson_day, phase, completed, answers, time_spent)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (user_id, lesson_day, phase, completed, answers, time_spent))
    
    # Create test habit formation
    test_habits = [
        (1, 5, 10, '2025-01-01', '2025-01-05'),  # 5-day streak, longest 10
        (2, 2, 7, '2025-01-03', '2025-01-04'),   # 2-day streak, longest 7
    ]
    
    for user_id, streak_days, longest_streak, streak_start, last_activity in test_habits:
        cursor.execute('''
            INSERT OR IGNORE INTO habit_formation 
            (user_id, streak_days, longest_streak, current_streak_start, last_activity_date)
            VALUES (?, ?, ?, ?, ?)
        ''', (user_id, streak_days, longest_streak, streak_start, last_activity))
    
    # Create test user preferences
    test_preferences = [
        (1, 'age_25', 'neutral', 'english', 'kelly'),
        (2, 'age_16', 'fun', 'english', 'ken'),
    ]
    
    for user_id, age_group, tone, language, avatar in test_preferences:
        cursor.execute('''
            INSERT OR IGNORE INTO user_preferences 
            (user_id, age_group, tone, language, avatar)
            VALUES (?, ?, ?, ?, ?)
        ''', (user_id, age_group, tone, language, avatar))
    
    conn.commit()
    conn.close()
    print("✅ Test data seeded")

def backup_database(db_path='ilearnhow.db'):
    """Create a backup of the database"""
    import shutil
    from datetime import datetime
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = f'ilearnhow_backup_{timestamp}.db'
    
    shutil.copy2(db_path, backup_path)
    print(f"✅ Database backed up: {backup_path}")
    return backup_path

def reset_database(db_path='ilearnhow.db'):
    """Reset database (delete and recreate)"""
    if os.path.exists(db_path):
        os.remove(db_path)
        print(f"🗑️  Deleted existing database: {db_path}")
    
    init_database(db_path)
    create_migration_table(db_path)
    print("✅ Database reset complete")

def get_database_stats(db_path='ilearnhow.db'):
    """Get database statistics"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    stats = {}
    
    # Count users
    cursor.execute('SELECT COUNT(*) FROM users')
    stats['users'] = cursor.fetchone()[0]
    
    # Count lesson progress entries
    cursor.execute('SELECT COUNT(*) FROM lesson_progress')
    stats['progress_entries'] = cursor.fetchone()[0]
    
    # Count habit formation entries
    cursor.execute('SELECT COUNT(*) FROM habit_formation')
    stats['habit_entries'] = cursor.fetchone()[0]
    
    # Count lesson variants
    cursor.execute('SELECT COUNT(*) FROM lesson_variants')
    stats['variants'] = cursor.fetchone()[0]
    
    # Get average streak
    cursor.execute('SELECT AVG(streak_days) FROM habit_formation')
    avg_streak = cursor.fetchone()[0]
    stats['average_streak'] = round(avg_streak, 1) if avg_streak else 0
    
    conn.close()
    return stats

if __name__ == '__main__':
    """Run database setup"""
    print("🔧 Setting up iLearnHow database...")
    
    # Initialize database
    init_database()
    create_migration_table()
    
    # Seed test data (optional)
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == '--seed':
        seed_test_data()
    
    # Show stats
    stats = get_database_stats()
    print("\n📊 Database Statistics:")
    for key, value in stats.items():
        print(f"  {key}: {value}")
    
    print("\n✅ Database setup complete!") 