import Link from 'next/link';
import { getPostById, getCommentsByPostId } from '../../lib/data';
import PostActions from './PostActions';
import CommentSection from './CommentSection';

export default function PostDetail({ params }) {
  const post = getPostById(params.id);
  const comments = getCommentsByPostId(params.id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-6">포스트를 찾을 수 없습니다.</p>
          <Link 
            href="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-md p-8 mb-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>작성자: {post.author}</span>
              <div className="flex space-x-4">
                <span>작성일: {post.createdAt.toLocaleDateString()}</span>
                {post.updatedAt > post.createdAt && (
                  <span>수정일: {post.updatedAt.toLocaleDateString()}</span>
                )}
              </div>
            </div>
            <PostActions postId={post.id} />
          </header>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </article>

        <CommentSection postId={post.id} initialComments={comments} />
      </div>
    </div>
  );
} 