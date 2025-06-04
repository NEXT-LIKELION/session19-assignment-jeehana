import PostForm from '../PostForm';

export default function NewPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">새 포스트 작성</h1>
        <PostForm />
      </div>
    </div>
  );
} 