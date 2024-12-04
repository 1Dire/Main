// 언어 버튼 클릭 이벤트 핸들러
document.querySelectorAll('.language-btn').forEach(button => {
    button.addEventListener('click', function() {
      // 모든 버튼에서 'selected' 클래스 제거
      document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('selected'));
  
      // 클릭된 버튼에 'selected' 클래스 추가
      this.classList.add('selected');
  
      // 선택된 언어 값 가져오기
      const selectedLanguage = this.getAttribute('data-language');
      
      // 언어에 맞는 텍스트 변경
      changeLanguage(selectedLanguage);
    });
  });
  
  // JSON 파일 로드 함수
  function loadTranslations(language) {
    return fetch(`json/i18n/${language}.json`)
      .then(response => response.json())
      .then(data => {
        // 데이터 속성에 맞는 텍스트를 업데이트
        document.querySelectorAll('[data-i18n]').forEach((element) => {
          const key = element.getAttribute('data-i18n');
          element.innerText = data[key] || key; // 텍스트가 없으면 key 그대로 출력
        });
      })
      .catch(err => console.error('Translation file load error:', err)); // 오류 처리
  }
  
  // 언어 변경 함수
  function changeLanguage(language) {
    loadTranslations(language);
  }
  
  // 페이지 로드 시 기본 언어 설정 (한국어)
  document.addEventListener("DOMContentLoaded", () => {
    changeLanguage('ko');
  });
  