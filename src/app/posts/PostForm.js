'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PostForm({ post = null }) {
  const [form, setForm] = useState({
    title: post?.title || '',
    content: post?.content || '',
    author: post?.author || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isEditing = !!post;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.author.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/posts/${post.id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/posts/${result.id}`);
        router.refresh();
      } else {
        throw new Error(`포스트 ${isEditing ? '수정' : '작성'}에 실패했습니다.`);
      }
    } catch (error) {
      alert(`포스트 ${isEditing ? '수정' : '작성'} 중 오류가 발생했습니다.`);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="포스트 제목을 입력하세요"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            작성자
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="작성자명을 입력하세요"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="12"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="포스트 내용을 입력하세요"
            required
          />
        </div>

        <div className="flex justify-between">
          <Link
            href={isEditing ? `/posts/${post.id}` : '/'}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting 
              ? `${isEditing ? '수정' : '작성'} 중...` 
              : `포스트 ${isEditing ? '수정' : '작성'}`
            }
          </button>
        </div>
      </form>
    </div>
  );
} 