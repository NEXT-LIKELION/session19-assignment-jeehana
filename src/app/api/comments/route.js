import { NextResponse } from 'next/server';
import { createComment, getCommentsByPostId } from '../../lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const comments = getCommentsByPostId(postId);
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { postId, content, author } = body;

    if (!postId || !content || !author) {
      return NextResponse.json(
        { error: 'Post ID, content, and author are required' },
        { status: 400 }
      );
    }

    const newComment = createComment({ postId, content, author });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
} 