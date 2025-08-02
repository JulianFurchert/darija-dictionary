'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { dictionaryData, DictionaryEntry } from '../../../data/dictionary';

export default function EntryDetail() {
  const params = useParams();
  const router = useRouter();
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (params.id) {
      // Find the entry by ID
      const foundEntry = dictionaryData.find(e => e.id === params.id);
      if (foundEntry) {
        setEntry(foundEntry);
      }
    }
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${entry?.n1} - Darija Dictionary`,
        text: `Check out this Darija word: ${entry?.n1}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you could save to localStorage or backend
  };

  if (!entry) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Entry not found
            </h1>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const alternativeSpellings = [entry.n2, entry.n3, entry.n4].filter(spelling => spelling !== null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Search</span>
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
              >
                <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Entry Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
          {/* Main Word */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {entry.n1}
            </h1>
            {alternativeSpellings.length > 0 && (
              <div className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                Also: {alternativeSpellings.join(', ')}
              </div>
            )}
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
              {entry.class}
            </span>
          </div>

          {/* Translations with individual sources */}
          <div className="space-y-6">
            {/* Darija Latin Script */}
            <div className={alternativeSpellings.length > 0 ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Darija Latin Script (Primary)
                </h3>
                <div className="text-xl text-gray-900 dark:text-white mb-2">
                  {entry.n1}
                </div>
                {entry.n1_by && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Source: {entry.n1_by}
                  </div>
                )}
              </div>

              {/* Alternative spellings */}
              {alternativeSpellings.length > 0 && (
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    Alternative Spellings
                  </h3>
                  <div className="space-y-1">
                    {entry.n2 && (
                      <div className="text-lg text-gray-900 dark:text-white">
                        {entry.n2}
                      </div>
                    )}
                    {entry.n3 && (
                      <div className="text-lg text-gray-900 dark:text-white">
                        {entry.n3}
                      </div>
                    )}
                    {entry.n4 && (
                      <div className="text-lg text-gray-900 dark:text-white">
                        {entry.n4}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Source: DODa
                  </div>
                </div>
              )}
            </div>

            {/* Arabic */}
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                Darija Arabic Script
              </h3>
              <div className="text-2xl font-arabic text-gray-900 dark:text-white mb-2">
                {entry.darija_ar}
              </div>
              {entry.darija_ar_by && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Source: {entry.darija_ar_by}
                </div>
              )}
            </div>

            {/* English */}
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                English
              </h3>
              <div className="text-xl text-gray-900 dark:text-white mb-2">
                {entry.eng}
              </div>
              {entry.eng_by && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Source: {entry.eng_by}
                </div>
              )}
            </div>

            {/* German */}
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                German
              </h3>
              <div className="text-xl text-gray-900 dark:text-white mb-2">
                {entry.de}
              </div>
              {entry.de_by && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Source: {entry.de_by}
                </div>
              )}
            </div>
          </div>

          {/* DODa Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Data from Darija Open Dataset
            </p>
            <a
              href="https://github.com/darija-open-dataset/dataset"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 Darija Dictionary. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
} 