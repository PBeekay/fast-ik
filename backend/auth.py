from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import os

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# HTTP Bearer
security = HTTPBearer()


# Models
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


class UserInToken(BaseModel):
    email: str
    name: str
    role: str


# Password utilities
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)


# JWT utilities
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> TokenData:
    """Decode JWT access token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token geçersiz",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return TokenData(email=email)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token doğrulanamadı",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> UserInToken:
    """Get current authenticated user from token"""
    token = credentials.credentials
    token_data = decode_access_token(token)
    
    # TODO: Fetch user from database
    # For now, return mock user based on email
    if token_data.email == "admin@fasthr.com":
        return UserInToken(
            email=token_data.email,
            name="Admin User",
            role="admin"
        )
    else:
        name = token_data.email.split('@')[0].replace('.', ' ').title()
        return UserInToken(
            email=token_data.email,
            name=name,
            role="employee"
        )


# Mock user database (replace with real database)
MOCK_USERS = {
    "admin@fasthr.com": {
        "email": "admin@fasthr.com",
        "name": "Admin User",
        "role": "admin",
        "hashed_password": get_password_hash("admin123")
    },
    "ahmet.yilmaz@fasthr.com": {
        "email": "ahmet.yilmaz@fasthr.com",
        "name": "Ahmet Yılmaz",
        "role": "employee",
        "hashed_password": get_password_hash("user123")
    },
    "ayse.kara@fasthr.com": {
        "email": "ayse.kara@fasthr.com",
        "name": "Ayşe Kara",
        "role": "manager",
        "hashed_password": get_password_hash("user123")
    }
}


def authenticate_user(email: str, password: str):
    """Authenticate user with email and password"""
    user = MOCK_USERS.get(email)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user

