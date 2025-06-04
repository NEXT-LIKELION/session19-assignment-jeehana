import { NextResponse } from 'next/server';
import { updateComment, deleteComment } from '../../../lib/data';

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { content, author } = body;

    if (!content || !author) {
      return NextResponse.json(
        { error: 'Content and author are required' },
        { status: 400 }
      );
    }

    const updatedComment = updateComment(params.id, { content, author });
    
    if (!updatedComment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedComment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedComment = deleteComment(params.id);
    
    if (!deletedComment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
} 