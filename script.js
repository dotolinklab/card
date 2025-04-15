document.addEventListener('DOMContentLoaded', function() {
    // 로딩 오버레이 요소
    const loadingOverlay = document.getElementById('loading-overlay');
    const redirectCounter = document.getElementById('redirect-counter');
    
    // 모든 외부 링크에 대한 이벤트 리스너 추가
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.href;
            
            // 로딩 오버레이 표시
            loadingOverlay.style.display = 'flex';
            
            // 카운트다운 시작
            let seconds = 1;
            redirectCounter.textContent = `${seconds}초 후 자동으로 이동합니다`;
            
            const countdown = setInterval(() => {
                seconds--;
                redirectCounter.textContent = `${seconds}초 후 자동으로 이동합니다`;
                
                if (seconds <= 0) {
                    clearInterval(countdown);
                    loadingOverlay.style.display = 'none';
                    window.location.href = targetUrl;
                }
            }, 1000);
        });
    });

    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = '#fff';
        }
    });
}); 