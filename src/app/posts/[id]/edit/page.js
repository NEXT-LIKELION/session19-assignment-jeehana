import { getPostById } from '../../../lib/data';
import PostForm from '../../PostForm';
import Link from 'next/link';

export default function EditPost({ params }) {
  const post = getPostById(params.id);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">포스트 수정</h1>
        <PostForm post={post} />
      </div>
    </div>
  );
} 