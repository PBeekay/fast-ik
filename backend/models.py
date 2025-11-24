from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class EmployeeCard(BaseModel):
    """
    Çalışan kartı için basitleştirilmiş model.
    Frontend'teki grid görünümünde kullanılır.
    Sadece gerekli minimum bilgileri içerir - karmaşık veriler burada yer almaz.
    """
    id: int = Field(..., description="Çalışan benzersiz kimliği")
    full_name: str = Field(..., description="Çalışanın ad ve soyadı", min_length=2, max_length=100)
    title: str = Field(..., description="Çalışanın pozisyonu/ünvanı", max_length=100)
    avatar_url: str = Field(..., description="Profil fotoğrafı URL'i veya emoji")
    is_on_leave: bool = Field(default=False, description="Çalışan şu anda izinli mi?")
    department: str = Field(..., description="Çalışanın departmanı", max_length=50)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "full_name": "Ahmet Yılmaz",
                "title": "Frontend Developer",
                "avatar_url": "AY",
                "is_on_leave": False,
                "department": "Yazılım"
            }
        }


class EmployeeDetail(BaseModel):
    """
    Çalışan detay modeli.
    Drawer/modal'da gösterilecek tam detayları içerir.
    Hassas bilgiler (maaş, TC kimlik, adres vb.) bu modelde yer alır.
    """
    id: int = Field(..., description="Çalışan benzersiz kimliği")
    full_name: str = Field(..., description="Çalışanın ad ve soyadı", min_length=2, max_length=100)
    title: str = Field(..., description="Çalışanın pozisyonu/ünvanı", max_length=100)
    avatar_url: str = Field(..., description="Profil fotoğrafı URL'i veya emoji")
    is_on_leave: bool = Field(default=False, description="Çalışan şu anda izinli mi?")
    department: str = Field(..., description="Çalışanın departmanı", max_length=50)
    
    # İletişim bilgileri
    email: EmailStr = Field(..., description="Çalışanın e-posta adresi")
    phone: str = Field(..., description="Çalışanın telefon numarası", max_length=20)
    
    # İş bilgileri
    start_date: str = Field(..., description="İşe başlama tarihi (YYYY-MM-DD formatında)")
    
    # Detaylı bilgiler (opsiyonel)
    address: Optional[str] = Field(None, description="İkamet adresi", max_length=200)
    birth_date: Optional[str] = Field(None, description="Doğum tarihi (YYYY-MM-DD formatında)")
    emergency_contact: Optional[str] = Field(None, description="Acil durum iletişim bilgisi", max_length=100)
    
    # Hassas bilgiler
    salary: Optional[float] = Field(None, description="Maaş bilgisi (sadece yetkili kullanıcılar için)", ge=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "full_name": "Ahmet Yılmaz",
                "title": "Frontend Developer",
                "avatar_url": "AY",
                "is_on_leave": False,
                "department": "Yazılım",
                "email": "ahmet.yilmaz@fasthr.com",
                "phone": "+90 532 123 4567",
                "start_date": "2023-01-15",
                "address": "İstanbul, Türkiye",
                "birth_date": "1995-05-20",
                "emergency_contact": "Ayşe Yılmaz - +90 533 234 5678",
                "salary": 15000.00
            }
        }


class LeaveRequest(BaseModel):
    """
    İzin talebi modeli
    """
    id: Optional[int] = None
    employee_id: int
    employee_name: str
    leave_type: str = Field(..., description="İzin türü: Yıllık İzin, Hastalık İzni, Mazeret İzni, Ücretsiz İzin")
    start_date: str = Field(..., description="Başlangıç tarihi (YYYY-MM-DD)")
    end_date: str = Field(..., description="Bitiş tarihi (YYYY-MM-DD)")
    days: int = Field(..., description="Toplam izin günü sayısı", ge=1)
    reason: str = Field(..., description="İzin sebebi/açıklama", min_length=5)
    status: str = Field(default="Bekliyor", description="Durum: Bekliyor, Onaylandı, Reddedildi")
    created_at: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "employee_id": 1,
                "employee_name": "Ahmet Yılmaz",
                "leave_type": "Yıllık İzin",
                "start_date": "2025-12-20",
                "end_date": "2025-12-27",
                "days": 5,
                "reason": "Yılbaşı tatili",
                "status": "Bekliyor",
                "created_at": "2025-11-20"
            }
        }


class LeaveBalance(BaseModel):
    """
    İzin bakiyesi modeli
    """
    annual: int = Field(..., description="Toplam yıllık izin hakkı", ge=0)
    annual_used: int = Field(..., description="Kullanılan yıllık izin", ge=0)
    sick: int = Field(..., description="Toplam hastalık izni hakkı", ge=0)
    sick_used: int = Field(..., description="Kullanılan hastalık izni", ge=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "annual": 14,
                "annual_used": 8,
                "sick": 10,
                "sick_used": 2
            }
        }


class LeaveCreateRequest(BaseModel):
    """
    İzin talebi oluşturma request modeli
    """
    leave_type: str
    start_date: str
    end_date: str
    reason: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "leave_type": "Yıllık İzin",
                "start_date": "2025-12-20",
                "end_date": "2025-12-27",
                "reason": "Yılbaşı tatili"
            }
        }


class ExpenseRequest(BaseModel):
    """
    Masraf talebi modeli (ileriki geliştirmeler için)
    """
    employee_id: int
    expense_type: str = Field(..., description="Masraf türü: Yol, Yemek, Konaklama vb.")
    amount: float = Field(..., ge=0, description="Masraf tutarı")
    date: str
    description: str
    receipt_url: Optional[str] = None
    status: str = Field(default="Bekliyor", description="Durum: Bekliyor, Onaylandı, Reddedildi")
    
    class Config:
        json_schema_extra = {
            "example": {
                "employee_id": 1,
                "expense_type": "Yol",
                "amount": 250.50,
                "date": "2024-05-20",
                "description": "Müşteri ziyareti - İstanbul",
                "receipt_url": "https://example.com/receipt.pdf",
                "status": "Bekliyor"
            }
        }

