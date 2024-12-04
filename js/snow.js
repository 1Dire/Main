// 눈송이를 랜덤하게 화면에 생성하는 함수
function createSnowflakes() {
    const snowflakeCount = 50; // 눈송이 개수
    for (let i = 0; i < snowflakeCount; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      
      // 랜덤한 위치, 크기, 속도를 설정
      snowflake.style.left = `${Math.random() * 100}vw`;  // 화면 너비 기준으로 랜덤 위치
      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; // 랜덤한 떨어지는 속도
      snowflake.style.animationDelay = `${Math.random() * 5}s`; // 랜덤한 시작 지연 시간
      
      // 눈송이 크기를 랜덤으로 설정
      const size = Math.random() * 5 + 5; // 5px에서 10px 사이
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
  
      // body에 추가하여 눈송이가 화면에 나타나도록
      document.body.appendChild(snowflake);
    }
  }
  
  // 페이지 로드 시 눈송이 효과 시작
  window.onload = () => {
    createSnowflakes();
  };



