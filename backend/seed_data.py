"""
Seed data for initial database setup.
Run this after creating migrations.
"""

from sqlalchemy.orm import Session
from database import SessionLocal, init_db
from db_models import User, Department, Employee, Leave, Expense
from passlib.context import CryptContext
from datetime import datetime

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)


def seed_departments(db: Session):
    """Seed departments."""
    departments_data = [
        {"name": "Yazılım", "description": "Yazılım geliştirme ekibi"},
        {"name": "Tasarım", "description": "UI/UX tasarım ekibi"},
        {"name": "Ürün", "description": "Ürün yönetimi"},
        {"name": "İnsan Kaynakları", "description": "İK departmanı"},
        {"name": "Pazarlama", "description": "Pazarlama ve satış"},
        {"name": "Satış", "description": "Satış ekibi"},
    ]
    
    for dept_data in departments_data:
        existing = db.query(Department).filter(Department.name == dept_data["name"]).first()
        if not existing:
            dept = Department(**dept_data)
            db.add(dept)
    
    db.commit()
    print("OK - Departments seeded")


def seed_users_and_employees(db: Session):
    """Seed users and employees."""
    
    # Get departments
    departments = {dept.name: dept.id for dept in db.query(Department).all()}
    
    users_data = [
        {
            "email": "admin@fasthr.com",
            "username": "admin",
            "full_name": "Admin User",
            "password": "admin123",  # Change in production!
            "role": "admin"
        },
        {
            "email": "ahmet.yilmaz@fasthr.com",
            "username": "ahmet.yilmaz",
            "full_name": "Ahmet Yılmaz",
            "password": "user123",
            "role": "employee"
        },
        {
            "email": "ayse.demir@fasthr.com",
            "username": "ayse.demir",
            "full_name": "Ayşe Demir",
            "password": "user123",
            "role": "employee"
        },
        {
            "email": "mehmet.kaya@fasthr.com",
            "username": "mehmet.kaya",
            "full_name": "Mehmet Kaya",
            "password": "user123",
            "role": "employee"
        },
        {
            "email": "zeynep.arslan@fasthr.com",
            "username": "zeynep.arslan",
            "full_name": "Zeynep Arslan",
            "password": "user123",
            "role": "manager"
        },
        {
            "email": "can.ozkan@fasthr.com",
            "username": "can.ozkan",
            "full_name": "Can Özkan",
            "password": "user123",
            "role": "employee"
        },
        {
            "email": "elif.sahin@fasthr.com",
            "username": "elif.sahin",
            "full_name": "Elif Şahin",
            "password": "user123",
            "role": "employee"
        },
        {
            "email": "burak.yildiz@fasthr.com",
            "username": "burak.yildiz",
            "full_name": "Burak Yıldız",
            "password": "user123",
            "role": "employee"
        },
        {
            "email": "selin.aydin@fasthr.com",
            "username": "selin.aydin",
            "full_name": "Selin Aydın",
            "password": "user123",
            "role": "employee"
        },
    ]
    
    employees_data = [
        {
            "full_name": "Ahmet Yılmaz",
            "title": "Frontend Developer",
            "email": "ahmet.yilmaz@fasthr.com",
            "phone": "+90 532 123 4567",
            "avatar_url": "AY",
            "department": "Yazılım",
            "start_date": "2023-01-15",
            "is_on_leave": False
        },
        {
            "full_name": "Ayşe Demir",
            "title": "UX Designer",
            "email": "ayse.demir@fasthr.com",
            "phone": "+90 533 234 5678",
            "avatar_url": "AD",
            "department": "Tasarım",
            "start_date": "2022-11-20",
            "is_on_leave": False
        },
        {
            "full_name": "Mehmet Kaya",
            "title": "Backend Developer",
            "email": "mehmet.kaya@fasthr.com",
            "phone": "+90 534 345 6789",
            "avatar_url": "MK",
            "department": "Yazılım",
            "start_date": "2023-03-10",
            "is_on_leave": True
        },
        {
            "full_name": "Zeynep Arslan",
            "title": "Product Manager",
            "email": "zeynep.arslan@fasthr.com",
            "phone": "+90 535 456 7890",
            "avatar_url": "ZA",
            "department": "Ürün",
            "start_date": "2022-08-05",
            "is_on_leave": False
        },
        {
            "full_name": "Can Özkan",
            "title": "DevOps Engineer",
            "email": "can.ozkan@fasthr.com",
            "phone": "+90 536 567 8901",
            "avatar_url": "CÖ",
            "department": "Yazılım",
            "start_date": "2023-05-12",
            "is_on_leave": False
        },
        {
            "full_name": "Elif Şahin",
            "title": "HR Specialist",
            "email": "elif.sahin@fasthr.com",
            "phone": "+90 537 678 9012",
            "avatar_url": "EŞ",
            "department": "İnsan Kaynakları",
            "start_date": "2022-06-18",
            "is_on_leave": False
        },
        {
            "full_name": "Burak Yıldız",
            "title": "Marketing Manager",
            "email": "burak.yildiz@fasthr.com",
            "phone": "+90 538 789 0123",
            "avatar_url": "BY",
            "department": "Pazarlama",
            "start_date": "2023-02-28",
            "is_on_leave": False
        },
        {
            "full_name": "Selin Aydın",
            "title": "Sales Representative",
            "email": "selin.aydin@fasthr.com",
            "phone": "+90 539 890 1234",
            "avatar_url": "SA",
            "department": "Satış",
            "start_date": "2022-09-14",
            "is_on_leave": True
        },
    ]
    
    # Create users and employees
    for user_data, emp_data in zip(users_data[1:], employees_data):  # Skip admin
        # Check if user exists
        existing_user = db.query(User).filter(User.email == user_data["email"]).first()
        if existing_user:
            continue
            
        # Create user
        user = User(
            email=user_data["email"],
            username=user_data["username"],
            full_name=user_data["full_name"],
            hashed_password=hash_password(user_data["password"]),
            role=user_data["role"]
        )
        db.add(user)
        db.flush()  # Get user.id
        
        # Create employee
        employee = Employee(
            user_id=user.id,
            department_id=departments.get(emp_data["department"]),
            full_name=emp_data["full_name"],
            title=emp_data["title"],
            email=emp_data["email"],
            phone=emp_data["phone"],
            avatar_url=emp_data["avatar_url"],
            start_date=emp_data["start_date"],
            is_on_leave=emp_data["is_on_leave"],
            annual_leave_total=14,
            annual_leave_used=8 if emp_data["full_name"] == "Ahmet Yılmaz" else 5,
            sick_leave_total=10,
            sick_leave_used=2 if emp_data["full_name"] == "Ayşe Demir" else 0
        )
        db.add(employee)
    
    # Create admin user separately
    admin_user = db.query(User).filter(User.email == "admin@fasthr.com").first()
    if not admin_user:
        admin = User(
            email="admin@fasthr.com",
            username="admin",
            full_name="Admin User",
            hashed_password=hash_password("admin123"),
            role="admin"
        )
        db.add(admin)
    
    db.commit()
    print("OK - Users and employees seeded")


def seed_leaves(db: Session):
    """Seed leave requests."""
    employees = db.query(Employee).all()
    
    leaves_data = [
        {
            "employee_id": 1,
            "leave_type": "Yıllık İzin",
            "start_date": "2025-12-20",
            "end_date": "2025-12-27",
            "days": 5,
            "reason": "Yılbaşı tatili",
            "status": "Bekliyor"
        },
        {
            "employee_id": 2,
            "leave_type": "Hastalık İzni",
            "start_date": "2025-11-15",
            "end_date": "2025-11-17",
            "days": 2,
            "reason": "Grip",
            "status": "Onaylandı"
        },
        {
            "employee_id": 3,
            "leave_type": "Mazeret İzni",
            "start_date": "2025-11-10",
            "end_date": "2025-11-10",
            "days": 1,
            "reason": "Özel işler",
            "status": "Reddedildi"
        },
        {
            "employee_id": 4,
            "leave_type": "Yıllık İzin",
            "start_date": "2025-11-25",
            "end_date": "2025-11-29",
            "days": 5,
            "reason": "Aile ziyareti",
            "status": "Onaylandı"
        },
    ]
    
    for leave_data in leaves_data:
        existing = db.query(Leave).filter(
            Leave.employee_id == leave_data["employee_id"],
            Leave.start_date == leave_data["start_date"]
        ).first()
        if not existing:
            leave = Leave(**leave_data)
            db.add(leave)
    
    db.commit()
    print("OK - Leaves seeded")


def seed_expenses(db: Session):
    """Seed expense requests."""
    expenses_data = [
        {
            "employee_id": 1,
            "expense_type": "Yol",
            "amount": 450.00,
            "date": "2025-11-20",
            "description": "İstanbul - Ankara müşteri ziyareti",
            "status": "Bekliyor"
        },
        {
            "employee_id": 2,
            "expense_type": "Yemek",
            "amount": 280.50,
            "date": "2025-11-18",
            "description": "Müşteri yemeği",
            "status": "Onaylandı"
        },
        {
            "employee_id": 3,
            "expense_type": "Konaklama",
            "amount": 1250.00,
            "date": "2025-11-15",
            "description": "Ankara otel 2 gece",
            "status": "Onaylandı"
        },
        {
            "employee_id": 4,
            "expense_type": "Diğer",
            "amount": 150.00,
            "date": "2025-11-10",
            "description": "Ofis malzemeleri",
            "status": "Reddedildi"
        },
        {
            "employee_id": 5,
            "expense_type": "Yol",
            "amount": 85.00,
            "date": "2025-11-22",
            "description": "Taksi",
            "status": "Bekliyor"
        },
    ]
    
    for expense_data in expenses_data:
        existing = db.query(Expense).filter(
            Expense.employee_id == expense_data["employee_id"],
            Expense.date == expense_data["date"],
            Expense.amount == expense_data["amount"]
        ).first()
        if not existing:
            expense = Expense(**expense_data)
            db.add(expense)
    
    db.commit()
    print("OK - Expenses seeded")


def main():
    """Main seed function."""
    print("Starting database seeding...")
    
    # Initialize database
    init_db()
    
    # Get database session
    db = SessionLocal()
    
    try:
        seed_departments(db)
        seed_users_and_employees(db)
        seed_leaves(db)
        seed_expenses(db)
        
        print("\nDatabase seeding completed successfully!")
        print("\nTest Credentials:")
        print("  Admin: admin@fasthr.com / admin123")
        print("  User: ahmet.yilmaz@fasthr.com / user123")
        
    except Exception as e:
        print(f"\nError seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()

