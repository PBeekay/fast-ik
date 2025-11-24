"""
CRUD operations for database models.
"""

from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import db_models
from models import (
    EmployeeCard, EmployeeDetail, 
    LeaveRequest, LeaveCreateRequest,
    ExpenseRequest, ExpenseCreateRequest
)


# ==================== EMPLOYEE CRUD ====================

def get_employees(db: Session, skip: int = 0, limit: int = 100) -> List[db_models.Employee]:
    """Get all employees."""
    return db.query(db_models.Employee).offset(skip).limit(limit).all()


def get_employee(db: Session, employee_id: int) -> Optional[db_models.Employee]:
    """Get employee by ID."""
    return db.query(db_models.Employee).filter(db_models.Employee.id == employee_id).first()


def get_employees_on_leave(db: Session) -> List[db_models.Employee]:
    """Get employees currently on leave."""
    return db.query(db_models.Employee).filter(db_models.Employee.is_on_leave == True).all()


def create_employee(db: Session, employee_data: dict) -> db_models.Employee:
    """Create new employee."""
    db_employee = db_models.Employee(**employee_data)
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def update_employee(db: Session, employee_id: int, employee_data: dict) -> Optional[db_models.Employee]:
    """Update employee."""
    db_employee = get_employee(db, employee_id)
    if db_employee:
        for key, value in employee_data.items():
            setattr(db_employee, key, value)
        db_employee.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_employee)
    return db_employee


# ==================== LEAVE CRUD ====================

def get_leaves(db: Session, status: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[db_models.Leave]:
    """Get leaves with optional status filter."""
    query = db.query(db_models.Leave)
    if status:
        query = query.filter(db_models.Leave.status == status)
    return query.offset(skip).limit(limit).all()


def get_leave(db: Session, leave_id: int) -> Optional[db_models.Leave]:
    """Get leave by ID."""
    return db.query(db_models.Leave).filter(db_models.Leave.id == leave_id).first()


def create_leave(db: Session, leave_data: LeaveCreateRequest, employee_id: int) -> db_models.Leave:
    """Create new leave request."""
    # Calculate days
    from datetime import datetime
    start = datetime.strptime(leave_data.start_date, "%Y-%m-%d")
    end = datetime.strptime(leave_data.end_date, "%Y-%m-%d")
    days = (end - start).days + 1
    
    db_leave = db_models.Leave(
        employee_id=employee_id,
        leave_type=leave_data.leave_type,
        start_date=leave_data.start_date,
        end_date=leave_data.end_date,
        days=days,
        reason=leave_data.reason,
        status="Bekliyor"
    )
    db.add(db_leave)
    db.commit()
    db.refresh(db_leave)
    return db_leave


def approve_leave(db: Session, leave_id: int, approved_by: int) -> Optional[db_models.Leave]:
    """Approve leave request."""
    db_leave = get_leave(db, leave_id)
    if db_leave:
        db_leave.status = "Onaylandı"
        db_leave.approved_by = approved_by
        db_leave.approved_at = datetime.utcnow()
        db_leave.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_leave)
    return db_leave


def reject_leave(db: Session, leave_id: int, approved_by: int, reason: Optional[str] = None) -> Optional[db_models.Leave]:
    """Reject leave request."""
    db_leave = get_leave(db, leave_id)
    if db_leave:
        db_leave.status = "Reddedildi"
        db_leave.approved_by = approved_by
        db_leave.approved_at = datetime.utcnow()
        db_leave.rejection_reason = reason
        db_leave.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_leave)
    return db_leave


def delete_leave(db: Session, leave_id: int) -> bool:
    """Delete leave request."""
    db_leave = get_leave(db, leave_id)
    if db_leave:
        db.delete(db_leave)
        db.commit()
        return True
    return False


# ==================== EXPENSE CRUD ====================

def get_expenses(db: Session, status: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[db_models.Expense]:
    """Get expenses with optional status filter."""
    query = db.query(db_models.Expense)
    if status:
        query = query.filter(db_models.Expense.status == status)
    return query.offset(skip).limit(limit).all()


def get_expense(db: Session, expense_id: int) -> Optional[db_models.Expense]:
    """Get expense by ID."""
    return db.query(db_models.Expense).filter(db_models.Expense.id == expense_id).first()


def create_expense(db: Session, expense_data: ExpenseCreateRequest, employee_id: int) -> db_models.Expense:
    """Create new expense request."""
    db_expense = db_models.Expense(
        employee_id=employee_id,
        expense_type=expense_data.expense_type,
        amount=expense_data.amount,
        date=expense_data.date,
        description=expense_data.description,
        status="Bekliyor"
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


def approve_expense(db: Session, expense_id: int, approved_by: int) -> Optional[db_models.Expense]:
    """Approve expense request."""
    db_expense = get_expense(db, expense_id)
    if db_expense:
        db_expense.status = "Onaylandı"
        db_expense.approved_by = approved_by
        db_expense.approved_at = datetime.utcnow()
        db_expense.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_expense)
    return db_expense


def reject_expense(db: Session, expense_id: int, approved_by: int, reason: Optional[str] = None) -> Optional[db_models.Expense]:
    """Reject expense request."""
    db_expense = get_expense(db, expense_id)
    if db_expense:
        db_expense.status = "Reddedildi"
        db_expense.approved_by = approved_by
        db_expense.approved_at = datetime.utcnow()
        db_expense.rejection_reason = reason
        db_expense.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_expense)
    return db_expense


def delete_expense(db: Session, expense_id: int) -> bool:
    """Delete expense request."""
    db_expense = get_expense(db, expense_id)
    if db_expense:
        db.delete(db_expense)
        db.commit()
        return True
    return False


# ==================== DEPARTMENT CRUD ====================

def get_departments(db: Session) -> List[db_models.Department]:
    """Get all departments."""
    return db.query(db_models.Department).all()


def get_department(db: Session, department_id: int) -> Optional[db_models.Department]:
    """Get department by ID."""
    return db.query(db_models.Department).filter(db_models.Department.id == department_id).first()


def create_department(db: Session, name: str, description: Optional[str] = None) -> db_models.Department:
    """Create new department."""
    db_department = db_models.Department(name=name, description=description)
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department

