from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
from models import EmployeeCard, EmployeeDetail, LeaveRequest, LeaveBalance

app = FastAPI(
    title="FastHR API",
    description="Modern İnsan Kaynakları Yönetim Sistemi API",
    version="1.0.0"
)

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

@app.get("/api/employees", response_model=List[EmployeeCard])
def get_employees():
    """
    Tüm çalışanların kart görünümü için basitleştirilmiş bilgilerini döndürür.
    Bu endpoint frontend'teki grid kartlarını doldurmak için kullanılır.
    """
    # Sahte (mock) veri
    mock_employees = [
        EmployeeCard(
            id=1,
            full_name="Ahmet Yılmaz",
            title="Frontend Developer",
            avatar_url="AY",
            is_on_leave=False,
            department="Yazılım"
        ),
        EmployeeCard(
            id=2,
            full_name="Ayşe Demir",
            title="UX Designer",
            avatar_url="AD",
            is_on_leave=False,
            department="Tasarım"
        ),
        EmployeeCard(
            id=3,
            full_name="Mehmet Kaya",
            title="Backend Developer",
            avatar_url="MK",
            is_on_leave=True,
            department="Yazılım"
        ),
        EmployeeCard(
            id=4,
            full_name="Zeynep Arslan",
            title="Product Manager",
            avatar_url="ZA",
            is_on_leave=False,
            department="Ürün"
        ),
        EmployeeCard(
            id=5,
            full_name="Can Özkan",
            title="DevOps Engineer",
            avatar_url="CÖ",
            is_on_leave=False,
            department="Yazılım"
        ),
        EmployeeCard(
            id=6,
            full_name="Elif Şahin",
            title="HR Specialist",
            avatar_url="EŞ",
            is_on_leave=False,
            department="İnsan Kaynakları"
        ),
        EmployeeCard(
            id=7,
            full_name="Burak Yıldız",
            title="Marketing Manager",
            avatar_url="BY",
            is_on_leave=False,
            department="Pazarlama"
        ),
        EmployeeCard(
            id=8,
            full_name="Selin Aydın",
            title="Sales Representative",
            avatar_url="SA",
            is_on_leave=True,
            department="Satış"
        ),
    ]
    
    return mock_employees

@app.get("/api/employees/{employee_id}", response_model=EmployeeDetail)
def get_employee_detail(employee_id: int):
    """
    Belirli bir çalışanın detaylı bilgilerini döndürür.
    Bu endpoint drawer/modal'da gösterilecek detaylar içindir.
    """
    # Sahte (mock) detaylı veri
    mock_detail = EmployeeDetail(
        id=employee_id,
        full_name="Ahmet Yılmaz",
        title="Frontend Developer",
        avatar_url="AY",
        is_on_leave=False,
        department="Yazılım",
        email="ahmet.yilmaz@fasthr.com",
        phone="+90 532 123 4567",
        start_date="2023-01-15",
        address="İstanbul, Türkiye",
        birth_date="1995-05-20",
        emergency_contact="Ayşe Yılmaz - +90 533 234 5678",
        salary=15000.00
    )
    
    return mock_detail

@app.get("/api/dashboard/stats")
def get_dashboard_stats():
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
def get_employees_on_leave():
    """
    Şu anda izinli olan çalışanları döndürür.
    Dashboard'daki "Şu an Kimler Yok?" bölümü için kullanılır.
    """
    mock_on_leave = [
        EmployeeCard(
            id=3,
            full_name="Mehmet Kaya",
            title="Backend Developer",
            avatar_url="MK",
            is_on_leave=True,
            department="Yazılım"
        ),
        EmployeeCard(
            id=8,
            full_name="Selin Aydın",
            title="Sales Representative",
            avatar_url="SA",
            is_on_leave=True,
            department="Satış"
        ),
    ]
    
    return mock_on_leave


# ==================== İZİN YÖNETİMİ ====================

@app.get("/api/leaves", response_model=List[LeaveRequest])
def get_leaves(status: Optional[str] = None):
    """
    İzin taleplerini listeler.
    
    Query Params:
    - status: Duruma göre filtreleme (Bekliyor, Onaylandı, Reddedildi)
    """
    # Mock veriler
    mock_leaves = [
        LeaveRequest(
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
        ),
        LeaveRequest(
            id=2,
            employee_id=2,
            employee_name="Ayşe Demir",
            leave_type="Hastalık İzni",
            start_date="2025-11-15",
            end_date="2025-11-17",
            days=2,
            reason="Grip",
            status="Onaylandı",
            created_at="2025-11-14"
        ),
        LeaveRequest(
            id=3,
            employee_id=3,
            employee_name="Mehmet Kaya",
            leave_type="Mazeret İzni",
            start_date="2025-11-10",
            end_date="2025-11-10",
            days=1,
            reason="Özel işler",
            status="Reddedildi",
            created_at="2025-11-08"
        ),
        LeaveRequest(
            id=4,
            employee_id=4,
            employee_name="Zeynep Arslan",
            leave_type="Yıllık İzin",
            start_date="2025-11-25",
            end_date="2025-11-29",
            days=5,
            reason="Aile ziyareti",
            status="Onaylandı",
            created_at="2025-11-01"
        ),
    ]
    
    # Filtreleme
    if status:
        mock_leaves = [leave for leave in mock_leaves if leave.status == status]
    
    return mock_leaves


@app.post("/api/leaves", response_model=LeaveRequest, status_code=201)
def create_leave(leave_data: LeaveCreateRequest):
    """
    Yeni izin talebi oluşturur.
    """
    from datetime import datetime, timedelta
    
    # Tarih validasyonu
    try:
        start = datetime.strptime(leave_data.start_date, "%Y-%m-%d")
        end = datetime.strptime(leave_data.end_date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Geçersiz tarih formatı. YYYY-MM-DD formatında olmalı.")
    
    if start > end:
        raise HTTPException(status_code=400, detail="Bitiş tarihi başlangıç tarihinden önce olamaz.")
    
    # Gün sayısını hesapla
    days = (end - start).days + 1
    
    # Mock response
    new_leave = LeaveRequest(
        id=5,  # Yeni ID
        employee_id=1,  # Mock kullanıcı
        employee_name="Berkay",
        leave_type=leave_data.leave_type,
        start_date=leave_data.start_date,
        end_date=leave_data.end_date,
        days=days,
        reason=leave_data.reason,
        status="Bekliyor",
        created_at=datetime.now().strftime("%Y-%m-%d")
    )
    
    return new_leave


@app.get("/api/leaves/{leave_id}", response_model=LeaveRequest)
def get_leave_detail(leave_id: int):
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
def approve_leave(leave_id: int):
    """
    İzin talebini onaylar.
    Sadece yöneticiler kullanabilir (TODO: Authorization)
    """
    return {
        "message": "İzin talebi onaylandı",
        "leave_id": leave_id,
        "status": "Onaylandı"
    }


@app.put("/api/leaves/{leave_id}/reject")
def reject_leave(leave_id: int):
    """
    İzin talebini reddeder.
    Sadece yöneticiler kullanabilir (TODO: Authorization)
    """
    return {
        "message": "İzin talebi reddedildi",
        "leave_id": leave_id,
        "status": "Reddedildi"
    }


@app.delete("/api/leaves/{leave_id}")
def delete_leave(leave_id: int):
    """
    İzin talebini siler.
    Sadece talep sahibi veya yönetici silebilir (TODO: Authorization)
    """
    return {
        "message": "İzin talebi silindi",
        "leave_id": leave_id
    }


@app.get("/api/leaves/balance/{employee_id}", response_model=LeaveBalance)
def get_leave_balance(employee_id: int):
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

