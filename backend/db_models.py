"""
SQLAlchemy Database Models
"""

from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    """
    User model for authentication.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=False)
    username = Column(String(50), unique=True, index=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="employee")  # admin, manager, employee
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    employee = relationship("Employee", back_populates="user", uselist=False)


class Department(Base):
    """
    Department model.
    """
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    employees = relationship("Employee", back_populates="department")


class Employee(Base):
    """
    Employee model.
    """
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    
    full_name = Column(String(100), nullable=False)
    title = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(20), nullable=True)
    
    # Avatar (baş harfleri veya URL)
    avatar_url = Column(String(255), nullable=True)
    
    # İş bilgileri
    start_date = Column(String(10), nullable=False)  # YYYY-MM-DD
    is_on_leave = Column(Boolean, default=False)
    
    # Adres ve diğer bilgiler
    address = Column(Text, nullable=True)
    birth_date = Column(String(10), nullable=True)  # YYYY-MM-DD
    emergency_contact = Column(String(200), nullable=True)
    
    # İzin hakları
    annual_leave_total = Column(Integer, default=14)
    annual_leave_used = Column(Integer, default=0)
    sick_leave_total = Column(Integer, default=10)
    sick_leave_used = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="employee")
    department = relationship("Department", back_populates="employees")
    leaves = relationship("Leave", back_populates="employee")
    expenses = relationship("Expense", back_populates="employee")


class Leave(Base):
    """
    Leave request model.
    """
    __tablename__ = "leaves"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    
    leave_type = Column(String(50), nullable=False)  # Yıllık İzin, Hastalık İzni, etc.
    start_date = Column(String(10), nullable=False)  # YYYY-MM-DD
    end_date = Column(String(10), nullable=False)  # YYYY-MM-DD
    days = Column(Integer, nullable=False)
    reason = Column(Text, nullable=False)
    
    status = Column(String(20), default="Bekliyor")  # Bekliyor, Onaylandı, Reddedildi
    
    # Onay bilgileri
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    approved_at = Column(DateTime, nullable=True)
    rejection_reason = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    employee = relationship("Employee", back_populates="leaves")


class Expense(Base):
    """
    Expense request model.
    """
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    
    expense_type = Column(String(50), nullable=False)  # Yol, Yemek, Konaklama, Diğer
    amount = Column(Float, nullable=False)
    date = Column(String(10), nullable=False)  # YYYY-MM-DD
    description = Column(Text, nullable=False)
    
    # Fiş/Fatura
    receipt_url = Column(String(500), nullable=True)
    
    status = Column(String(20), default="Bekliyor")  # Bekliyor, Onaylandı, Reddedildi
    
    # Onay bilgileri
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    approved_at = Column(DateTime, nullable=True)
    rejection_reason = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    employee = relationship("Employee", back_populates="expenses")

