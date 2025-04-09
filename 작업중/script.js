document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 기능
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // 스크롤 시 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
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
    
    // 반응형 처리: 화면 크기 변경 시 메뉴 표시 상태 업데이트
    window.addEventListener('resize', function() {
        if (window.innerWidth > 840 && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
});