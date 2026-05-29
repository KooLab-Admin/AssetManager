# Koo Lab 자산관리 시스템 인수인계서 (2026-05-29)

본 문서는 Google Apps Script와 GitHub Pages를 결합한 연구실 자산관리 시스템의 현재 설정 상태와 운영 방법을 설명합니다.

## 🕒 일시
- **최종 업데이트**: 2026년 5월 29일 오후 4시 30분

## 🏗️ 시스템 아키텍처
- **DB**: Google Sheets ([자산목록](https://docs.google.com/spreadsheets/d/1k8TvBps4CopjEptBDCeCyYtAYX20SKsUO1wQRgAfBnM/edit))
- **Backend**: Google Apps Script (Web App API)
- **Frontend**: GitHub Pages (Static HTML/JS)

## 🔗 주요 링크
- **관리 웹페이지**: [https://koolab-admin.github.io/AssetManager/](https://koolab-admin.github.io/AssetManager/)
- **API URL**: `https://script.google.com/macros/s/AKfycbx6fihmm_iLpQV2tvgHHxBZX7JiOGqwvM6g9lqxAMFIFuya8gM-AJ6t_nGJGQ4Ykm0v/exec`

## 🛠️ 주요 기능 및 설정
1. **담당자 필터링**: M열('사용자/담당자')에 데이터가 있는 항목만 웹페이지에 노출됩니다.
2. **테마 전환**: 우측 상단 버튼을 통해 다크 모드와 브라이트(Bright) 모드를 전환할 수 있습니다. (설정 유지됨)
3. **보안**: 데이터 조회는 공개되어 있으나, 추가/수정/삭제 시에는 `ALLOWED_EMAILS`에 등록된 연구실 멤버 계정 로그인이 필요합니다.

## 📝 유지보수 가이드
### 1. 시트 데이터 수정
- 스프레드시트의 '사용자/담당자' 칸을 채우면 웹페이지에 자동으로 나타납니다.
- 지우면 웹페이지에서 사라집니다.

### 2. 코드 수정 및 재배포
- `Code.gs` 수정 시, 구글 앱스 스크립트 편집기에서 **[배포] -> [배포 관리] -> [수정] -> [새 버전]**을 반드시 선택해야 웹페이지에 반영됩니다.

### 3. 웹페이지 UI 수정
- 로컬의 `index.html` 파일을 수정 후 GitHub에 `push` 하면 약 1~2분 뒤 자동 반영됩니다.

## ⚠️ 미결 사항
- **사진 연동**: 현재 구글 드라이브 보안 정책 및 시트 내 파일 경로 매핑 문제로 일시 보류 상태입니다. 필요 시 `Code.gs`의 이미지 변환 로직을 다시 검토해야 합니다.

---
**Koo Lab 자산관리 시스템 - 담당자: 주인애**
