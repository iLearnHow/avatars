#!/usr/bin/env python3
"""
iLearnHow Flask Backend
Universal Lesson Player with User Authentication and Progress Tracking
"""

from flask import Flask, request, jsonify, session, render_template
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import json
import os
from datetime import datetime, timedelta
import uuid

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=30)

CORS(app, supports_credentials=True)

# Database setup
def init_db():
    """Initialize SQLite database with tables"""
    conn = sqlite3.connect('ilearnhow.db')
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
    
    # Lesson progress table
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
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

def get_db():
    """Get database connection"""
    conn = sqlite3.connect('ilearnhow.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    """Serve the main application"""
    return render_template('index.html')

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0',
        'backend': 'Flask'
    })

# User Authentication Endpoints
@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Username and password required'}), 400
    
    username = data['username']
    password = data['password']
    email = data.get('email', '')
    
    conn = get_db()
    cursor = conn.cursor()
    
    # Check if user already exists
    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    if cursor.fetchone():
        conn.close()
        return jsonify({'error': 'Username already exists'}), 409
    
    # Create new user
    import hashlib
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    cursor.execute(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        (username, email, password_hash)
    )
    user_id = cursor.lastrowid
    
    # Initialize user session
    session_id = str(uuid.uuid4())
    cursor.execute(
        'INSERT INTO user_sessions (user_id, session_id) VALUES (?, ?)',
        (user_id, session_id)
    )
    
    # Initialize habit formation
    cursor.execute(
        'INSERT INTO habit_formation (user_id) VALUES (?)',
        (user_id,)
    )
    
    conn.commit()
    conn.close()
    
    # Set session
    session['user_id'] = user_id
    session['username'] = username
    session['session_id'] = session_id
    
    return jsonify({
        'message': 'User registered successfully',
        'user_id': user_id,
        'username': username
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Username and password required'}), 400
    
    username = data['username']
    password = data['password']
    
    conn = get_db()
    cursor = conn.cursor()
    
    # Get user
    cursor.execute('SELECT id, username, password_hash FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    
    if not user:
        conn.close()
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Check password hash
    import hashlib
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    if password_hash != user['password_hash']:
        conn.close()
        return jsonify({'error': 'Invalid credentials'}), 401
        conn.close()
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Update last login
    cursor.execute('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', (user['id'],))
    
    # Get or create session
    session_id = str(uuid.uuid4())
    cursor.execute(
        'INSERT OR REPLACE INTO user_sessions (user_id, session_id) VALUES (?, ?)',
        (user['id'], session_id)
    )
    
    conn.commit()
    conn.close()
    
    # Set session
    session['user_id'] = user['id']
    session['username'] = user['username']
    session['session_id'] = session_id
    
    return jsonify({
        'message': 'Login successful',
        'user_id': user['id'],
        'username': user['username']
    })

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    """Logout user"""
    session.clear()
    return jsonify({'message': 'Logout successful'})

@app.route('/api/auth/status')
def auth_status():
    """Check authentication status"""
    if 'user_id' in session:
        return jsonify({
            'authenticated': True,
            'user_id': session['user_id'],
            'username': session['username']
        })
    return jsonify({'authenticated': False}), 401

# Lesson Progress Endpoints
@app.route('/api/lessons/progress', methods=['GET'])
def get_lesson_progress():
    """Get user's lesson progress"""
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    user_id = session['user_id']
    lesson_day = request.args.get('day', type=int)
    
    conn = get_db()
    cursor = conn.cursor()
    
    if lesson_day:
        # Get specific lesson progress
        cursor.execute('''
            SELECT lesson_day, phase, completed, answers, time_spent, completed_at
            FROM lesson_progress 
            WHERE user_id = ? AND lesson_day = ?
            ORDER BY phase
        ''', (user_id, lesson_day))
    else:
        # Get all lesson progress
        cursor.execute('''
            SELECT lesson_day, phase, completed, answers, time_spent, completed_at
            FROM lesson_progress 
            WHERE user_id = ?
            ORDER BY lesson_day, phase
        ''', (user_id,))
    
    progress = cursor.fetchall()
    conn.close()
    
    return jsonify({
        'progress': [dict(row) for row in progress]
    })

@app.route('/api/lessons/progress', methods=['POST'])
def update_lesson_progress():
    """Update lesson progress"""
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    data = request.get_json()
    user_id = session['user_id']
    
    if not data or 'lesson_day' not in data or 'phase' not in data:
        return jsonify({'error': 'Lesson day and phase required'}), 400
    
    lesson_day = data['lesson_day']
    phase = data['phase']
    completed = data.get('completed', False)
    answers = json.dumps(data.get('answers', []))
    time_spent = data.get('time_spent', 0)
    
    conn = get_db()
    cursor = conn.cursor()
    
    # Update or insert progress
    cursor.execute('''
        INSERT OR REPLACE INTO lesson_progress 
        (user_id, lesson_day, phase, completed, answers, time_spent, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (user_id, lesson_day, phase, completed, answers, time_spent, 
          datetime.now().isoformat() if completed else None))
    
    # Update habit formation if lesson completed
    if completed:
        update_habit_formation(user_id, lesson_day, cursor)
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Progress updated successfully'})

def update_habit_formation(user_id, lesson_day, cursor):
    """Update habit formation metrics"""
    # Get current habit data
    cursor.execute('SELECT * FROM habit_formation WHERE user_id = ?', (user_id,))
    habit = cursor.fetchone()
    
    if not habit:
        return
    
    today = datetime.now().date()
    last_activity = datetime.strptime(habit['last_activity_date'], '%Y-%m-%d').date() if habit['last_activity_date'] else None
    
    # Update streak
    if last_activity is None or (today - last_activity).days == 1:
        # Continue streak
        new_streak = habit['streak_days'] + 1
        streak_start = habit['current_streak_start'] or today.isoformat()
    elif (today - last_activity).days == 0:
        # Same day, no change
        new_streak = habit['streak_days']
        streak_start = habit['current_streak_start']
    else:
        # Break in streak
        new_streak = 1
        streak_start = today.isoformat()
    
    # Update longest streak
    longest_streak = max(habit['longest_streak'], new_streak)
    
    cursor.execute('''
        UPDATE habit_formation 
        SET streak_days = ?, longest_streak = ?, current_streak_start = ?, 
            last_activity_date = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
    ''', (new_streak, longest_streak, streak_start, today.isoformat(), user_id))

# Habit Formation Endpoints
@app.route('/api/habits/status')
def get_habit_status():
    """Get user's habit formation status"""
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    user_id = session['user_id']
    
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM habit_formation WHERE user_id = ?', (user_id,))
    habit = cursor.fetchone()
    
    if not habit:
        conn.close()
        return jsonify({'error': 'Habit data not found'}), 404
    
    conn.close()
    
    return jsonify({
        'streak_days': habit['streak_days'],
        'longest_streak': habit['longest_streak'],
        'current_streak_start': habit['current_streak_start'],
        'last_activity_date': habit['last_activity_date'],
        'daily_goal_met': bool(habit['daily_goal_met']),
        'weekly_goal_met': bool(habit['weekly_goal_met']),
        'monthly_goal_met': bool(habit['monthly_goal_met'])
    })

# User Preferences Endpoints
@app.route('/api/user/preferences', methods=['GET'])
def get_user_preferences():
    """Get user preferences"""
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    user_id = session['user_id']
    
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('SELECT preferences FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    
    conn.close()
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    preferences = json.loads(user['preferences']) if user['preferences'] else {}
    
    return jsonify(preferences)

@app.route('/api/user/preferences', methods=['PUT'])
def update_user_preferences():
    """Update user preferences"""
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    data = request.get_json()
    user_id = session['user_id']
    
    if not data:
        return jsonify({'error': 'Preferences data required'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('UPDATE users SET preferences = ? WHERE id = ?', 
                  (json.dumps(data), user_id))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Preferences updated successfully'})

# Lesson Data Endpoints (for 5-phase system)
@app.route('/api/lessons/<int:day>')
def get_lesson_data(day):
    """Get lesson data for specific day"""
    if day < 1 or day > 366:
        return jsonify({'error': 'Invalid lesson day'}), 400
    
    # This would integrate with your existing curriculum system
    # For now, return basic structure for 5-phase system
    lesson_data = {
        'day': day,
        'phases': {
            1: {'type': 'welcome', 'content': 'Welcome to today\'s lesson'},
            2: {'type': 'question_1', 'content': 'First question content', 'choices': ['A', 'B']},
            3: {'type': 'question_2', 'content': 'Second question content', 'choices': ['A', 'B']},
            4: {'type': 'question_3', 'content': 'Third question content', 'choices': ['A', 'B']},
            5: {'type': 'daily_fortune', 'content': 'Your daily fortune'}
        },
        'variants': {
            'age_groups': ['age_2', 'age_5', 'age_8', 'age_12', 'age_16', 'age_25', 'age_40', 'age_60', 'age_80', 'age_102'],
            'tones': ['grandmother', 'fun', 'neutral'],
            'languages': ['english', 'spanish', 'french', 'german', 'chinese', 'japanese']
        }
    }
    
    return jsonify(lesson_data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001) 