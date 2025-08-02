import { DictionaryEntry } from '../data/dictionary';

interface DictionaryCardProps {
  entry: DictionaryEntry;
}

export default function DictionaryCard({ entry }: DictionaryCardProps) {
  // Get alternative spellings (filter out null values)
  const alternativeSpellings = [entry.n2, entry.n3, entry.n4].filter(spelling => spelling !== null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        {/* Darija (Latin) */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {entry.n1}
          </h3>
          {alternativeSpellings.length > 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Also: {alternativeSpellings.join(', ')}
            </div>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {entry.class}
          </span>
        </div>
        
        {/* Arabic */}
        <div className="text-center">
          <div className="text-3xl font-arabic text-gray-800 dark:text-gray-200 leading-relaxed min-h-[4rem] flex items-center justify-center">
            {entry.darija_ar}
          </div>
        </div>
        
        {/* Translations */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              English
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {entry.eng}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Deutsch
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {entry.de}
            </div>
          </div>
        </div>

        {/* Source information (optional) */}
        {(entry.n1_by || entry.darija_ar_by || entry.eng_by || entry.de_by) && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
            <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
              Sources: {[entry.n1_by, entry.darija_ar_by, entry.eng_by, entry.de_by]
                .filter(source => source !== null)
                .join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
