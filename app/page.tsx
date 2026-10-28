'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Noto_Sans_Thai } from 'next/font/google'
import { supabase } from '../lib/supabaseClient'
import PatentModal from './components/PatentModal'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

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
  phone_number?: string
  application_date?: string
  app_date?: string
  filing_date?: string
  draft_status?: string
  application_no?: string
  application_number?: string
  app_no?: string
  registration_no?: string
  register_no?: string
  cert_number?: string
  title?: string
  new_title?: string
  original_title?: string
  invention_name?: string
  registration_date?: string
  register_date?: string
  [key: string]: any
}

export default function PatentSearchPage() {
  const [searchField, setSearchField] = useState('year_received') // ฟิลด์ที่เลือกจาก Dropdown
  const [keyword, setKeyword] = useState('') // คำค้นหา
  
  const [results, setResults] = useState<PatentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedPatent, setSelectedPatent] = useState<PatentItem | null>(null)

  // กำหนดข้อความ Placeholder ตามฟิลด์ที่เลือก
  const getPlaceholder = () => {
    switch (searchField) {
      case 'year_received':
        return 'เช่น 69, 68...'
      case 'inventor':
        return 'เช่น วลีพร, พัชราภรณ์...'
      case 'faculty_dept':
        return 'เช่น วิศวกรรมเครื่องกล มก....'
      case 'patent_type':
        return 'เช่น อนุสิทธิบัตร, ลิขสิทธิ์...'
      case 'draft_status':
        return 'เช่น รอยกร่าง, ร่างแล้ว...'
      default:
        return 'ป้อนคำที่ต้องการค้นหา'
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const cleanKeyword = keyword.trim()
    if (!cleanKeyword) return

    setLoading(true)
    setHasSearched(true)
    setErrorMessage(null)

    try {
      let query = supabase.from('ip_mornitoring_28_10_69').select('*')

      if (searchField === 'year_received') {
        query = query.eq('year_received', cleanKeyword)
      } else if (searchField === 'inventor') {
        query = query.or(`inventor_firstname.ilike.%${cleanKeyword}%,inventor_lastname.ilike.%${cleanKeyword}%`)
      } else if (searchField === 'faculty_dept') {
        query = query.or(`faculty.ilike.%${cleanKeyword}%,department.ilike.%${cleanKeyword}%`)
      } else if (searchField === 'patent_type') {
        query = query.ilike('patent_type', `%${cleanKeyword}%`)
      } else if (searchField === 'draft_status') {
        query = query.ilike('draft_status', `%${cleanKeyword}%`)
      }

      const { data, error } = await query

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
    <div className={`${notoSansThai.className} min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#030202] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Header */}
      <header className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-8 px-4 shadow-md transition-colors duration-300">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-4 md:top-6 md:right-8 p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all focus:outline-none z-20"
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

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 px-4">
          <div className="shrink-0 bg-white p-2 rounded-full shadow-lg border-2 border-white/20 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center overflow-hidden">
            <Image 
              src="/vip-logo.png" 
              alt="VIP Logo" 
              width={110} 
              height={110} 
              className="object-contain w-full h-full rounded-full"
              priority
            />
          </div>

          <div className="text-center md:text-left space-y-2 flex-1">
            <span className="bg-blue-600/40 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              ฐานข้อมูล บริษัท วีไอพี โปรดักส์ แอนด์ เซอร์วิส จำกัด
            </span>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              ระบบค้นหาผลงานด้านทรัพย์สินทางปัญญา
            </h1>
            <p className="text-blue-200 text-sm md:text-base">
              ข้อมูลผลงานสิทธิบัตรการประดิษฐ์ / อนุสิทธิบัตร / สิทธิบัตรการออกเเบบผลิตภัณฑ์ / เครื่องหมายการค้า / สิขสิทธิ์
            </p>
            <span className=" text-white-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Tel : 063-416-6884,063-416-6802  E-mail : vipteam365@gmail.com,vippatent365@gmail.com Line : @vipteam365
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* Modern Combined Search Bar */}
        <div className="space-y-1.5">
          <div className={`p-2 rounded-2xl shadow-md border transition-colors duration-300 ${
            isDarkMode ? 'bg-[#080712] border-[#8C8C8C]' : 'bg-white border-slate-200'
          }`}>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-2">
              
              {/* Dropdown เลือกหัวข้อการค้นหา */}
              <div className={`w-full md:w-56 shrink-0 border-b md:border-b-0 md:border-r ${isDarkMode ? 'border-[#8C8C8C]' : 'border-slate-200'} px-3 py-2`}>
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                  className={`w-full bg-transparent focus:outline-none text-sm font-semibold cursor-pointer ${
                    isDarkMode ? 'text-white' : 'text-slate-700'
                  }`}
                >
                  <option value="year_received" className={isDarkMode ? 'bg-[#080712] text-white' : 'bg-white text-slate-800'}>ปีที่รับงาน</option>
                  <option value="inventor" className={isDarkMode ? 'bg-[#080712] text-white' : 'bg-white text-slate-800'}>ชื่อผู้ประดิษฐ์ หรือ นามสกุล</option>
                  <option value="faculty_dept" className={isDarkMode ? 'bg-[#080712] text-white' : 'bg-white text-slate-800'}>ภาค/คณะ หรือ หน่วยงาน</option>
                  <option value="patent_type" className={isDarkMode ? 'bg-[#080712] text-white' : 'bg-white text-slate-800'}>ประเภทสิทธิบัตร</option>
                  <option value="draft_status" className={isDarkMode ? 'bg-[#080712] text-white' : 'bg-white text-slate-800'}>สถานะการทำงาน</option>
                </select>
              </div>

              {/* ช่องกรอกคำค้นหา */}
              <div className="flex-1 w-full px-3 py-2">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={getPlaceholder()}
                  className={`w-full bg-transparent focus:outline-none text-sm ${
                    isDarkMode ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* ปุ่มค้นหา */}
              <div className="w-full md:w-auto shrink-0 p-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-[#a32d1d] hover:bg-[#8b2416] text-white font-medium px-8 py-3 rounded-xl transition duration-200 disabled:opacity-50 text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
                </button>
              </div>

            </form>
          </div>

          {/* ข้อความกำกับด้านล่างซ้ายของช่อง search */}
          <div className="px-1">
            <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              สืบค้นจากทุกข้อมูลหลัก: ปีที่รับงาน, ชื่อผู้ประดิษฐ์ หรือ นามสกุล, ภาค/คณะ หรือ หน่วยงาน, ประเภทสิทธิบัตร, สถานะการทำงาน
            </span>
          </div>
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
                ผลการค้นหา
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
                  const phoneNum = item.phone_number
                  const userEmail = item.email
                  
                  const rawAppNo = item.application_no || item.application_number || item.app_no
                  const appNoVal = (!rawAppNo || rawAppNo === 'NULL' || rawAppNo === '-') ? 'ไม่มี' : rawAppNo

                  const rawRegNo = item.registration_no || item.register_no
                  const regNoVal = (!rawRegNo || rawRegNo === 'NULL' || rawRegNo === '-') ? 'ไม่มี' : rawRegNo

                  const rawStatus = item.draft_status
                  const statusVal = (!rawStatus || rawStatus === 'NULL' || rawStatus === '-') ? 'ไม่มี' : rawStatus
                  
                  const inventionTitle = item.new_title || item.original_title || item.invention_name || item.title

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
                      {/* ส่วนหัว Card */}
                      <div className={`flex flex-wrap justify-between items-start gap-2 border-b pb-3 transition-colors duration-300 ${
                        isDarkMode ? 'border-[#8C8C8C]' : 'border-slate-100'
                      }`}>
                        <div className="space-y-1">
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            ชื่อผู้ประดิษฐ์ / นักวิจัย
                          </span>
                          <h3 className={`text-base font-bold group-hover:underline ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                            {item.prefix && item.prefix !== 'NULL' ? `${item.prefix} ` : ''}
                            {item.inventor_firstname} {item.inventor_lastname !== 'NULL' ? item.inventor_lastname : ''}
                          </h3>

                          {/* ภาควิชา/หน่วยงาน และ สังกัดคณะ ด้านบน */}
                          <div className={`text-xs flex flex-wrap gap-x-3 gap-y-1 pt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {item.department && item.department !== 'NULL' && item.department !== '-' && (
                              <span>ภาควิชา/หน่วยงาน: <strong className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{item.department}</strong></span>
                            )}
                            {item.faculty && item.faculty !== 'NULL' && item.faculty !== '-' && (
                              <span>สังกัดคณะ: <strong className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{item.faculty}</strong></span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 shrink-0">
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

                      {/* ชื่อการประดิษฐ์ */}
                      <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        <span className={`text-xs block ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ชื่อการประดิษฐ์</span>
                        <p className={`font-semibold text-base ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                          {inventionTitle && inventionTitle !== 'NULL' && inventionTitle !== '-' ? inventionTitle : 'ไม่ได้ระบุ'}
                        </p>
                      </div>

                      {/* ส่วนท้าย Card */}
                      <div className={`pt-3 border-t text-xs flex flex-wrap items-center justify-between gap-3 ${
                        isDarkMode ? 'border-[#8C8C8C]/50 text-slate-400' : 'border-slate-100 text-slate-500'
                      }`}>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
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

                        <div className="flex flex-wrap items-center gap-2 ml-auto">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                            isDarkMode 
                              ? 'bg-amber-950/80 border-amber-800 text-amber-200' 
                              : 'bg-amber-50 border-amber-200 text-amber-800'
                          }`}>
                            สถานะการทำงาน : {statusVal}
                          </span>

                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                            isDarkMode 
                              ? 'bg-indigo-950/80 border-indigo-800 text-indigo-200' 
                              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                          }`}>
                            เลขที่คำขอ : {appNoVal}
                          </span>

                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                            isDarkMode 
                              ? 'bg-slate-800/80 border-slate-700 text-slate-300' 
                              : 'bg-slate-100 border-slate-200 text-slate-600'
                          }`}>
                            เลขที่สิทธิบัตร : {regNoVal}
                          </span>
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
                <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>ไม่พบผลงานสิทธิบัตรตามเงื่อนไขที่ค้นหา</p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ลองตรวจสอบคำค้นหา หรือเปลี่ยนหัวข้อการค้นหาใหม่</p>
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