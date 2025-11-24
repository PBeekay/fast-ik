from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta

# Database imports
from database import get_db, engine, init_db
import db_models
import crud

# Auth imports
from auth import (
    Token, UserLogin, UserInToken,
    authenticate_user, create_access_token,
    get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
)

# Models
from models import (
    EmployeeCard, EmployeeDetail,
    LeaveRequest, LeaveBalance,
    ExpenseRequest, ExpenseCreateRequest, LeaveCreateRequest
)

app = FastAPI(
    title="FastHR API",
    description="Modern İnsan Kaynakları Yönetim Sistemi API",
    version="1.0.0"
)

# Initialize database
db_models.Base.metadata.create_all(bind=engine)
init_db()

# CORS ayarları - Frontend'den gelen istekleri kabul et
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "FastHR API'ye hoş geldiniz! 🚀",
        "version": "1.0.0",
        "docs": "/docs"
    }


# ============================================
# AUTHENTICATION ENDPOINTS
# ============================================

@app.post("/api/auth/login", response_model=Token)
def login(user_login: UserLogin):
    """
    Login endpoint - authenticate user and return JWT token
    """
    user = authenticate_user(user_login.email, user_login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-posta veya şifre hatalı",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"]},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/api/auth/me", response_model=UserInToken)
def get_me(current_user: UserInToken = Depends(get_current_user)):
    """
    Get current authenticated user
    """
    return current_user


# ============================================
# EMPLOYEE ENDPOINTS (Protected)
# ============================================

@app.get("/api/employees", response_model=List[EmployeeCard])
def get_employees(
    current_user: UserInToken = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Tüm çalışanların kart görünümü için basitleştirilmiş bilgilerini döndürür.
    Bu endpoint frontend'teki grid kartlarını doldurmak için kullanılır.
    """
    employees = crud.get_employees(db)
    
    return [
        EmployeeCard(
            id=emp.id,
            full_name=emp.full_name,
            title=emp.title,
            avatar_url=emp.avatar_url or "".join([n[0] for n in emp.full_name.split()[:2]]),
            is_on_leave=emp.is_on_leave,
            department=emp.department.name if emp.department else "N/A"
        )
        for emp in employees
    ]


@app.get("/api/employees/{employee_id}", response_model=EmployeeDetail)
def get_employee_detail(
    employee_id: int,
    current_user: UserInToken = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Belirli bir çalışanın detaylı bilgilerini döndürür.
    Bu endpoint drawer/modal'da gösterilecek detaylar içindir.
    """
    emp = crud.get_employee(db, employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Çalışan bulunamadı")
    
    return EmployeeDetail(
        id=emp.id,
        full_name=emp.full_name,
        title=emp.title,
        avatar_url=emp.avatar_url or "".join([n[0] for n in emp.full_name.split()[:2]]),
        is_on_leave=emp.is_on_leave,
        department=emp.department.name if emp.department else "N/A",
        email=emp.email,
        phone=emp.phone or "N/A",
        start_date=emp.start_date.strftime("%Y-%m-%d") if emp.start_date else "N/A",
        address=emp.address or "N/A",
        birth_date=emp.birth_date.strftime("%Y-%m-%d") if emp.birth_date else "N/A",
        emergency_contact=emp.emergency_contact or "N/A",
        salary=emp.salary or 0.0
    )


@app.get("/api/dashboard/stats")
def get_dashboard_stats(current_user: UserInToken = Depends(get_current_user)):
    """
    Dashboard için özet istatistikleri döndürür.
    """
    return {
        "total_employees": 42,
        "on_leave_today": 3,
        "pending_requests": 5,
        "birthdays_this_month": 2
    }


@app.get("/api/employees/on-leave", response_model=List[EmployeeCard])
def get_employees_on_leave(
    current_user: UserInToken = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Şu anda izinli olan çalışanları döndürür.
    Dashboard'daki "Şu an Kimler Yok?" bölümü için kullanılır.
    """
    employees = crud.get_employees_on_leave(db)
    
    return [
        EmployeeCard(
            id=emp.id,
            full_name=emp.full_name,
            title=emp.title,
            avatar_url=emp.avatar_url or "".join([n[0] for n in emp.full_name.split()[:2]]),
            is_on_leave=emp.is_on_leave,
            department=emp.department.name if emp.department else "N/A"
        )
        for emp in employees
    ]


# ============================================
# LEAVE MANAGEMENT (Protected)
# ============================================

@app.get("/api/leaves", response_model=List[LeaveRequest])
def get_leaves(
    status: Optional[str] = None,
    current_user: UserInToken = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    İzin taleplerini listeler.
    
    Query Params:
    - status: Duruma göre filtreleme (Bekliyor, Onaylandı, Reddedildi)
    """
    db_leaves = crud.get_leave_requests(db, status_filter=status)
    
    return [
        LeaveRequest(
            id=leave.id,
            employee_id=leave.employee_id,
            employee_name=leave.employee.full_name if leave.employee else "N/A",
            leave_type=leave.leave_type,
            start_date=leave.start_date.strftime("%Y-%m-%d"),
            end_date=leave.end_date.strftime("%Y-%m-%d"),
            days=leave.days,
            reason=leave.reason or "",
            status=leave.status,
            created_at=leave.created_at.strftime("%Y-%m-%d")
        )
        for leave in db_leaves
    ]


@app.post("/api/leaves", response_model=LeaveRequest, status_code=201)
def create_leave(
    leave_data: LeaveCreateRequest,
    current_user: UserInToken = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Yeni izin talebi oluşturur.
    """
    # Tarih validasyonu
    try:
        start = datetime.strptime(leave_data.start_date, "%Y-%m-%d").date()
        end = datetime.strptime(leave_data.end_date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Geçersiz tarih formatı. YYYY-MM-DD formatında olmalı.")
    
    if start > end:
        raise HTTPException(status_code=400, detail="Bitiş tarihi başlangıç tarihinden önce olamaz.")
    
    # Gün sayısını hesapla
    days = (end - start).days + 1
    
    # Create in database (assuming employee_id = 1 for now)
    db_leave = crud.create_leave_request(
        db,
        employee_id=1,  # TODO: Get from current_user
        leave_data={
            "leave_type": leave_data.leave_type,
            "start_date": start,
            "end_date": end,
            "days": days,
            "reason": leave_data.reason,
            "status": "Bekliyor"
        }
    )
    
    return LeaveRequest(
        id=db_leave.id,
        employee_id=db_leave.employee_id,
        employee_name=db_leave.employee.full_name if db_leave.employee else current_user.name,
        leave_type=db_leave.leave_type,
        start_date=db_leave.start_date.strftime("%Y-%m-%d"),
        end_date=db_leave.end_date.strftime("%Y-%m-%d"),
        days=db_leave.days,
        reason=db_leave.reason or "",
        status=db_leave.status,
        created_at=db_leave.created_at.strftime("%Y-%m-%d")
    )


@app.get("/api/leaves/{leave_id}", response_model=LeaveRequest)
def get_leave_detail(
    leave_id: int,
    current_user: UserInToken = Depends(get_current_user)
):
    """
    Belirli bir izin talebinin detaylarını döndürür.
    """
    # Mock veri
    if leave_id == 1:
        return LeaveRequest(
            id=1,
            employee_id=1,
            employee_name="Ahmet Yılmaz",
            leave_type="Yıllık İzin",
            start_date="2025-12-20",
            end_date="2025-12-27",
            days=5,
            reason="Yılbaşı tatili",
            status="Bekliyor",
            created_at="2025-11-20"
        )
    
    raise HTTPException(status_code=404, detail="İzin talebi bulunamadı")


@app.put("/api/leaves/{leave_id}/approve")
def approve_leave(
    leave_id: int,
    current_user: UserInToken = Depends(get_current_user)
):
    """
    İzin talebini onaylar.
    Sadece yöneticiler kullanabilir
    """
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Bu işlem için yetkiniz yok")
    
    return {
        "message": "İzin talebi onaylandı",
        "leave_id": leave_id,
        "status": "Onaylandı"
    }


@app.put("/api/leaves/{leave_id}/reject")
def reject_leave(
    leave_id: int,
    current_user: UserInToken = Depends(get_current_user)
):
    """
    İzin talebini reddeder.
    Sadece yöneticiler kullanabilir
    """
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Bu işlem için yetkiniz yok")
    
    return {
        "message": "İzin talebi reddedildi",
        "leave_id": leave_id,
        "status": "Reddedildi"
    }


@app.delete("/api/leaves/{leave_id}")
def delete_leave(
    leave_id: int,
    current_user: UserInToken = Depends(get_current_user)
):
    """
    İzin talebini siler.
    Sadece talep sahibi veya yönetici silebilir
    """
    return {
        "message": "İzin talebi silindi",
        "leave_id": leave_id
    }


@app.get("/api/leaves/balance/{employee_id}", response_model=LeaveBalance)
def get_leave_balance(
    employee_id: int,
    current_user: UserInToken = Depends(get_current_user)
):
    """
    Çalışanın izin bakiyesini döndürür.
    """
    # Mock veri
    return LeaveBalance(
        annual=14,
        annual_used=8,
        sick=10,
        sick_used=2
    )


# ============================================
# EXPENSE MANAGEMENT (Protected)
# ============================================

@app.get("/api/expenses", response_model=List[ExpenseRequest])
def get_expenses(
    status: Optional[str] = None,
    current_user: UserInToken = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Masraf taleplerini listeler.
    
    Query Params:
    - status: Duruma göre filtreleme (Bekliyor, Onaylandı, Reddedildi)
    """
    db_expenses = crud.get_expense_requests(db, status_filter=status)
    
    return [
        ExpenseRequest(
            id=exp.id,
            employee_id=exp.employee_id,
            employee_name=exp.employee.full_name if exp.employee else "N/A",
            expense_type=exp.expense_type,
            amount=exp.amount,
            date=exp.date,
            description=exp.description or "",
            status=exp.status,
            created_at=exp.created_at.strftime("%Y-%m-%d")
        )
        for exp in db_expenses
    ]


@app.post("/api/expenses", response_model=ExpenseRequest, status_code=201)
def create_expense(
    expense_data: ExpenseCreateRequest,
    current_user: UserInToken = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Yeni masraf talebi oluşturur.
    """
    # Tarih validasyonu
    try:
        expense_date = datetime.strptime(expense_data.date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Geçersiz tarih formatı. YYYY-MM-DD formatında olmalı.")
    
    # Gelecek tarih kontrolü
    from datetime import date as date_type
    if expense_date > date_type.today():
        raise HTTPException(status_code=400, detail="Gelecek tarihli masraf girilemez.")
    
    # Tutar kontrolü
    if expense_data.amount <= 0:
        raise HTTPException(status_code=400, detail="Masraf tutarı 0'dan büyük olmalı.")
    
    # Create in database (assuming employee_id = 1 for now)
    db_expense = crud.create_expense_request(
        db,
        employee_id=1,  # TODO: Get from current_user
        expense_data={
            "expense_type": expense_data.expense_type,
            "amount": expense_data.amount,
            "date": expense_data.date,
            "description": expense_data.description,
            "status": "Bekliyor"
        }
    )
    
    return ExpenseRequest(
        id=db_expense.id,
        employee_id=db_expense.employee_id,
        employee_name=db_expense.employee.full_name if db_expense.employee else current_user.name,
        expense_type=db_expense.expense_type,
        amount=db_expense.amount,
        date=db_expense.date,
        description=db_expense.description or "",
        status=db_expense.status,
        created_at=db_expense.created_at.strftime("%Y-%m-%d")
    )


@app.get("/api/expenses/{expense_id}", response_model=ExpenseRequest)
def get_expense_detail(
    expense_id: int,
    current_user: UserInToken = Depends(get_current_user)
):
    """
    Belirli bir masraf talebinin detaylarını döndürür.
    """
    # Mock veri
    if expense_id == 1:
        return ExpenseRequest(
            id=1,
            employee_id=1,
            employee_name="Ahmet Yılmaz",
            expense_type="Yol",
            amount=450.00,
            date="2025-11-20",
            description="İstanbul - Ankara müşteri ziyareti",
            status="Bekliyor",
            created_at="2025-11-20"
        )
    
    raise HTTPException(status_code=404, detail="Masraf talebi bulunamadı")


@app.put("/api/expenses/{expense_id}/approve")
def approve_expense(
    expense_id: int,
    current_user: UserInToken = Depends(get_current_user)
):
    """
    Masraf talebini onaylar.
    Sadece yöneticiler kullanabilir
    """
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Bu işlem için yetkiniz yok")
    
    return {
        "message": "Masraf talebi onaylandı",
        "expense_id": expense_id,
        "status": "Onaylandı"
    }


@app.put("/api/expenses/{expense_id}/reject")
def reject_expense(
    expense_id: int,
    current_user: UserInToken = Depends(get_current_user)
):
    """
    Masraf talebini reddeder.
    Sadece yöneticiler kullanabilir
    """
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Bu işlem için yetkiniz yok")
    
    return {
        "message": "Masraf talebi reddedildi",
        "expense_id": expense_id,
        "status": "Reddedildi"
    }


@app.delete("/api/expenses/{expense_id}")
def delete_expense(
    expense_id: int,
    current_user: UserInToken = Depends(get_current_user)
):
    """
    Masraf talebini siler.
    Sadece talep sahibi veya yönetici silebilir
    """
    return {
        "message": "Masraf talebi silindi",
        "expense_id": expense_id
    }


@app.get("/api/expenses/summary/stats")
def get_expense_summary(current_user: UserInToken = Depends(get_current_user)):
    """
    Masraf özetini döndürür (toplam, bekleyen, onaylanan).
    """
    mock_expenses = [
        {"amount": 450.00, "status": "Bekliyor"},
        {"amount": 280.50, "status": "Onaylandı"},
        {"amount": 1250.00, "status": "Onaylandı"},
        {"amount": 150.00, "status": "Reddedildi"},
        {"amount": 85.00, "status": "Bekliyor"},
    ]
    
    total = sum(exp["amount"] for exp in mock_expenses)
    pending = sum(exp["amount"] for exp in mock_expenses if exp["status"] == "Bekliyor")
    approved = sum(exp["amount"] for exp in mock_expenses if exp["status"] == "Onaylandı")
    
    return {
        "total_amount": total,
        "pending_amount": pending,
        "approved_amount": approved,
        "total_count": len(mock_expenses),
        "pending_count": sum(1 for exp in mock_expenses if exp["status"] == "Bekliyor"),
        "approved_count": sum(1 for exp in mock_expenses if exp["status"] == "Onaylandı")
    }
