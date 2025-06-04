import Link from 'next/link';
import { getAllPosts } from './lib/data';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Next.js 블로그</h1>
          <p className="text-gray-600 mb-6">포스트와 댓글 기능이 있는 블로그입니다</p>
          <Link 
            href="/posts/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            새 포스트 작성
          </Link>
        </header>

        <main>
          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">아직 포스트가 없습니다.</p>
            ) : (
              posts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    <Link 
                      href={`/posts/${post.id}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 && '...'}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>작성자: {post.author}</span>
                    <span>{post.createdAt.toLocaleDateString()}</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}