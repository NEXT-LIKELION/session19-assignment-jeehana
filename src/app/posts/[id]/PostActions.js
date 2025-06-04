'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PostActions({ postId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('정말로 이 포스트를 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        throw new Error('삭제에 실패했습니다.');
      }
    } catch (error) {
      alert('포스트 삭제 중 오류가 발생했습니다.');
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex space-x-2">
      <Link
        href={`/posts/${postId}/edit`}
        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
      >
        수정
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
      >
        {isDeleting ? '삭제 중...' : '삭제'}
      </button>
    </div>
  );
} 