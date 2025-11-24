"""
Database configuration and session management.
Supports both SQLite (small businesses) and MariaDB/MySQL (production).
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./fasthr.db")
DATABASE_TYPE = os.getenv("DATABASE_TYPE", "sqlite")

# Engine configuration
if DATABASE_TYPE == "sqlite":
    # SQLite configuration
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},  # SQLite specific
        echo=True  # Set to False in production
    )
else:
    # MariaDB/MySQL configuration
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,  # Verify connections before using
        pool_recycle=3600,   # Recycle connections after 1 hour
        echo=True  # Set to False in production
    )

# SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


# Dependency for FastAPI
def get_db():
    """
    Database session dependency for FastAPI.
    Usage: db: Session = Depends(get_db)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create all tables
def init_db():
    """
    Initialize database - create all tables.
    Call this when starting the application.
    """
    Base.metadata.create_all(bind=engine)
    print(f"OK - Database initialized: {DATABASE_TYPE}")
    print(f"Connection: {DATABASE_URL}")

