import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { itemId, voteType } = await req.json();
    
    // You'll need to get the userId from the session
    const userId = 'user_id'; // Replace with actual user ID from auth
    
    const vote = await prisma.vote.upsert({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
      update: {
        type: voteType,
      },
      create: {
        userId,
        itemId,
        type: voteType,
      },
    });

    return NextResponse.json({ success: true, vote });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to vote' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { itemId } = await req.json();
    const userId = 'user_id'; // Replace with actual user ID from auth

    await prisma.vote.delete({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete vote error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove vote' },
      { status: 500 }
    );
  }
} 