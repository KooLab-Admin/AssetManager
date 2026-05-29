// ================================================================
//  Koo Lab 자산관리 - 최종 안정 버전 (2026-05-29)
// ================================================================

const SHEET_ID     = '1k8TvBps4CopjEptBDCeCyYtAYX20SKsUO1wQRgAfBnM';   
const SHEET_NAME   = '자산목록';

const ALLOWED_EMAILS = [
  'koo8.lab.amc@gmail.com', 'nuyo904@gmail.com', 'koo1.lab.amc@gmail.com', 
  'koo4.lab.amc@gmail.com', 'koo3.lab.amc@gmail.com', 'koo10.lab.amc@gmail.com', 
  'koo13.lab.amc@gmail.com', 'koo12.lab.amc@gmail.com', 'paul.kim@poi.so', 
  'koo7.lab.amc@gmail.com', 'koo.lab.amc@gmail.com', 'koolab@poilabs.kr'
];

function doGet(e) {
  try {
    const action = e.parameter.action;
    if (action === 'getAll') return jsonResponse(getAll());
    return jsonResponse({ error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function doPost(e) {
  try {
    const email = Session.getActiveUser().getEmail();
    if (!ALLOWED_EMAILS.includes(email)) throw new Error('권한 없음');
    
    const body = JSON.parse(e.postData.contents);
    // 추가/수정/삭제 로직은 추후 필요시 시트 구조에 맞춰 확장 가능
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function getAll() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const clean = data.slice(1).map(row => {
    const r = {};
    headers.forEach((h, j) => { r[h] = row[j]; });
    
    // 필수 데이터 매핑
    return {
      id:         r['_RowKey'] || r['Asset ID'] || '',
      name:       r['물품명'] || '',
      model:      r['모델명'] || '',
      maker:      r['제조사'] || '',
      manager:    r['사용자/담당자'] || '',
      location:   r['보관위치'] || '',
      cat:        r['자산분류'] || '',
      status:     r['데이터상태'] || '정상',
      price:      r['금액'] || '',
      sn:         r['물품번호(S/N)'] || '',
      hosp:       r['병원자산코드'] || '',
      date:       r['구입시기(FU)'] instanceof Date ? r['구입시기(FU)'].toISOString().slice(0,10) : String(r['구입시기(FU)']||''),
      approval:   r['approval_status'] || 'Approved'
    };
  }).filter(a => a.manager && String(a.manager).trim() !== '' && String(a.manager).trim() !== '-');

  return { success: true, data: clean, count: clean.length };
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
