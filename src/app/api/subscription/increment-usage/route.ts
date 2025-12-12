import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const publicMetadata = user.publicMetadata as {
      usedAnalyses?: number;
      subscriptionTier?: string;
    };

    const currentUsage = publicMetadata.usedAnalyses || 0;
    const newUsage = currentUsage + 1;

    const clerk = await clerkClient();

    // Atualizar metadata do usuário
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        ...publicMetadata,
        usedAnalyses: newUsage,
      },
    });

    return NextResponse.json({ 
      success: true, 
      usedAnalyses: newUsage 
    });
  } catch (error) {
    console.error('Erro ao incrementar uso:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar uso' },
      { status: 500 }
    );
  }
}