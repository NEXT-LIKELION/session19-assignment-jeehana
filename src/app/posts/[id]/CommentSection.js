'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CommentSection({ postId, initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState({ content: '', author: '' });
  const [editingComment, setEditingComment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.content.trim() || !newComment.author.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: parseInt(postId),
          content: newComment.content,
          author: newComment.author,
        }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments([...comments, comment]);
        setNewComment({ content: '', author: '' });
      } else {
        throw new Error('댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      alert('댓글 작성 중 오류가 발생했습니다.');
      console.error('Comment creation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = async (commentId, content, author) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author }),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setComments(comments.map(c => 
          c.id === commentId ? updatedComment : c
        ));
        setEditingComment(null);
      } else {
        throw new Error('댓글 수정에 실패했습니다.');
      }
    } catch (error) {
      alert('댓글 수정 중 오류가 발생했습니다.');
      console.error('Comment update error:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments(comments.filter(c => c.id !== commentId));
      } else {
        throw new Error('댓글 삭제에 실패했습니다.');
      }
    } catch (error) {
      alert('댓글 삭제 중 오류가 발생했습니다.');
      console.error('Comment deletion error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        댓글 ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="작성자"
            value={newComment.author}
            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <textarea
          placeholder="댓글을 작성해주세요..."
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows="3"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? '작성 중...' : '댓글 작성'}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">아직 댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              isEditing={editingComment === comment.id}
              onEdit={() => setEditingComment(comment.id)}
              onCancelEdit={() => setEditingComment(null)}
              onSaveEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          ))
        )}
      </div>
    </div>
  );
}

function CommentItem({ comment, isEditing, onEdit, onCancelEdit, onSaveEdit, onDelete }) {
  const [editForm, setEditForm] = useState({
    content: comment.content,
    author: comment.author,
  });

  const handleSave = () => {
    onSaveEdit(comment.id, editForm.content, editForm.author);
  };

  if (isEditing) {
    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={editForm.author}
            onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <textarea
          value={editForm.content}
          onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows="3"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
          >
            저장
          </button>
          <button
            onClick={onCancelEdit}
            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold text-gray-900">{comment.author}</span>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(comment.id)}
            className="text-red-600 text-sm hover:text-red-800 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
      <p className="text-gray-700 mb-2">{comment.content}</p>
      <div className="text-sm text-gray-500">
        {comment.createdAt.toLocaleDateString()} {comment.createdAt.toLocaleTimeString()}
        {comment.updatedAt > comment.createdAt && (
          <span className="ml-2">(수정됨)</span>
        )}
      </div>
    </div>
  );
} 