'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import PatentModal from './components/PatentModal'

export interface PatentItem {
  id: number
  year_received?: string | number
  agency_type?: string
  prefix?: string
  inventor_firstname?: string
  inventor_lastname?: string
  faculty?: string
  department?: string
  patent_type?: string
  job_nature?: string
  email?: string
  phone?: string
  phone_number?: string
  tel?: string
  application_date?: string
  app_date?: string
  filing_date?: string
  application_no?: string
  application_number?: string
  app_no?: string
  title?: string
  new_title?: string
  original_title?: string
  invention_name?: string
  registration_date?: string
  register_date?: string
  [key: string]: any
}

export default function PatentSearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<PatentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedPatent, setSelectedPatent] = useState<PatentItem | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanTerm = searchTerm.trim()
    if (!cleanTerm) return

    setLoading(true)
    setHasSearched(true)
    setErrorMessage(null)

    try {
      const { data, error } = await supabase
        .from('ip_mornitoring_2_10_69') 
        .select('*')
        .or(`inventor_firstname.ilike.%${cleanTerm}%,inventor_lastname.ilike.%${cleanTerm}%`)

      if (error) {
        console.error('Supabase Error Details:', error)
        setErrorMessage(`เกิดข้อผิดพลาดจาก Supabase: ${error.message} (Code: ${error.code || 'N/A'})`)
        setResults([])
      } else {
        setResults(data || [])
      }
    } catch (err: any) {
      console.error('Unexpected Error:', err)
      setErrorMessage(`เกิดข้อผิดพลาดในการเชื่อมต่อ: ${err?.message || 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้'}`)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#030202] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Header */}
      <header className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-8 px-4 shadow-md transition-colors duration-300">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-4 md:top-6 md:right-8 p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all focus:outline-none"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>

        <div className="max-w-6xl mx-auto text-center space-y-2 mt-4 md:mt-0">
          <span className="bg-blue-600/40 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            ระบบฐานข้อมูลสิทธิบัตรและผลงานวิจัย
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            ระบบค้นหาผลงานสิทธิบัตรรายบุคคล
          </h1>
          <p className="text-blue-200 text-sm md:text-base">
            สืบค้นข้อมูลผลงานสิทธิบัตร / อนุสิทธิบัตร / เครื่องหมายการค้า ของอาจารย์และนักวิจัย
          </p>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Search Form */}
        <div className={`p-6 md:p-8 rounded-xl shadow-sm border transition-colors duration-300 ${
          isDarkMode ? 'bg-[#080712] border-[#8C8C8C]' : 'bg-white border-slate-200'
        }`}>
          <form onSubmit={handleSearch} className="space-y-4">
            <label htmlFor="search" className={`block text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              พิมพ์ชื่อ หรือ นามสกุลของอาจารย์/นักวิจัย
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="เช่น เกรียงไกร, ชินธันย์, Niramon..."
                  className={`w-full px-4 py-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-300 ${
                    isDarkMode
                      ? 'border-[#8C8C8C] bg-[#030202] text-white placeholder-slate-500'
                      : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400'
                  }`}
                />
                <svg className={`w-5 h-5 absolute left-3 top-3.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition duration-200 disabled:bg-blue-800/50 disabled:text-slate-300 flex items-center justify-center gap-2"
              >
                {loading ? <span>กำลังค้นหา...</span> : <span>ค้นหา</span>}
              </button>
            </div>
          </form>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-sm space-y-1">
            <p className="font-bold flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              พบข้อผิดพลาด
            </p>
            <p>{errorMessage}</p>
          </div>
        )}

        {hasSearched && !errorMessage && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                ผลการค้นหา {searchTerm && <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>"{searchTerm}"</span>}
              </h2>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors duration-300 ${
                isDarkMode ? 'bg-[#080712] border border-[#8C8C8C] text-slate-300' : 'bg-slate-200 text-slate-700'
              }`}>
                พบ {results.length} รายการ
              </span>
            </div>

            {loading ? (
              <div className={`text-center py-12 rounded-xl border transition-colors duration-300 ${
                isDarkMode ? 'bg-[#080712] border-[#8C8C8C]' : 'bg-white border-slate-200'
              }`}>
                <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>กำลังดึงข้อมูลสิทธิบัตรจากฐานข้อมูล...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {results.map((item) => {
                  const phoneNum = item.phone || item.phone_number || item.tel
                  const userEmail = item.email
                  
                  /* === [ส่วนที่เพิ่ม 1]: ประกาศตัวแปรดึงเลขที่คำขอ === */
                  const appNo = item.application_no || item.application_number || item.app_no

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPatent(item)}
                      className={`group p-5 rounded-xl border shadow-sm hover:shadow-md transition duration-300 space-y-4 cursor-pointer ${
                        isDarkMode 
                          ? 'bg-[#080712] border-[#8C8C8C] hover:border-blue-500' 
                          : 'bg-white border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      <div className={`flex flex-wrap justify-between items-start gap-2 border-b pb-3 transition-colors duration-300 ${
                        isDarkMode ? 'border-[#8C8C8C]' : 'border-slate-100'
                      }`}>
                        
                        {/* === [ส่วนที่แก้ไข 2]: ครอบ div จัด layout และเพิ่มป้ายแสดงเลขที่คำขอ === */}
                        <div className="flex flex-wrap items-baseline gap-2">
                          <div>
                            <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ชื่อผู้ประดิษฐ์ / นักวิจัย</span>
                            <h3 className={`text-base font-bold group-hover:underline ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                              {item.prefix && item.prefix !== 'NULL' ? `${item.prefix} ` : ''}
                              {item.inventor_firstname} {item.inventor_lastname !== 'NULL' ? item.inventor_lastname : ''}
                            </h3>
                          </div>

                          {/* เพิ่ม UI แสดงเลขที่คำขอข้างชื่อ */}
                          {appNo && appNo !== 'NULL' && (
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                              isDarkMode 
                                ? 'bg-slate-800/80 border-slate-700 text-slate-300' 
                                : 'bg-slate-100 border-slate-200 text-slate-600'
                            }`}>
                              เลขที่คำขอ: {appNo}
                            </span>
                          )}
                        </div>
                        {/* ============================================================= */}
                        
                        <div className="flex gap-2">
                          {item.patent_type && item.patent_type !== 'NULL' && (
                            <span className={`border text-xs font-semibold px-2.5 py-1 rounded-md transition-colors duration-300 ${
                              isDarkMode 
                                ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' 
                                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            }`}>
                              {item.patent_type}
                            </span>
                          )}
                          {item.year_received && item.year_received !== 'NULL' && (
                            <span className={`text-xs font-medium px-2 py-1 rounded-md border transition-colors duration-300 ${
                              isDarkMode ? 'bg-[#030202] border-[#8C8C8C] text-slate-300' : 'bg-slate-100 border-transparent text-slate-600'
                            }`}>
                              ปีที่รับเรื่อง: {item.year_received}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        <div>
                          <span className={`text-xs block ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>สังกัดคณะ</span>
                          <p className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                            {item.faculty && item.faculty !== 'NULL' && item.faculty !== '-' ? item.faculty : 'ไม่ได้ระบุ'}
                          </p>
                        </div>
                        <div>
                          <span className={`text-xs block ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ภาควิชา / หน่วยงาน</span>
                          <p className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                            {item.department && item.department !== 'NULL' ? item.department : 'ไม่ได้ระบุ'}
                          </p>
                        </div>
                        <div>
                          <span className={`text-xs block ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ประเภทหน่วยงาน</span>
                          <p className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                            {item.agency_type && item.agency_type !== 'NULL' ? item.agency_type : 'ไม่ได้ระบุ'}
                          </p>
                        </div>
                      </div>

                      <div className={`pt-3 border-t text-xs flex flex-wrap gap-x-6 gap-y-2 ${
                        isDarkMode ? 'border-[#8C8C8C]/50 text-slate-400' : 'border-slate-100 text-slate-500'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>อีเมล: <strong className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>{userEmail && userEmail !== 'NULL' ? userEmail : 'ไม่ได้ระบุ'}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>เบอร์โทรศัพท์: <strong className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>{phoneNum && phoneNum !== 'NULL' ? phoneNum : 'ไม่ได้ระบุ'}</strong></span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className={`text-center py-12 rounded-xl border transition-colors duration-300 space-y-2 ${
                isDarkMode ? 'bg-[#080712] border-[#8C8C8C]' : 'bg-white border-slate-200'
              }`}>
                <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>ไม่พบผลงานสิทธิบัตรตรงกับชื่อที่ค้นหา</p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ลองตรวจสอบการสะกดชื่อ หรือค้นหาด้วยชื่อคำเดียว เช่น "เกรียงไกร"</p>
              </div>
            )}
          </div>
        )}
      </main>

      <PatentModal
        patent={selectedPatent}
        onClose={() => setSelectedPatent(null)}
        isDarkMode={isDarkMode}
      />
    </div>
  )
}