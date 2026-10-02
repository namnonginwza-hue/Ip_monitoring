'use client'

import { PatentItem } from '../page'

interface PatentModalProps {
  patent: PatentItem | null
  onClose: () => void
  isDarkMode?: boolean
}

export default function PatentModal({ patent, onClose, isDarkMode = false }: PatentModalProps) {
  if (!patent) return null

  const title = patent.invention_name || patent.title || patent.new_title || patent.original_title || 'ไม่ระบุชื่อการประดิษฐ์'
  const appNo = patent.application_no || patent.application_number || patent.app_no || 'ไม่ระบุ'
  const appDate = patent.application_date || patent.app_date || patent.filing_date || 'ไม่ระบุ'
  const regDate = patent.registration_date || patent.register_date || 'ไม่ระบุ'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
      <div
        className={`relative w-full max-w-2xl rounded-2xl p-6 shadow-2xl transition-colors duration-300 max-h-[90vh] overflow-y-auto ${
          isDarkMode
            ? 'bg-[#080712] text-slate-100 border border-[#8C8C8C]'
            : 'bg-white text-slate-800 border border-slate-200'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isDarkMode
              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
          aria-label="Close Modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className={`border-b pb-3 mb-5 ${isDarkMode ? 'border-[#8C8C8C]' : 'border-slate-100'}`}>
          <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
            รายละเอียดคำขอและสิทธิบัตร
          </span>
          <h2 className={`text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {patent.prefix && patent.prefix !== 'NULL' ? `${patent.prefix} ` : ''}
            {patent.inventor_firstname} {patent.inventor_lastname !== 'NULL' ? patent.inventor_lastname : ''}
          </h2>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-[#030202] border-[#8C8C8C]/50' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              ชื่อการประดิษฐ์ / ผลงาน
            </span>
            <p className={`text-base font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
              {title}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-3.5 rounded-xl border ${
              isDarkMode ? 'bg-[#030202] border-[#8C8C8C]/50' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`block text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                เลขที่คำขอ
              </span>
              <p className={`font-semibold mt-1 text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                {appNo}
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border ${
              isDarkMode ? 'bg-[#030202] border-[#8C8C8C]/50' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`block text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                วันที่ยื่นคำขอ
              </span>
              <p className={`font-semibold mt-1 text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                {appDate}
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border ${
              isDarkMode ? 'bg-[#030202] border-[#8C8C8C]/50' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`block text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                วันที่รับจดทะเบียน
              </span>
              <p className={`font-semibold mt-1 text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                {regDate}
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-xl border grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs ${
            isDarkMode ? 'bg-[#030202]/50 border-[#8C8C8C]/30 text-slate-300' : 'bg-slate-50/50 border-slate-100 text-slate-600'
          }`}>
            <div>
              <span className="block text-slate-400">ประเภทสิทธิบัตร</span>
              <span className="font-medium">{patent.patent_type || '-'}</span>
            </div>
            <div>
              <span className="block text-slate-400">สังกัดคณะ</span>
              <span className="font-medium">{patent.faculty || '-'}</span>
            </div>
            <div>
              <span className="block text-slate-400">ภาควิชา / หน่วยงาน</span>
              <span className="font-medium">{patent.department || '-'}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  )
}