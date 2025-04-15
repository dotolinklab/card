// Supabase 클라이언트 초기화
const supabaseUrl = 'https://yyazjydfftyzruirhdzl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5YXpqeWRmZnR5enJ1aXJoZHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDk1NzYsImV4cCI6MjA2MDE4NTU3Nn0.5QwMPdA3Xnh8Nzhv8_I-PBzfOq4ZIhWAtMtQSz_lQX4';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function() {
    // 햄버거 버튼 클릭 시 Supabase 대시보드로 이동
    const menuToggle = document.getElementById('menu-toggle');
    
    menuToggle.addEventListener('click', function() {
        window.open('https://app.supabase.com/dashboard', '_blank');
    });
    
    // 메뉴 활성화
    const menuItems = document.querySelectorAll('.admin-menu li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.admin-menu li.active').classList.remove('active');
            this.classList.add('active');
        });
    });
    
    // 새 글 작성 버튼
    const newPostBtn = document.querySelector('.admin-btn.primary');
    
    newPostBtn.addEventListener('click', function() {
        alert('새 글 작성 기능은 준비 중입니다.');
    });
    
    // 통계 보기 버튼
    const statsBtn = document.querySelector('.admin-actions .admin-btn:not(.primary)');
    
    statsBtn.addEventListener('click', function() {
        alert('통계 보기 기능은 준비 중입니다.');
    });
    
    // 테이블 검색 기능
    const searchForm = document.querySelector('.table-actions');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.table-actions .admin-btn');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.admin-table tbody tr');
        
        rows.forEach(row => {
            const title = row.querySelector('.post-title').textContent.toLowerCase();
            const category = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // 테이블 행 수정/삭제 버튼
    const editButtons = document.querySelectorAll('.table-btn.edit');
    const deleteButtons = document.querySelectorAll('.table-btn.delete');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const postId = row.querySelector('td:first-child').textContent;
            const postTitle = row.querySelector('.post-title').textContent;
            
            alert(`게시물 ${postId}를 수정합니다.`);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const postId = row.querySelector('td:first-child').textContent;
            const postTitle = row.querySelector('.post-title').textContent;
            
            if (confirm(`정말 삭제하시겠습니까? (ID: ${postId})`)) {
                row.remove();
            }
        });
    });
    
    // 페이지네이션
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector('.pagination-btn.active').classList.remove('active');
            this.classList.add('active');
        });
    });
}); 