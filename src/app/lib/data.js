// Mock data for posts and comments
let posts = [
  {
    id: 1,
    title: "Next.js 13 App Router 소개",
    content: "Next.js 13에서 새롭게 도입된 App Router에 대해 알아보겠습니다. App Router는 React Server Components를 기반으로 한 새로운 라우팅 시스템입니다.",
    author: "김개발",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: 2,
    title: "React Server Components vs Client Components",
    content: "React Server Components와 Client Components의 차이점과 언제 어떤 것을 사용해야 하는지 알아보겠습니다.",
    author: "이프론트",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  }
];

let comments = [
  {
    id: 1,
    postId: 1,
    content: "매우 유용한 정보네요! 감사합니다.",
    author: "박댓글",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16")
  },
  {
    id: 2,
    postId: 1,
    content: "App Router 정말 편리한 것 같아요.",
    author: "최사용자",
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17")
  },
  {
    id: 3,
    postId: 2,
    content: "Server Components에 대해 더 자세히 알고 싶어요.",
    author: "정학습",
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-21")
  }
];

let nextPostId = 3;
let nextCommentId = 4;

// Post CRUD operations
export function getAllPosts() {
  return posts.sort((a, b) => b.createdAt - a.createdAt);
}

export function getPostById(id) {
  return posts.find(post => post.id === parseInt(id));
}

export function createPost(postData) {
  const newPost = {
    id: nextPostId++,
    ...postData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  posts.push(newPost);
  return newPost;
}

export function updatePost(id, postData) {
  const index = posts.findIndex(post => post.id === parseInt(id));
  if (index !== -1) {
    posts[index] = {
      ...posts[index],
      ...postData,
      updatedAt: new Date()
    };
    return posts[index];
  }
  return null;
}

export function deletePost(id) {
  const index = posts.findIndex(post => post.id === parseInt(id));
  if (index !== -1) {
    const deletedPost = posts.splice(index, 1)[0];
    // Delete associated comments
    comments = comments.filter(comment => comment.postId !== parseInt(id));
    return deletedPost;
  }
  return null;
}

// Comment CRUD operations
export function getCommentsByPostId(postId) {
  return comments
    .filter(comment => comment.postId === parseInt(postId))
    .sort((a, b) => a.createdAt - b.createdAt);
}

export function createComment(commentData) {
  const newComment = {
    id: nextCommentId++,
    ...commentData,
    postId: parseInt(commentData.postId),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  comments.push(newComment);
  return newComment;
}

export function updateComment(id, commentData) {
  const index = comments.findIndex(comment => comment.id === parseInt(id));
  if (index !== -1) {
    comments[index] = {
      ...comments[index],
      ...commentData,
      updatedAt: new Date()
    };
    return comments[index];
  }
  return null;
}

export function deleteComment(id) {
  const index = comments.findIndex(comment => comment.id === parseInt(id));
  if (index !== -1) {
    return comments.splice(index, 1)[0];
  }
  return null;
} 