'use client';

import { DictionaryEntry } from '../data/dictionary';
import { useRouter } from 'next/navigation';

interface DictionaryCardProps {
  entry: DictionaryEntry;
  language?: string;
  viewMode?: 'grid' | 'list';
}

export default function DictionaryCard({ entry, language = 'en', viewMode = 'grid' }: DictionaryCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    const basePath = language === 'de' ? '/de' : language === 'en' ? '/en' : '';
    router.push(`${basePath}/entry/${entry.id}`);
  };

  // Get the primary translation based on language
  const getPrimaryTranslation = () => {
    if (language === 'de') {
      return entry.de || entry.de2 || entry.de3 || entry.de4 || '';
    }
    return entry.eng || entry.eng2 || entry.eng3 || entry.eng4 || '';
  };

  // Get additional translations based on language
  const getAdditionalTranslations = () => {
    if (language === 'de') {
      return [entry.de2, entry.de3, entry.de4].filter(t => t);
    }
    return [entry.eng2, entry.eng3, entry.eng4].filter(t => t);
  };

  const primaryTranslation = getPrimaryTranslation();
  const additionalTranslations = getAdditionalTranslations();

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 border border-gray-200 dark:border-gray-700 cursor-pointer group"
        onClick={handleCardClick}
      >
        <div className="flex items-center space-x-4">
          {/* Darija Latin */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {entry.darija_latin}
              </h3>
              {entry.class && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {entry.class}
                </span>
              )}
            </div>
            {entry.darija_latin_alt && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Also: {entry.darija_latin_alt}
              </p>
            )}
          </div>

          {/* Arabic */}
          <div className="text-center min-w-[80px]">
            <div className="text-xl font-arabic text-gray-800 dark:text-gray-200">
              {entry.darija_ar}
            </div>
          </div>

          {/* Translation */}
          <div className="flex-1 min-w-0 text-right">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {language === 'de' ? 'Deutsch' : 'English'}
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {primaryTranslation}
            </div>
            {additionalTranslations.length > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
                Also: {additionalTranslations.join(', ')}
              </div>
            )}
          </div>

          {/* Arrow */}
          <div className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200 dark:border-gray-700 cursor-pointer group h-full flex flex-col"
      onClick={handleCardClick}
    >
      {/* Header with word and class */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {entry.darija_latin}
        </h3>
        {entry.class && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {entry.class}
          </span>
        )}
      </div>

      {/* Alternative spelling */}
      {entry.darija_latin_alt && (
        <div className="text-center mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Alternative
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-300 font-medium">
            {entry.darija_latin_alt}
          </div>
        </div>
      )}

      {/* Arabic - fixed height */}
      <div className="text-center mb-4 flex-1 flex items-center justify-center min-h-[4rem]">
        <div className="text-2xl font-arabic text-gray-800 dark:text-gray-200 leading-relaxed">
          {entry.darija_ar}
        </div>
      </div>

      {/* Translation - fixed height */}
      <div className="text-center">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {language === 'de' ? 'Deutsch' : 'English'}
        </div>
        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2 min-h-[1.5rem]">
          {primaryTranslation}
        </div>
        {additionalTranslations.length > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Also: {additionalTranslations.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
