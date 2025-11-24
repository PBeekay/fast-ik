import { useState } from 'react'

interface Employee {
  id: number
  full_name: string
  title: string
  avatar_url: string
  is_on_leave: boolean
  department: string
  email: string
  phone: string
  start_date: string
}

// Helper function to get initials
const getInitials = (name: string): string => {
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// Helper function to get avatar color
const getAvatarColor = (id: number): string => {
  const colors = [
    'bg-indigo-600',
    'bg-emerald-600', 
    'bg-purple-600',
    'bg-amber-600',
    'bg-rose-600',
    'bg-cyan-600',
    'bg-pink-600',
    'bg-teal-600'
  ]
  return colors[id % colors.length]
}

const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Sahte veri
  const employees: Employee[] = [
    {
      id: 1,
      full_name: 'Ahmet Yılmaz',
      title: 'Frontend Developer',
      avatar_url: 'AY',
      is_on_leave: false,
      department: 'Yazılım',
      email: 'ahmet.yilmaz@fasthr.com',
      phone: '+90 532 123 4567',
      start_date: '2023-01-15'
    },
    {
      id: 2,
      full_name: 'Ayşe Demir',
      title: 'UX Designer',
      avatar_url: 'AD',
      is_on_leave: false,
      department: 'Tasarım',
      email: 'ayse.demir@fasthr.com',
      phone: '+90 533 234 5678',
      start_date: '2022-11-20'
    },
    {
      id: 3,
      full_name: 'Mehmet Kaya',
      title: 'Backend Developer',
      avatar_url: 'MK',
      is_on_leave: true,
      department: 'Yazılım',
      email: 'mehmet.kaya@fasthr.com',
      phone: '+90 534 345 6789',
      start_date: '2023-03-10'
    },
    {
      id: 4,
      full_name: 'Zeynep Arslan',
      title: 'Product Manager',
      avatar_url: 'ZA',
      is_on_leave: false,
      department: 'Ürün',
      email: 'zeynep.arslan@fasthr.com',
      phone: '+90 535 456 7890',
      start_date: '2022-08-05'
    },
    {
      id: 5,
      full_name: 'Can Özkan',
      title: 'DevOps Engineer',
      avatar_url: 'CÖ',
      is_on_leave: false,
      department: 'Yazılım',
      email: 'can.ozkan@fasthr.com',
      phone: '+90 536 567 8901',
      start_date: '2023-05-12'
    },
    {
      id: 6,
      full_name: 'Elif Şahin',
      title: 'HR Specialist',
      avatar_url: 'EŞ',
      is_on_leave: false,
      department: 'İnsan Kaynakları',
      email: 'elif.sahin@fasthr.com',
      phone: '+90 537 678 9012',
      start_date: '2022-06-18'
    },
    {
      id: 7,
      full_name: 'Burak Yıldız',
      title: 'Marketing Manager',
      avatar_url: 'BY',
      is_on_leave: false,
      department: 'Pazarlama',
      email: 'burak.yildiz@fasthr.com',
      phone: '+90 538 789 0123',
      start_date: '2023-02-28'
    },
    {
      id: 8,
      full_name: 'Selin Aydın',
      title: 'Sales Representative',
      avatar_url: 'SA',
      is_on_leave: true,
      department: 'Satış',
      email: 'selin.aydin@fasthr.com',
      phone: '+90 539 890 1234',
      start_date: '2022-09-14'
    },
  ]

  const openDrawer = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setTimeout(() => setSelectedEmployee(null), 300)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Ekip</h1>
          <p className="text-gray-500 mt-1">{employees.length} çalışan</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Yeni Ekle</span>
        </button>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
            onClick={() => openDrawer(employee)}
          >
            {/* Card Content */}
            <div className="p-6 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className={`w-24 h-24 rounded-full ${getAvatarColor(employee.id)} flex items-center justify-center text-2xl font-bold text-white ${
                  employee.is_on_leave ? 'opacity-50' : ''
                }`}>
                  {getInitials(employee.full_name)}
                </div>
                {employee.is_on_leave && (
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Name & Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {employee.full_name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{employee.title}</p>

              {/* Department Badge */}
              <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full mb-4">
                {employee.department}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center space-x-2 pt-4 border-t border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openDrawer(employee)
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors flex items-center justify-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Profil</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('Mesaj gönder:', employee.full_name)
                  }}
                  className="flex-1 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Mesaj</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer - Sağdan Açılan Panel */}
      {isDrawerOpen && selectedEmployee && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={closeDrawer}
          ></div>

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">Profil Detayı</h2>
              <button
                onClick={closeDrawer}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="text-center pb-6 border-b border-gray-100">
                <div className="relative inline-block mb-4">
                  <div className={`w-32 h-32 rounded-full ${getAvatarColor(selectedEmployee.id)} flex items-center justify-center text-4xl font-bold text-white ${
                    selectedEmployee.is_on_leave ? 'opacity-50' : ''
                  }`}>
                    {getInitials(selectedEmployee.full_name)}
                  </div>
                  {selectedEmployee.is_on_leave && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full shadow-lg flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>İzinde</span>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedEmployee.full_name}
                </h3>
                <p className="text-gray-500 mb-3">{selectedEmployee.title}</p>
                <div className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-xl">
                  {selectedEmployee.department}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                  İletişim Bilgileri
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-1 font-medium">E-posta</p>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {selectedEmployee.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1 font-medium">Telefon</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEmployee.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1 font-medium">Başlangıç Tarihi</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedEmployee.start_date).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                  Hızlı İşlemler
                </h4>
                <div className="space-y-2">
                  <button className="w-full p-4 bg-indigo-50 text-indigo-600 rounded-xl font-medium hover:bg-indigo-100 transition-colors text-left flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Mesaj Gönder</span>
                    </div>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="w-full p-4 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors text-left flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Belge Talep Et</span>
                    </div>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="w-full p-4 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors text-left flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Bilgileri Düzenle</span>
                    </div>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Employees

