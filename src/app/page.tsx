'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/tutorial');
  }, [router]);

  return (
    <div className='min-h-screen gradient-bg flex items-center justify-center'>
      <div className='text-center'>
        <Loader2 className='w-8 h-8 animate-spin text-white mx-auto mb-4' />
        <p className='text-white'>Redirecionando...</p>
      </div>
    </div>
  );
}
