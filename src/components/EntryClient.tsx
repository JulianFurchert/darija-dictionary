'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DictionaryEntry } from '../data/dictionary';

const translations = {
  de: {
    backToSearch: 'Zurück zur Suche',
    favorite: 'Favorit',
    share: 'Teilen',
    darijaLatinPrimary: 'Darija Latein (Primär)',
    alternativeSpelling: 'Alternative Schreibweise',
    darijaArabic: 'Darija Arabisch',
    english: 'Englisch',
    german: 'Deutsch',
    also: 'Auch',
    entryNotFound: 'Eintrag nicht gefunden',
    backToDictionary: 'Zurück zum Wörterbuch',
    source: 'Quelle',
    dodLink: 'Darija Open Dataset (DODa) auf GitHub'
  },
  en: {
    backToSearch: 'Back to Search',
    favorite: 'Favorite',
    share: 'Share',
    darijaLatinPrimary: 'Darija Latin (Primary)',
    alternativeSpelling: 'Alternative Spelling',
    darijaArabic: 'Darija Arabic',
    english: 'English',
    german: 'German',
    also: 'Also',
    entryNotFound: 'Entry not found',
    backToDictionary: 'Back to Dictionary',
    source: 'Source',
    dodLink: 'Darija Open Dataset (DODa) on GitHub'
  }
};

interface EntryClientProps {
  entry: DictionaryEntry;
}

export default function EntryClient({ entry }: EntryClientProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'de'>('en');
  const [mounted, setMounted] = useState(false);

  // Set language after component mounts to avoid hydration mismatch
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/de')) {
      setLanguage('de');
    } else if (path.startsWith('/en')) {
      setLanguage('en');
    } else {
      setLanguage('en');
    }
    setMounted(true);
  }, []);

  const t = translations[language];

  const handleBackClick = () => {
    const basePath = language === 'de' ? '/de' : language === 'en' ? '/en' : '';
    router.push(basePath || '/');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${entry?.darija_latin} - ${t.darijaLatinPrimary}`,
        text: `${entry?.darija_latin}: ${entry?.eng || entry?.de}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Get translations based on language
  const getPrimaryTranslation = () => {
    if (language === 'de') {
      return entry.de || entry.de2 || entry.de3 || entry.de4 || '';
    }
    return entry.eng || entry.eng2 || entry.eng3 || entry.eng4 || '';
  };

  const getAdditionalTranslations = () => {
    if (language === 'de') {
      return [entry.de2, entry.de3, entry.de4].filter(t => t);
    }
    return [entry.eng2, entry.eng3, entry.eng4].filter(t => t);
  };

  const primaryTranslation = getPrimaryTranslation();
  const additionalTranslations = getAdditionalTranslations();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with navigation */}
          <div className="mb-8">
            <button
              onClick={handleBackClick}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {mounted ? t.backToSearch : 'Back to Search'}
            </button>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {entry.darija_latin}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {entry.class && (
                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mr-2">
                      {entry.class}
                    </span>
                  )}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Darija Latin Script */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                  {mounted ? t.darijaLatinPrimary : 'Darija Latin (Primary)'}
                </h3>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {entry.darija_latin}
                </div>
              </div>

              {/* Alternative spelling */}
              {entry.darija_latin_alt && (
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                    {mounted ? t.alternativeSpelling : 'Alternative Spelling'}
                  </h3>
                  <div className="text-xl text-gray-900 dark:text-white mb-2">
                    {entry.darija_latin_alt}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {mounted ? t.source : 'Source'}: DODa
                  </div>
                </div>
              )}
            </div>

            {/* Arabic */}
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                {mounted ? t.darijaArabic : 'Darija Arabic'}
              </h3>
              <div className="text-3xl font-arabic text-gray-900 dark:text-white mb-2">
                {entry.darija_ar}
              </div>
            </div>

            {/* Translation */}
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                {mounted ? (language === 'de' ? t.german : t.english) : 'English'}
              </h3>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {primaryTranslation}
              </div>
              {additionalTranslations.length > 0 && (
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  {mounted ? t.also : 'Also'}: {additionalTranslations.join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* Footer with DODa link */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <a
              href="https://github.com/darija-open-dataset/dataset"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              {mounted ? t.dodLink : 'Darija Open Dataset (DODa) on GitHub'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 