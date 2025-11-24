import { useState } from 'react'

interface Leave {
  id: number
  employee_name: string
  leave_type: string
  start_date: string
  end_date: string
  days: number
  reason: string
  status: 'Bekliyor' | 'Onaylandı' | 'Reddedildi'
  created_at: string
}

interface LeaveBalance {
  annual: number
  annual_used: number
  sick: number
  sick_used: number
}

const Leaves = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [showNewLeaveForm, setShowNewLeaveForm] = useState(false)
  
  // Form state
  const [leaveType, setLeaveType] = useState('Yıllık İzin')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')

  // Mock data - İzin bakiyesi
  const leaveBalance: LeaveBalance = {
    annual: 14,
    annual_used: 8,
    sick: 10,
    sick_used: 2
  }

  // Mock data - İzin talepleri
  const leaves: Leave[] = [
    {
      id: 1,
      employee_name: 'Ahmet Yılmaz',
      leave_type: 'Yıllık İzin',
      start_date: '2025-12-20',
      end_date: '2025-12-27',
      days: 5,
      reason: 'Yılbaşı tatili',
      status: 'Bekliyor',
      created_at: '2025-11-20'
    },
    {
      id: 2,
      employee_name: 'Ayşe Demir',
      leave_type: 'Hastalık İzni',
      start_date: '2025-11-15',
      end_date: '2025-11-17',
      days: 2,
      reason: 'Grip',
      status: 'Onaylandı',
      created_at: '2025-11-14'
    },
    {
      id: 3,
      employee_name: 'Mehmet Kaya',
      leave_type: 'Mazeret İzni',
      start_date: '2025-11-10',
      end_date: '2025-11-10',
      days: 1,
      reason: 'Özel işler',
      status: 'Reddedildi',
      created_at: '2025-11-08'
    },
    {
      id: 4,
      employee_name: 'Zeynep Arslan',
      leave_type: 'Yıllık İzin',
      start_date: '2025-11-25',
      end_date: '2025-11-29',
      days: 5,
      reason: 'Aile ziyareti',
      status: 'Onaylandı',
      created_at: '2025-11-01'
    }
  ]

  // İzin tiplerinin renkleri
  const leaveTypeColors: Record<string, string> = {
    'Yıllık İzin': 'bg-indigo-100 text-indigo-700',
    'Hastalık İzni': 'bg-rose-100 text-rose-700',
    'Mazeret İzni': 'bg-amber-100 text-amber-700',
    'Ücretsiz İzin': 'bg-gray-100 text-gray-700'
  }

  // Status renkleri
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Bekliyor':
        return 'bg-amber-100 text-amber-700'
      case 'Onaylandı':
        return 'bg-emerald-100 text-emerald-700'
      case 'Reddedildi':
        return 'bg-rose-100 text-rose-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  // Filtreleme
  const filteredLeaves = leaves.filter(leave => {
    if (activeTab === 'all') return true
    if (activeTab === 'pending') return leave.status === 'Bekliyor'
    if (activeTab === 'approved') return leave.status === 'Onaylandı'
    if (activeTab === 'rejected') return leave.status === 'Reddedildi'
    return true
  })

  // Form gönderme
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('İzin talebi:', { leaveType, startDate, endDate, reason })
    // TODO: API'ye gönder
    setShowNewLeaveForm(false)
    // Form temizle
    setLeaveType('Yıllık İzin')
    setStartDate('')
    setEndDate('')
    setReason('')
  }

  // Gün hesaplama
  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0
    const startD = new Date(start)
    const endD = new Date(end)
    const diffTime = Math.abs(endD.getTime() - startD.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">İzinler</h1>
          <p className="text-gray-500 mt-1">İzin taleplerinizi yönetin</p>
        </div>
        <button
          onClick={() => setShowNewLeaveForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Yeni İzin Talebi</span>
        </button>
      </div>

      {/* İzin Bakiyesi Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yıllık İzin */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Yıllık İzin</h3>
                <p className="text-sm text-gray-500">Kalan hakkınız</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-end space-x-2 mb-3">
            <span className="text-4xl font-bold text-gray-900">{leaveBalance.annual - leaveBalance.annual_used}</span>
            <span className="text-lg text-gray-500 mb-1">/ {leaveBalance.annual} gün</span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((leaveBalance.annual - leaveBalance.annual_used) / leaveBalance.annual) * 100}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">{leaveBalance.annual_used} gün kullanıldı</p>
        </div>

        {/* Hastalık İzni */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Hastalık İzni</h3>
                <p className="text-sm text-gray-500">Kalan hakkınız</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-end space-x-2 mb-3">
            <span className="text-4xl font-bold text-gray-900">{leaveBalance.sick - leaveBalance.sick_used}</span>
            <span className="text-lg text-gray-500 mb-1">/ {leaveBalance.sick} gün</span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-rose-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((leaveBalance.sick - leaveBalance.sick_used) / leaveBalance.sick) * 100}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">{leaveBalance.sick_used} gün kullanıldı</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm p-1 inline-flex space-x-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeTab === 'all'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Tümü ({leaves.length})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeTab === 'pending'
              ? 'bg-amber-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Bekleyen ({leaves.filter(l => l.status === 'Bekliyor').length})
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeTab === 'approved'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Onaylanan ({leaves.filter(l => l.status === 'Onaylandı').length})
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeTab === 'rejected'
              ? 'bg-rose-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Reddedilen ({leaves.filter(l => l.status === 'Reddedildi').length})
        </button>
      </div>

      {/* İzin Listesi */}
      <div className="grid grid-cols-1 gap-4">
        {filteredLeaves.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">Bu kategoride izin talebi bulunamadı</p>
          </div>
        ) : (
          filteredLeaves.map((leave) => (
            <div
              key={leave.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                {/* Sol: Bilgiler */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-bold text-gray-900">{leave.employee_name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${leaveTypeColors[leave.leave_type]}`}>
                      {leave.leave_type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(leave.start_date).toLocaleDateString('tr-TR')} - {new Date(leave.end_date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{leave.days} gün</span>
                    </div>
                  </div>
                  
                  {leave.reason && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Açıklama:</span> {leave.reason}
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-400">
                    Talep tarihi: {new Date(leave.created_at).toLocaleDateString('tr-TR')}
                  </p>
                </div>

                {/* Sağ: Aksiyonlar */}
                {leave.status === 'Bekliyor' && (
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors">
                      Onayla
                    </button>
                    <button className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-medium hover:bg-rose-100 transition-colors">
                      Reddet
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Yeni İzin Talebi Modal */}
      {showNewLeaveForm && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setShowNewLeaveForm(false)}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-slide-in">
              {/* Header */}
              <div className="border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Yeni İzin Talebi</h2>
                <button
                  onClick={() => setShowNewLeaveForm(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* İzin Tipi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İzin Tipi
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="Yıllık İzin">Yıllık İzin</option>
                    <option value="Hastalık İzni">Hastalık İzni</option>
                    <option value="Mazeret İzni">Mazeret İzni</option>
                    <option value="Ücretsiz İzin">Ücretsiz İzin</option>
                  </select>
                </div>

                {/* Tarih Aralığı */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlangıç Tarihi
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bitiş Tarihi
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Gün hesaplama */}
                {startDate && endDate && (
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <p className="text-sm text-indigo-900">
                      <span className="font-bold">{calculateDays(startDate, endDate)} gün</span> izin talep ediyorsunuz
                    </p>
                  </div>
                )}

                {/* Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    placeholder="İzin sebebinizi açıklayın..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                {/* Butonlar */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowNewLeaveForm(false)}
                    className="btn-secondary"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Talep Oluştur
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Leaves

