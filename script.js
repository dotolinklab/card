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
            let seconds = 3;
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

    // 햄버거 메뉴 토글 버튼 클릭 시 Supabase로 연결
    const menuToggle = document.getElementById('menu-toggle');
    
    // 메뉴 토글 이벤트 - Supabase로 연결
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // 이벤트 버블링 방지
        
        // Supabase 대시보드 URL - 실제 Supabase 프로젝트 URL로 변경 필요
        const supabaseUrl = 'https://app.supabase.com/dashboard';
        
        // 로딩 오버레이 표시
        loadingOverlay.style.display = 'flex';
        
        // 카운트다운 시작
        let seconds = 3;
        redirectCounter.textContent = `${seconds}초 후 Supabase로 이동합니다`;
        
        const countdown = setInterval(() => {
            seconds--;
            redirectCounter.textContent = `${seconds}초 후 Supabase로 이동합니다`;
            
            if (seconds <= 0) {
                clearInterval(countdown);
                loadingOverlay.style.display = 'none';
                window.location.href = supabaseUrl;
            }
        }, 1000);
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

    // 가로형 카드 클릭 이벤트
    const horizontalCards = document.querySelectorAll('.horizontal-card');
    horizontalCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // 링크 기능을 유지하면서 클릭 이벤트 로깅
            console.log('카드 클릭됨: ' + this.querySelector('h3').textContent);
        });
    });

    // 대출 카드 클릭 이벤트
    const loanItems = document.querySelectorAll('.loan-link-item');
    loanItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // 링크 기능을 유지하면서 클릭 이벤트 로깅
            console.log('대출 정보 클릭됨: ' + this.querySelector('h3').textContent);
        });
    });
}); 