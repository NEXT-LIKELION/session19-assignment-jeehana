# Next.js 블로그 앱

포스트 작성, 수정, 삭제 및 댓글 기능을 제공하는 Next.js 13 App Router 기반 블로그 애플리케이션입니다.

## 주요 기능

### 📝 포스트 관리
- **포스트 목록 조회**: 모든 포스트를 최신순으로 표시
- **포스트 상세 보기**: 개별 포스트 내용과 댓글 표시
- **포스트 작성**: 새로운 포스트 생성
- **포스트 수정**: 기존 포스트 내용 편집
- **포스트 삭제**: 포스트 및 관련 댓글 삭제

### 💬 댓글 시스템
- **댓글 작성**: 포스트에 댓글 추가
- **댓글 수정**: 댓글 내용 편집
- **댓글 삭제**: 댓글 제거
- **댓글 목록**: 포스트별 댓글 표시

### 🎨 UI/UX
- **Tailwind CSS**: 모던하고 반응형 디자인
- **직관적 인터페이스**: 사용자 친화적 UI
- **실시간 피드백**: 로딩 상태 및 오류 처리

## 기술 스택

- **Framework**: Next.js 15.3.2 (App Router)
- **UI**: React 19, Tailwind CSS
- **언어**: JavaScript
- **스타일링**: Tailwind CSS, PostCSS

## CSR vs SSR 렌더링 전략 분석

### 🖥️ SSR (Server-Side Rendering) 사용 구간

#### 1. 홈페이지 (`/`)
**사용 이유:**
- **SEO 최적화**: 검색 엔진이 포스트 목록을 크롤링할 수 있음
- **초기 로딩 성능**: 포스트 목록이 서버에서 미리 렌더링되어 빠른 첫 화면 표시
- **캐싱 효율성**: 정적 데이터로 Next.js의 캐싱 전략 활용 가능

```javascript
// SSR - 서버에서 데이터 fetch 후 렌더링
export default function Home() {
  const posts = getAllPosts(); // 서버에서 실행
  return (
    // 서버에서 HTML 생성
  );
}
```

#### 2. 포스트 상세 페이지 (`/posts/[id]`)
**사용 이유:**
- **SEO 최적화**: 개별 포스트가 검색 결과에 표시될 수 있음
- **초기 컨텐츠 표시**: 포스트 내용과 댓글이 즉시 표시됨
- **성능 향상**: 서버에서 데이터를 미리 준비하여 클라이언트 요청 최소화

```javascript
// SSR - 포스트와 댓글 데이터를 서버에서 준비
export default function PostDetail({ params }) {
  const post = getPostById(params.id);
  const comments = getCommentsByPostId(params.id);
  // 서버에서 HTML 생성 후 클라이언트로 전송
}
```

#### 3. 포스트 수정 페이지 (`/posts/[id]/edit`)
**사용 이유:**
- **초기 폼 데이터**: 기존 포스트 데이터를 서버에서 미리 로드
- **빠른 페이지 전환**: 수정할 데이터가 즉시 표시됨

### 🖱️ CSR (Client-Side Rendering) 사용 구간

#### 1. 포스트 작업 컴포넌트 (`PostActions`)
**사용 이유:**
- **실시간 상호작용**: 수정/삭제 버튼 클릭 시 즉시 반응
- **상태 관리**: 로딩 상태, 확인 다이얼로그 등 동적 UI 처리
- **API 호출**: 클라이언트에서 직접 REST API 호출

```javascript
'use client'; // CSR 명시
const handleDelete = async () => {
  // 클라이언트에서 API 호출 및 상태 업데이트
};
```

#### 2. 댓글 섹션 (`CommentSection`)
**사용 이유:**
- **실시간 CRUD**: 댓글 추가/수정/삭제 시 즉시 UI 업데이트
- **폼 상태 관리**: 댓글 작성/수정 폼의 복잡한 상태 처리
- **낙관적 업데이트**: API 응답 전에 UI 먼저 업데이트로 빠른 반응성

```javascript
'use client'; // CSR 명시
const [comments, setComments] = useState(initialComments);
// 클라이언트 상태로 댓글 실시간 관리
```

#### 3. 포스트 폼 (`PostForm`)
**사용 이유:**
- **폼 검증**: 실시간 입력 검증 및 피드백
- **상태 관리**: 입력 필드의 복잡한 상태 처리
- **사용자 경험**: 타이핑 중 즉시 반응하는 인터랙티브 폼

```javascript
'use client'; // CSR 명시
const [form, setForm] = useState({ title: '', content: '', author: '' });
// 폼 상태를 클라이언트에서 관리
```

### 🔄 하이브리드 접근법의 장점

1. **최적의 성능**: 
   - 초기 로딩은 SSR로 빠르게
   - 이후 상호작용은 CSR로 반응성 확보

2. **SEO 친화적**:
   - 중요한 컨텐츠(포스트, 목록)는 서버 렌더링
   - 검색 엔진 최적화 달성

3. **사용자 경험**:
   - 빠른 초기 로딩 + 부드러운 상호작용
   - 로딩 없는 실시간 업데이트

4. **개발 효율성**:
   - Next.js App Router의 자동 코드 분할
   - 서버/클라이언트 컴포넌트 혼용으로 최적화

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

## 프로젝트 구조

```
src/
├── app/
│   ├── api/                 # API 라우트
│   │   ├── posts/          # 포스트 CRUD API
│   │   └── comments/       # 댓글 CRUD API
│   ├── posts/              # 포스트 관련 페이지
│   │   ├── [id]/          # 포스트 상세/수정
│   │   ├── new/           # 새 포스트 작성
│   │   └── PostForm.js    # 포스트 폼 컴포넌트
│   ├── lib/
│   │   └── data.js        # 데이터 관리 함수
│   ├── globals.css        # 전역 스타일 (Tailwind)
│   ├── layout.js          # 루트 레이아웃
│   └── page.js            # 홈페이지
```

## API 엔드포인트

### 포스트 API
- `GET /api/posts` - 포스트 목록 조회
- `POST /api/posts` - 새 포스트 작성
- `GET /api/posts/[id]` - 포스트 상세 조회
- `PUT /api/posts/[id]` - 포스트 수정
- `DELETE /api/posts/[id]` - 포스트 삭제

### 댓글 API
- `GET /api/comments?postId=[id]` - 댓글 목록 조회
- `POST /api/comments` - 새 댓글 작성
- `PUT /api/comments/[id]` - 댓글 수정
- `DELETE /api/comments/[id]` - 댓글 삭제
