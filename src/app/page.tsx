import { Suspense } from 'react';
import HomeClient from '../components/HomeClient';

// Generate static params for each letter
export async function generateStaticParams() {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  return alphabet.map((letter) => ({
    letter: letter.toLowerCase(),
  }));
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dictionary...</p>
        </div>
      </div>
    }>
      <HomeClient />
    </Suspense>
  );
}
