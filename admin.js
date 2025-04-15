// Supabase 클라이언트 초기화
const supabaseUrl = 'https://yyazjydfftyzruirhdzl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5YXpqeWRmZnR5enJ1aXJoZHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDk1NzYsImV4cCI6MjA2MDE4NTU3Nn0.5QwMPdA3Xnh8Nzhv8_I-PBzfOq4ZIhWAtMtQSz_lQX4';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 게시글 목록 조회 함수
async function fetchPosts() {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('게시글 조회 중 오류:', error);
        return [];
    }
}

// 게시글 작성 함수
async function createPost(title, category, content) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .insert([
                { title, category, content }
            ]);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('게시글 작성 중 오류:', error);
        throw error;
    }
}

// 게시글 수정 함수
async function updatePost(id, title, category, content) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .update({ title, category, content, updated_at: new Date() })
            .eq('id', id);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('게시글 수정 중 오류:', error);
        throw error;
    }
}

// 게시글 삭제 함수
async function deletePost(id) {
    try {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) throw error;
    } catch (error) {
        console.error('게시글 삭제 중 오류:', error);
        throw error;
    }
}

// 게시글 목록 표시 함수
async function displayPosts() {
    const posts = await fetchPosts();
    const tbody = document.querySelector('#postsTable tbody');
    tbody.innerHTML = '';

    posts.forEach(post => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.category}</td>
            <td>${new Date(post.created_at).toLocaleString()}</td>
            <td>0</td>
            <td>게시됨</td>
            <td>
                <button class="edit-btn" data-id="${post.id}">수정</button>
                <button class="delete-btn" data-id="${post.id}">삭제</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // 수정/삭제 버튼 이벤트 리스너 추가
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            const post = posts.find(p => p.id === id);
            if (post) {
                // 수정 모달 표시
                const title = prompt('제목:', post.title);
                const category = prompt('카테고리:', post.category);
                const content = prompt('내용:', post.content);
                
                if (title && category && content) {
                    try {
                        await updatePost(id, title, category, content);
                        await displayPosts();
                        alert('게시글이 수정되었습니다.');
                    } catch (error) {
                        alert('게시글 수정 중 오류가 발생했습니다.');
                    }
                }
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            if (confirm('정말 삭제하시겠습니까?')) {
                try {
                    await deletePost(id);
                    await displayPosts();
                    alert('게시글이 삭제되었습니다.');
                } catch (error) {
                    alert('게시글 삭제 중 오류가 발생했습니다.');
                }
            }
        });
    });
}

// 새 글 작성 버튼 이벤트 리스너
document.querySelector('.new-post-btn').addEventListener('click', async () => {
    const title = prompt('제목을 입력하세요:');
    if (!title) return;

    const category = prompt('카테고리를 입력하세요:');
    if (!category) return;

    const content = prompt('내용을 입력하세요:');
    if (!content) return;

    try {
        await createPost(title, category, content);
        await displayPosts();
        alert('게시글이 작성되었습니다.');
    } catch (error) {
        alert('게시글 작성 중 오류가 발생했습니다.');
    }
});

// 검색 기능
document.querySelector('.search-input').addEventListener('input', async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const posts = await fetchPosts();
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.category.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.querySelector('#postsTable tbody');
    tbody.innerHTML = '';

    filteredPosts.forEach(post => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.category}</td>
            <td>${new Date(post.created_at).toLocaleString()}</td>
            <td>0</td>
            <td>게시됨</td>
            <td>
                <button class="edit-btn" data-id="${post.id}">수정</button>
                <button class="delete-btn" data-id="${post.id}">삭제</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
});

// 페이지 로드 시 게시글 목록 표시
document.addEventListener('DOMContentLoaded', async () => {
    await displayPosts();
});

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
    
    // 통계 보기 버튼
    const statsBtn = document.querySelector('.admin-actions .admin-btn:not(.primary)');
    
    statsBtn.addEventListener('click', function() {
        alert('통계 보기 기능은 준비 중입니다.');
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