"""
iLearnHow Data Models
SQLAlchemy models for user authentication, lesson progress, and habit formation
"""

from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import json

Base = declarative_base()

class User(Base):
    """User model for authentication and preferences"""
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)
    preferences = Column(Text, default='{}')
    
    # Relationships
    progress = relationship("LessonProgress", back_populates="user")
    sessions = relationship("UserSession", back_populates="user")
    habit = relationship("HabitFormation", back_populates="user", uselist=False)
    
    def get_preferences(self):
        """Get user preferences as dict"""
        return json.loads(self.preferences) if self.preferences else {}
    
    def set_preferences(self, preferences_dict):
        """Set user preferences from dict"""
        self.preferences = json.dumps(preferences_dict)

class LessonProgress(Base):
    """Lesson progress tracking for 5-phase system"""
    __tablename__ = 'lesson_progress'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    lesson_day = Column(Integer, nullable=False)
    phase = Column(Integer, nullable=False)  # 1-5 for 5-phase system
    completed = Column(Boolean, default=False)
    answers = Column(Text, default='[]')  # JSON array of answers
    time_spent = Column(Integer, default=0)  # seconds
    completed_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="progress")
    
    def get_answers(self):
        """Get answers as list"""
        return json.loads(self.answers) if self.answers else []
    
    def set_answers(self, answers_list):
        """Set answers from list"""
        self.answers = json.dumps(answers_list)

class UserSession(Base):
    """User session tracking"""
    __tablename__ = 'user_sessions'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    session_id = Column(String(255), unique=True, nullable=False)
    streak_days = Column(Integer, default=0)
    last_lesson_day = Column(Integer)
    total_lessons_completed = Column(Integer, default=0)
    total_time_spent = Column(Integer, default=0)  # seconds
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="sessions")

class HabitFormation(Base):
    """Habit formation and streak tracking"""
    __tablename__ = 'habit_formation'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    streak_days = Column(Integer, default=0)
    longest_streak = Column(Integer, default=0)
    current_streak_start = Column(DateTime)
    last_activity_date = Column(DateTime)
    daily_goal_met = Column(Boolean, default=False)
    weekly_goal_met = Column(Boolean, default=False)
    monthly_goal_met = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="habit", uselist=False)

# Database setup functions
def init_database(database_url="sqlite:///ilearnhow.db"):
    """Initialize database with all tables"""
    engine = create_engine(database_url)
    Base.metadata.create_all(engine)
    return engine

def get_session(database_url="sqlite:///ilearnhow.db"):
    """Get database session"""
    engine = create_engine(database_url)
    Session = sessionmaker(bind=engine)
    return Session()

# Model utility functions
def create_user(username, password_hash, email=None):
    """Create a new user"""
    from werkzeug.security import generate_password_hash
    
    session = get_session()
    user = User(
        username=username,
        password_hash=password_hash,
        email=email
    )
    session.add(user)
    session.commit()
    session.close()
    return user

def get_user_by_username(username):
    """Get user by username"""
    session = get_session()
    user = session.query(User).filter_by(username=username).first()
    session.close()
    return user

def get_user_progress(user_id, lesson_day=None):
    """Get user's lesson progress"""
    session = get_session()
    query = session.query(LessonProgress).filter_by(user_id=user_id)
    
    if lesson_day:
        query = query.filter_by(lesson_day=lesson_day)
    
    progress = query.order_by(LessonProgress.lesson_day, LessonProgress.phase).all()
    session.close()
    return progress

def update_lesson_progress(user_id, lesson_day, phase, completed=False, answers=None, time_spent=0):
    """Update lesson progress"""
    session = get_session()
    
    # Find existing progress or create new
    progress = session.query(LessonProgress).filter_by(
        user_id=user_id, 
        lesson_day=lesson_day, 
        phase=phase
    ).first()
    
    if not progress:
        progress = LessonProgress(
            user_id=user_id,
            lesson_day=lesson_day,
            phase=phase
        )
        session.add(progress)
    
    # Update progress
    progress.completed = completed
    if answers:
        progress.set_answers(answers)
    progress.time_spent = time_spent
    
    if completed:
        progress.completed_at = datetime.utcnow()
    
    session.commit()
    session.close()
    return progress

def get_habit_status(user_id):
    """Get user's habit formation status"""
    session = get_session()
    habit = session.query(HabitFormation).filter_by(user_id=user_id).first()
    session.close()
    return habit

def update_habit_formation(user_id, lesson_day):
    """Update habit formation metrics"""
    session = get_session()
    habit = session.query(HabitFormation).filter_by(user_id=user_id).first()
    
    if not habit:
        habit = HabitFormation(user_id=user_id)
        session.add(habit)
    
    today = datetime.utcnow().date()
    
    if habit.last_activity_date:
        last_activity = habit.last_activity_date.date()
        days_diff = (today - last_activity).days
        
        if days_diff == 1:
            # Continue streak
            habit.streak_days += 1
            if not habit.current_streak_start:
                habit.current_streak_start = datetime.utcnow()
        elif days_diff == 0:
            # Same day, no change
            pass
        else:
            # Break in streak
            habit.streak_days = 1
            habit.current_streak_start = datetime.utcnow()
    else:
        # First activity
        habit.streak_days = 1
        habit.current_streak_start = datetime.utcnow()
    
    # Update longest streak
    habit.longest_streak = max(habit.longest_streak, habit.streak_days)
    habit.last_activity_date = datetime.utcnow()
    
    session.commit()
    session.close()
    return habit 