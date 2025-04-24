// Supabase 클라이언트 초기화
const supabaseUrl = 'https://yyazjydfftyzruirhdzl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5YXpqeWRmZnR5enJ1aXJoZHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDk1NzYsImV4cCI6MjA2MDE4NTU3Nn0.5QwMPdA3Xnh8Nzhv8_I-PBzfOq4ZIhWAtMtQSz_lQX4'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

// 카드 컨테이너 요소
const cardContainer = document.getElementById('card-container')

// 카드 생성 함수
function createCard(post) {
    return `
        <a href="${post.url}" class="horizontal-card">
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

// 포스트 로드 함수
async function loadPosts() {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        // 카드 컨테이너 초기화
        cardContainer.innerHTML = ''

        // 각 포스트에 대해 카드 생성
        data.forEach(post => {
            cardContainer.innerHTML += createCard(post)
        })
    } catch (error) {
        console.error('Error loading posts:', error)
    }
}

// 페이지 로드 시 포스트 로드
document.addEventListener('DOMContentLoaded', loadPosts) 