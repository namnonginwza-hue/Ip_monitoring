'use client'

import { PatentItem } from '../page'

interface PatentModalProps {
  patent: PatentItem | null
  onClose: () => void
  isDarkMode?: boolean
}

export default function PatentModal({ patent, onClose, isDarkMode = false }: PatentModalProps) {
  if (!patent) return null

  // ฟังก์ชันช่วยเช็กค่าว่าง หรือ 'NULL' หรือ '-'
  const formatVal = (val: any) => {
    if (val === undefined || val === null || val === '' || val === 'NULL' || val === '-') {
      return 'ไม่มีข้อมูล'
    }
    return String(val)
  }

  // ฟังก์ชันเรนเดอร์ค่าข้อมูลดิบพร้อมฝังลิงก์ URL (ถ้ามี URL จะทำให้ข้อความกดคลิกได้)
  const renderValueWithLink = (textVal: any, urlVal: any) => {
    const text = formatVal(textVal)
    const url = formatVal(urlVal)

    if (text === 'ไม่มีข้อมูล') {
      return <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>ไม่มีข้อมูล</span>
    }

    if (url !== 'ไม่มีข้อมูล' && !url.startsWith('-')) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold break-all inline-flex items-center gap-1"
        >
          {text}
          <svg className="w-3.5 h-3.5 shrink-0 inline opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )
    }

    return <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{text}</span>
  }

  // ฟังก์ชันเรนเดอร์ลิงก์ URL ทั่วไป
  const renderUrlLink = (urlVal: any, label: string) => {
    const val = formatVal(urlVal)
    if (val === 'ไม่มีข้อมูล' || val.startsWith('-')) {
      return <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>ไม่มีข้อมูล</span>
    }
    return (
      <a
        href={val}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium break-all inline-flex items-center gap-1"
      >
        {label} (คลิกเพื่อดูไฟล์)
        <svg className="w-3.5 h-3.5 shrink-0 inline opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
      <div
        className={`relative w-full max-w-3xl rounded-2xl p-6 shadow-2xl transition-colors duration-300 max-h-[90vh] overflow-y-auto ${
          isDarkMode
            ? 'bg-[#080712] text-slate-100 border border-[#8C8C8C]'
            : 'bg-white text-slate-800 border border-slate-200'
        }`}
      >
        {/* ปุ่มปิด Modal */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
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

        {/* ส่วนหัว Modal พร้อมแสดง ปีที่รับ ไว้มุมบนขวา */}
        <div className={`border-b pb-3 mb-6 relative pr-12 ${isDarkMode ? 'border-[#8C8C8C]' : 'border-slate-100'}`}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                รายละเอียดคำขอและสิทธิบัตรรายบุคคล
              </span>
              <h2 className={`text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {patent.prefix && patent.prefix !== 'NULL' ? `${patent.prefix} ` : ''}
                {patent.inventor_firstname} {patent.inventor_lastname !== 'NULL' ? patent.inventor_lastname : ''}
              </h2>
            </div>

            
          </div>
        </div>

        {/* รายการข้อมูลทั้งหมดเรียงตามลำดับอย่างต่อเนื่อง */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">


          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">ปีที่รับงาน</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.year_received)}</span>
          </div>

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">ลักษณะงาน</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.job_nature)}</span>
          </div>

        

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">ชนิดหน่วยงาน</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.agency_type)}</span>
          </div>

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">ภาค/คณะ</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.faculty)}</span>
          </div>

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">หน่วยงาน</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.department)}</span>
          </div>

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">ประเภทสิทธิบัตร</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.patent_type)}</span>
          </div>



         <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">ชื่อการประดิษฐ์ (เดิม)</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              {formatVal(patent.old_title || patent.original_title || patent.invention_name || patent.title)}
            </span>
          </div>


          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">ชื่อการประดิษฐ์ (ใหม่)</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              {formatVal(patent.new_title || patent.original_title || patent.invention_name || patent.title)}
            </span>
          </div>




           <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block mb-1">ไฟล์ข้อมูลดิบลูกค้า(zip)</span>
            {renderUrlLink(patent.raw_data_url_zip, 'ไฟล์ข้อมูลดิบลูกค้า')} 
          </div>
          
          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block mb-1">ไฟล์ต้นเรื่อง(ทป.01/05)</span>
            {renderUrlLink(patent.tp0105_file_url, 'ไฟล์ต้นเรื่อง ทป.01/05')} 
          </div>


             {/* รายการไฟล์แนบที่เหลือ */}
          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block mb-1">ไฟล์งานฉบับยื่นกรม(เมล์)</span>
            {renderUrlLink(patent.submission_file_url_mail, 'ไฟล์งานฉบับยื่นกรม')}  
          </div>

  
          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block mb-1">ไฟล์งานฉบับยื่นกรม(เวิร์ด)</span>
            {renderUrlLink(patent.submission_file_url_word, 'ไฟล์งานฉบับยื่นกรม')}  
          </div>

          
          
    

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block mb-1">ไฟล์ต้นเรื่อง(บันทึกข้อความ)</span>
            {renderUrlLink(patent.memo_file_url, 'ไฟล์บันทึกข้อความ')}
          </div>

          {/* po_number ➔ ฝัง po_file_url */}
          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">เลขที่ใบเสนอราคา</span>
            {renderValueWithLink(patent.po_number, patent.po_file_url)}
          </div>

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">สถานะการชำระค่าบริการ</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.payment_status)}</span>
          </div>

          {/* price ➔ ฝัง payment_receipt_url */}
          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">ราคา</span>
            {renderValueWithLink(patent.price, patent.payment_receipt_url)}
          </div>

          {/* billing_no ➔ ฝัง billing_file_url */}
          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">เลขที่เอกสารส่งของ/ใบเสร็จรับเงิน</span>
            {renderValueWithLink(patent.billing_no, patent.billing_file_url)}
          </div>

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">วันที่ยื่นคำขอ(ส่งเรื่องเข้ากรมฯ)</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.filing_date)}</span>
          </div>

          {/* application_no ➔ ฝัง application_file_url */}
          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">เลขที่คำขอ</span>
            {renderValueWithLink(patent.application_no, patent.application_file_url)}
          </div>

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block mb-1">ไฟล์ส่งคำขอให้ลูกค้า(เมล์)</span>
            {renderUrlLink(patent.application_file_url_mail, 'ไฟล์ส่งคำขอให้ลูกค้า')}
          </div>

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">สถานะคำขอ</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.application_status)}</span>
          </div>

         

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">วันที่คำขอได้รับการจดทะเบียน</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.registration_date)}</span>
          </div>



          {/* cert_number ➔ ฝัง cert_file_url */}
          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">เลขที่หนังสือรับรอง</span>
            {renderValueWithLink(patent.cert_number, patent.cert_file_url)}
          </div>


           <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">เลขที่สิทธิบัตร</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.registration_no)}</span>
          </div>


           <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block mb-1">ไฟล์คำขอที่ได้รับการจดทะเบียน (หนังสือสำคัญ)</span>
            {renderUrlLink(patent.cert_doc_url, 'ไฟล์หนังสือสำคัญ')}
          </div>


          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">เบอร์โทร</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.phone_number)}</span>
          </div>

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">อีเมล์</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.email)}</span>
          </div>

          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#030202] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-xs text-slate-400 block">หมายเหตุ</span>
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{formatVal(patent.remark)}</span>
          </div>

         

       

        </div>

        {/* ปุ่มปิดด้านล่าง */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition shadow-md"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  )
}