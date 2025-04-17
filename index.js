// Supabase 클라이언트 초기화
const supabaseUrl = 'https://yyazjydfftyzruirhdzl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5YXpqeWRmZnR5enJ1aXJoZHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDk1NzYsImV4cCI6MjA2MDE4NTU3Nn0.5QwMPdA3Xnh8Nzhv8_I-PBzfOq4ZIhWAtMtQSz_lQX4'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

// 요소 선택
const cardContainer = document.getElementById('card-container')
const paginationContainer = document.getElementById('pagination')

// 페이지네이션 설정
const itemsPerPage = 4
let currentPage = 1
let totalPages = 0
let allPosts = []

// 카드 생성 함수
function createCard(post) {
    return `
        <a href="${post.url}" class="horizontal-card" target="_blank">
            <div class="card-content">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
            </div>
            <div class="card-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </div>
        </a>
    `
}

// 페이지네이션 생성 함수
function createPagination() {
    paginationContainer.innerHTML = ''
    
    // 맨 처음 버튼
    const firstButton = document.createElement('button')
    firstButton.classList.add('pagination-button')
    firstButton.innerHTML = '&laquo;'
    firstButton.addEventListener('click', () => goToPage(1))
    if (currentPage === 1) firstButton.classList.add('disabled')
    paginationContainer.appendChild(firstButton)
    
    // 이전 버튼
    const prevButton = document.createElement('button')
    prevButton.classList.add('pagination-button')
    prevButton.innerHTML = '&lt;'
    prevButton.addEventListener('click', () => goToPage(currentPage - 1))
    if (currentPage === 1) prevButton.classList.add('disabled')
    paginationContainer.appendChild(prevButton)
    
    // 페이지 버튼 (최대 5개)
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, startPage + 4)
    
    if (endPage - startPage < 4 && totalPages > 5) {
        startPage = Math.max(1, endPage - 4)
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button')
        pageButton.classList.add('pagination-button')
        pageButton.textContent = i
        if (i === currentPage) pageButton.classList.add('active')
        pageButton.addEventListener('click', () => goToPage(i))
        paginationContainer.appendChild(pageButton)
    }
    
    // 다음 버튼
    const nextButton = document.createElement('button')
    nextButton.classList.add('pagination-button')
    nextButton.innerHTML = '&gt;'
    nextButton.addEventListener('click', () => goToPage(currentPage + 1))
    if (currentPage === totalPages) nextButton.classList.add('disabled')
    paginationContainer.appendChild(nextButton)
    
    // 맨 끝 버튼
    const lastButton = document.createElement('button')
    lastButton.classList.add('pagination-button')
    lastButton.innerHTML = '&raquo;'
    lastButton.addEventListener('click', () => goToPage(totalPages))
    if (currentPage === totalPages) lastButton.classList.add('disabled')
    paginationContainer.appendChild(lastButton)
}

// 페이지로 이동하는 함수
function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return
    
    currentPage = page
    displayPosts()
    createPagination()
    
    // 페이지 상단으로 부드럽게 스크롤
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// 현재 페이지에 맞는 포스트 표시 함수
function displayPosts() {
    cardContainer.innerHTML = ''
    
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, allPosts.length)
    
    const currentPosts = allPosts.slice(startIndex, endIndex)
    
    if (currentPosts.length === 0) {
        cardContainer.innerHTML = `
            <div class="no-posts">
                <h2>등록된 게시글이 없습니다</h2>
                <p>곧 새로운 소식으로 찾아뵙겠습니다!</p>
            </div>
        `
        paginationContainer.style.display = 'none'
        return
    }
    
    paginationContainer.style.display = totalPages > 1 ? 'flex' : 'none'
    
    currentPosts.forEach(post => {
        cardContainer.innerHTML += createCard(post)
    })
}

// 포스트 로드 함수
async function loadPosts() {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        allPosts = data
        totalPages = Math.ceil(allPosts.length / itemsPerPage)
        
        displayPosts()
        createPagination()
    } catch (error) {
        console.error('Error loading posts:', error)
        cardContainer.innerHTML = `
            <div class="no-posts">
                <h2>게시글을 불러오는 중 오류가 발생했습니다</h2>
                <p>잠시 후 다시 시도해주세요.</p>
            </div>
        `
    }
}

// 페이지 로드 시 포스트 로드
document.addEventListener('DOMContentLoaded', loadPosts) 