document.addEventListener('DOMContentLoaded', function() {
    // 햄버거 버튼 클릭 시 Supabase 연결
    const menuToggle = document.getElementById('menu-toggle');
    
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Supabase URL - 실제 Supabase 프로젝트 URL로 변경 필요
        const supabaseUrl = 'https://app.supabase.com/dashboard';
        
        // 새 창에서 Supabase 대시보드 열기
        window.open(supabaseUrl, '_blank');
    });
    
    // 메뉴 활성화 기능
    const menuItems = document.querySelectorAll('.admin-menu li a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 현재 활성화된 메뉴 항목에서 active 클래스 제거
            document.querySelector('.admin-menu li.active').classList.remove('active');
            
            // 클릭한 메뉴 항목의 부모 li에 active 클래스 추가
            this.parentNode.classList.add('active');
            
            // 해시 링크인 경우 새로고침 방지
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // 여기에 해당 섹션 표시 로직 추가 (현재는 구현하지 않음)
                console.log('메뉴 클릭:', this.textContent);
            }
        });
    });
    
    // 새 글 작성 버튼
    const newPostBtn = document.querySelector('.admin-btn.primary');
    
    newPostBtn.addEventListener('click', function() {
        alert('새 글 작성 기능은 개발 중입니다.');
    });
    
    // 통계 보기 버튼
    const statsBtn = document.querySelector('.admin-actions .admin-btn:not(.primary)');
    
    statsBtn.addEventListener('click', function() {
        alert('통계 기능은 개발 중입니다.');
    });
    
    // 테이블 검색 기능
    const searchForm = document.querySelector('.table-actions');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.table-actions .admin-btn');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchTerm = searchInput.value.trim().toLowerCase();
        const tableRows = document.querySelectorAll('.admin-table tbody tr');
        
        if (!searchTerm) {
            // 검색어가 없으면 모든 행 표시
            tableRows.forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        tableRows.forEach(row => {
            const title = row.querySelector('.post-title').textContent.toLowerCase();
            const category = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    searchBtn.addEventListener('click', function() {
        searchForm.dispatchEvent(new Event('submit'));
    });
    
    // 테이블 행 버튼 이벤트
    const editButtons = document.querySelectorAll('.table-btn.edit');
    const deleteButtons = document.querySelectorAll('.table-btn.delete');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const postId = row.querySelector('td:first-child').textContent;
            const postTitle = row.querySelector('.post-title').textContent;
            
            alert(`"${postTitle}" 게시물 수정 페이지로 이동합니다. (ID: ${postId})`);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const postId = row.querySelector('td:first-child').textContent;
            const postTitle = row.querySelector('.post-title').textContent;
            
            if (confirm(`"${postTitle}" 게시물을 정말 삭제하시겠습니까? (ID: ${postId})`)) {
                // 여기에 삭제 API 요청 로직 추가
                row.style.opacity = '0.5';
                row.style.pointerEvents = 'none';
                
                // 임시 효과 (실제로는 API 요청 후 삭제)
                setTimeout(() => {
                    row.remove();
                }, 1000);
            }
        });
    });
    
    // 페이지네이션 버튼
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            document.querySelector('.pagination-btn.active').classList.remove('active');
            this.classList.add('active');
            
            // 여기에 페이지 데이터 로드 로직 추가
            console.log('페이지 이동:', this.textContent);
        });
    });
}); 