'use client';

import { useState, useMemo, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { dictionaryData } from '../data/dictionary';
import { simpleSearch, SearchField } from '../utils/search';
import SearchBar from '../components/SearchBar';
import DictionaryCard from '../components/DictionaryCard';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(searchParams.get('q') || '');
  const [selectedFields, setSelectedFields] = useState<SearchField[]>(
    searchParams.get('fields') ? searchParams.get('fields')!.split(',') as SearchField[] : 
    ['n1', 'n2', 'n3', 'n4', 'darija_ar', 'eng', 'de']
  );
  
  // Debounce function to improve performance
  const debounce = useCallback(<T extends unknown[]>(func: (...args: T) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Debounced search query update
  const debouncedSetQuery = useMemo(
    () => debounce((query: string) => setDebouncedQuery(query), 300),
    [debounce]
  );

  // Update URL when search parameters change
  const updateURL = useCallback((query: string, fields: SearchField[]) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (fields.length > 0 && fields.length < 7) {
      params.set('fields', fields.join(','));
    }
    
    const newURL = params.toString() ? `/?${params.toString()}` : '/';
    router.replace(newURL, { scroll: false });
  }, [router]);

  // Update search query with debouncing and URL update
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    debouncedSetQuery(query);
    updateURL(query, selectedFields);
  };

  // Handle field filter changes with URL update
  const handleFieldFilterChange = (fields: SearchField[]) => {
    setSelectedFields(fields);
    updateURL(searchQuery, fields);
  };
  
  const filteredEntries = useMemo(() => {
    return simpleSearch(debouncedQuery, dictionaryData, selectedFields, 52);
  }, [debouncedQuery, selectedFields]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
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
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search in Darija, Arabic, English, or German..."
            onFieldFilterChange={handleFieldFilterChange}
            selectedFields={selectedFields}
          />
        </div>
      </section>

      {/* Results Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {debouncedQuery ? (
              <>
                Found <span className="font-semibold text-gray-900 dark:text-white">{filteredEntries.length}</span> result{filteredEntries.length !== 1 ? 's' : ''} for &ldquo;{debouncedQuery}&rdquo;
                {selectedFields.length < 7 && (
                  <span className="ml-2 text-blue-600 dark:text-blue-400">
                    (filtered by {selectedFields.length} field{selectedFields.length !== 1 ? 's' : ''})
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
              <DictionaryCard key={`${entry.id}-${index}`} entry={entry} />
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
                <li>• Try exact matches: &ldquo;haus&rdquo;</li>
                <li>• Try prefix matches: &ldquo;hau&rdquo; for &ldquo;haus&rdquo;</li>
                <li>• Try partial matches: &ldquo;leb&rdquo; for &ldquo;lebensmittel&rdquo;</li>
                <li>• Use field filters to narrow your search</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 Darija Dictionary. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
