'use client';

import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';

interface HeaderProps {
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export function Header({
  subtitle = 'Gerencie seus seguidores',
  rightContent,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className='header-bg sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <button
            onClick={() => router.push('/')}
            className='flex items-center space-x-3 group transition-transform hover:scale-105'
          >
            <div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow'>
              <Users className='text-[#1a3d66] w-5 h-5' />
            </div>
            <div className='text-left'>
              <h1 className='text-white font-bold text-xl'>FollowerScan</h1>
              <p className='text-white/80 text-xs'>{subtitle}</p>
            </div>
          </button>
          {rightContent && (
            <div className='flex items-center space-x-2'>{rightContent}</div>
          )}
        </div>
      </div>
    </header>
  );
}
