'use client';

import { useState, useMemo } from 'react';
import { dictionaryData } from '../data/dictionary';
import { enhancedSearch, customSearch } from '../utils/search';
import SearchBar from '../components/SearchBar';
import DictionaryCard from '../components/DictionaryCard';

type SearchType = 'all' | 'darija' | 'arabic' | 'english' | 'german';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [searchThreshold, setSearchThreshold] = useState(0.3);
  
  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return dictionaryData;
    
    // Filter by search type first
    let filteredData = dictionaryData;
    if (searchType !== 'all') {
      filteredData = dictionaryData.filter(entry => {
        switch (searchType) {
          case 'darija':
            return entry.n1.toLowerCase().includes(searchQuery.toLowerCase());
          case 'arabic':
            return entry.darija_ar.includes(searchQuery);
          case 'english':
            return entry.eng.toLowerCase().includes(searchQuery.toLowerCase());
          case 'german':
            return entry.de.toLowerCase().includes(searchQuery.toLowerCase());
          default:
            return true;
        }
      });
    }
    
    // Then apply fuzzy search
    return enhancedSearch(searchQuery, filteredData);
  }, [searchQuery, searchType]);

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Darija Dictionary
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Moroccan Arabic Dictionary - قاموس الدارجة المغربية
            </p>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearchTypeChange={handleSearchTypeChange}
            searchType={searchType}
          />
          
          {/* Search Settings */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <label htmlFor="threshold" className="font-medium">Search Sensitivity:</label>
              <input
                id="threshold"
                type="range"
                min="0.1"
                max="0.8"
                step="0.1"
                value={searchThreshold}
                onChange={(e) => setSearchThreshold(parseFloat(e.target.value))}
                className="w-24"
              />
              <span className="w-8 text-center">{searchThreshold}</span>
            </div>
            <div className="text-xs">
              {searchThreshold <= 0.2 && "Very Strict"}
              {searchThreshold > 0.2 && searchThreshold <= 0.4 && "Strict"}
              {searchThreshold > 0.4 && searchThreshold <= 0.6 && "Normal"}
              {searchThreshold > 0.6 && "Loose"}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {searchQuery ? (
              <>
                Found <span className="font-semibold text-gray-900 dark:text-white">{filteredEntries.length}</span> result{filteredEntries.length !== 1 ? 's' : ''} for "{searchQuery}"
                {searchType !== 'all' && (
                  <span className="ml-2 text-blue-600 dark:text-blue-400">
                    (filtered by {searchType})
                  </span>
                )}
              </>
            ) : (
              <>
                Showing all <span className="font-semibold text-gray-900 dark:text-white">{dictionaryData.length}</span> entries
              </>
            )}
          </p>
        </div>

        {/* Dictionary Cards Grid */}
        {filteredEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEntries.map((entry, index) => (
              <DictionaryCard key={`${entry.n1}-${index}`} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try searching with different keywords or check your spelling.
            </p>
            <div className="text-sm text-gray-400 dark:text-gray-500">
              <p>Search tips:</p>
              <ul className="mt-2 space-y-1">
                <li>• Try shorter or partial words</li>
                <li>• Check different spellings</li>
                <li>• Use the language filters</li>
                <li>• Adjust search sensitivity</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 Darija Dictionary. Built with Next.js, Tailwind CSS, and Fuse.js for powerful fuzzy search.
          </p>
        </div>
      </footer>
    </div>
  );
}
