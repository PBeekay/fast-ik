import { useState } from 'react'

interface Expense {
  id: number
  employee_name: string
  expense_type: string
  amount: number
  date: string
  description: string
  status: 'Bekliyor' | 'Onaylandı' | 'Reddedildi'
  created_at: string
}

const Expenses = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [showNewExpenseForm, setShowNewExpenseForm] = useState(false)
  
  // Form state
  const [expenseType, setExpenseType] = useState('Yol')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  // Mock data - Masraf talepleri
  const expenses: Expense[] = [
    {
      id: 1,
      employee_name: 'Ahmet Yılmaz',
      expense_type: 'Yol',
      amount: 450.00,
      date: '2025-11-20',
      description: 'İstanbul - Ankara müşteri ziyareti',
      status: 'Bekliyor',
      created_at: '2025-11-20'
    },
    {
      id: 2,
      employee_name: 'Ayşe Demir',
      expense_type: 'Yemek',
      amount: 280.50,
      date: '2025-11-18',
      description: 'Müşteri yemeği',
      status: 'Onaylandı',
      created_at: '2025-11-18'
    },
    {
      id: 3,
      employee_name: 'Mehmet Kaya',
      expense_type: 'Konaklama',
      amount: 1250.00,
      date: '2025-11-15',
      description: 'Ankara otel 2 gece',
      status: 'Onaylandı',
      created_at: '2025-11-15'
    },
    {
      id: 4,
      employee_name: 'Zeynep Arslan',
      expense_type: 'Diğer',
      amount: 150.00,
      date: '2025-11-10',
      description: 'Ofis malzemeleri',
      status: 'Reddedildi',
      created_at: '2025-11-10'
    },
    {
      id: 5,
      employee_name: 'Can Özkan',
      expense_type: 'Yol',
      amount: 85.00,
      date: '2025-11-22',
      description: 'Taksi',
      status: 'Bekliyor',
      created_at: '2025-11-22'
    }
  ]

  // Masraf tiplerinin renkleri
  const expenseTypeColors: Record<string, string> = {
    'Yol': 'bg-blue-100 text-blue-700',
    'Yemek': 'bg-emerald-100 text-emerald-700',
    'Konaklama': 'bg-purple-100 text-purple-700',
    'Diğer': 'bg-gray-100 text-gray-700'
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
  const filteredExpenses = expenses.filter(expense => {
    if (activeTab === 'all') return true
    if (activeTab === 'pending') return expense.status === 'Bekliyor'
    if (activeTab === 'approved') return expense.status === 'Onaylandı'
    if (activeTab === 'rejected') return expense.status === 'Reddedildi'
    return true
  })

  // Toplam tutarlar
  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)
  const pendingAmount = expenses.filter(e => e.status === 'Bekliyor').reduce((sum, exp) => sum + exp.amount, 0)
  const approvedAmount = expenses.filter(e => e.status === 'Onaylandı').reduce((sum, exp) => sum + exp.amount, 0)

  // Form gönderme
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Masraf talebi:', { expenseType, amount, date, description })
    // TODO: API'ye gönder
    setShowNewExpenseForm(false)
    // Form temizle
    setExpenseType('Yol')
    setAmount('')
    setDate('')
    setDescription('')
  }

  // Para formatı
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Masraflar</h1>
          <p className="text-gray-500 mt-1">Masraf taleplerinizi yönetin</p>
        </div>
        <button
          onClick={() => setShowNewExpenseForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Yeni Masraf Talebi</span>
        </button>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Toplam */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Toplam</h3>
                <p className="text-sm text-gray-500">Tüm masraflar</p>
              </div>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(expenses.reduce((sum, e) => sum + e.amount, 0))}</p>
          <p className="text-sm text-gray-500 mt-2">{expenses.length} talep</p>
        </div>

        {/* Bekleyen */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Bekleyen</h3>
                <p className="text-sm text-gray-500">Onay bekliyor</p>
              </div>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</p>
          <p className="text-sm text-gray-500 mt-2">{expenses.filter(e => e.status === 'Bekliyor').length} talep</p>
        </div>

        {/* Onaylanan */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Onaylanan</h3>
                <p className="text-sm text-gray-500">Ödeme yapılacak</p>
              </div>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(approvedAmount)}</p>
          <p className="text-sm text-gray-500 mt-2">{expenses.filter(e => e.status === 'Onaylandı').length} talep</p>
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
          Tümü ({expenses.length})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeTab === 'pending'
              ? 'bg-amber-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Bekleyen ({expenses.filter(e => e.status === 'Bekliyor').length})
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeTab === 'approved'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Onaylanan ({expenses.filter(e => e.status === 'Onaylandı').length})
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeTab === 'rejected'
              ? 'bg-rose-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Reddedilen ({expenses.filter(e => e.status === 'Reddedildi').length})
        </button>
      </div>

      {/* Toplam Tutar (Aktif Sekme) */}
      {filteredExpenses.length > 0 && (
        <div className="bg-indigo-50 rounded-2xl p-4 flex items-center justify-between">
          <span className="text-indigo-900 font-medium">
            {activeTab === 'all' && 'Toplam Masraf'}
            {activeTab === 'pending' && 'Bekleyen Masraf'}
            {activeTab === 'approved' && 'Onaylanan Masraf'}
            {activeTab === 'rejected' && 'Reddedilen Masraf'}
          </span>
          <span className="text-2xl font-bold text-indigo-900">{formatCurrency(totalAmount)}</span>
        </div>
      )}

      {/* Masraf Listesi */}
      <div className="grid grid-cols-1 gap-4">
        {filteredExpenses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500">Bu kategoride masraf talebi bulunamadı</p>
          </div>
        ) : (
          filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                {/* Sol: Bilgiler */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-bold text-gray-900">{expense.employee_name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${expenseTypeColors[expense.expense_type]}`}>
                      {expense.expense_type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                      {expense.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(expense.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-bold text-indigo-600">{formatCurrency(expense.amount)}</span>
                    </div>
                  </div>
                  
                  {expense.description && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Açıklama:</span> {expense.description}
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-400">
                    Talep tarihi: {new Date(expense.created_at).toLocaleDateString('tr-TR')}
                  </p>
                </div>

                {/* Sağ: Aksiyonlar */}
                {expense.status === 'Bekliyor' && (
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

      {/* Yeni Masraf Talebi Modal */}
      {showNewExpenseForm && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setShowNewExpenseForm(false)}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-slide-in">
              {/* Header */}
              <div className="border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Yeni Masraf Talebi</h2>
                <button
                  onClick={() => setShowNewExpenseForm(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Masraf Tipi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Masraf Tipi
                  </label>
                  <select
                    value={expenseType}
                    onChange={(e) => setExpenseType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="Yol">Yol</option>
                    <option value="Yemek">Yemek</option>
                    <option value="Konaklama">Konaklama</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                {/* Tutar ve Tarih */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tutar (TL)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tarih
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Tutar önizleme */}
                {amount && parseFloat(amount) > 0 && (
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <p className="text-sm text-indigo-900">
                      <span className="font-bold">{formatCurrency(parseFloat(amount))}</span> masraf talep ediyorsunuz
                    </p>
                  </div>
                )}

                {/* Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Masrafın detaylarını açıklayın..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                {/* Butonlar */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowNewExpenseForm(false)}
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

export default Expenses

