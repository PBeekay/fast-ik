import { useState, useEffect } from 'react'

interface TeamMember {
  id: number
  name: string
  avatar: string
  isOnLeave: boolean
  leaveType?: string
}

const Dashboard = () => {
  const [userName] = useState('Berkay')
  const [currentDate, setCurrentDate] = useState('')
  
  // Bugünün tarihini al
  useEffect(() => {
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    setCurrentDate(today.toLocaleDateString('tr-TR', options))
  }, [])

  // Hızlı Aksiyonlar
  const quickActions = [
    {
      id: 1,
      title: 'İzin İste',
      description: 'Yeni bir izin talebi oluştur',
      icon: 'calendar',
      color: 'indigo',
      action: () => console.log('İzin talebi')
    },
    {
      id: 2,
      title: 'Masraf Gir',
      description: 'Yeni bir masraf kaydı ekle',
      icon: 'receipt',
      color: 'emerald',
      action: () => console.log('Masraf girişi')
    },
    {
      id: 3,
      title: 'Belge Talep Et',
      description: 'İK belgesi talep et',
      icon: 'document',
      color: 'purple',
      action: () => console.log('Belge talebi')
    },
  ]

  // Icon component
  const ActionIcon = ({ type }: { type: string }) => {
    switch(type) {
      case 'calendar':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'receipt':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
          </svg>
        )
      case 'document':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      default:
        return null
    }
  }

  // Ekip Durumu - İzinli olanlar
  const teamMembers: TeamMember[] = [
    { id: 1, name: 'Ahmet Yılmaz', avatar: 'AY', isOnLeave: true, leaveType: 'Tatil' },
    { id: 2, name: 'Ayşe Demir', avatar: 'AD', isOnLeave: false },
    { id: 3, name: 'Mehmet Kaya', avatar: 'MK', isOnLeave: true, leaveType: 'Yıllık İzin' },
    { id: 4, name: 'Zeynep Arslan', avatar: 'ZA', isOnLeave: false },
    { id: 5, name: 'Can Özkan', avatar: 'CÖ', isOnLeave: false },
    { id: 6, name: 'Elif Şahin', avatar: 'EŞ', isOnLeave: true, leaveType: 'Tatil' },
  ]

  // Motivasyon mesajları
  const motivationalMessages = [
    'Bugün tamamlanması gereken 5 görev var.',
    'Takımınızdan 3 yeni talep bekliyor.',
    'Bu hafta 8 izin talebi onaylandı.',
    'Sistemde güncel bilgileriniz görüntüleniyor.',
  ]

  const [motivationMessage] = useState(
    motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
  )

  return (
    <div className="space-y-8">
      {/* Karşılama Başlığı */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Hoş geldiniz, {userName}
        </h1>
        <p className="text-lg text-gray-500 mb-1">{currentDate}</p>
        <p className="text-base text-indigo-600 font-medium">{motivationMessage}</p>
      </div>

      {/* Hızlı Aksiyonlar */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı Aksiyonlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-8 text-left"
            >
              {/* Background on Hover */}
              <div className={`absolute inset-0 bg-${action.color}-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-${action.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <ActionIcon type={action.icon} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {action.description}
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="absolute bottom-6 right-6 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ekip Durumu - Story Modu */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Şu an Kimler Yok?</h2>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {teamMembers.filter(member => member.isOnLeave).map((member) => (
              <div key={member.id} className="flex flex-col items-center space-y-2 flex-shrink-0">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-semibold text-lg">{member.avatar}</span>
                  </div>
                  {/* Badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                {/* Name */}
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900 max-w-[80px] truncate">
                    {member.name.split(' ')[0]}
                  </p>
                  <p className="text-xs text-gray-500">{member.leaveType}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* No one on leave message */}
          {teamMembers.filter(member => member.isOnLeave).length === 0 && (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-emerald-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500">Tüm ekip bugün ofiste!</p>
            </div>
          )}
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 font-medium">TOPLAM</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">42</p>
          <p className="text-sm text-gray-500 mt-1">Çalışan</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 font-medium">BUGÜN</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-500 mt-1">İzinli</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 font-medium">BEKLEYEN</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-500 mt-1">Talep</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 font-medium">BU AY</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">2</p>
          <p className="text-sm text-gray-500 mt-1">Doğum Günü</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

