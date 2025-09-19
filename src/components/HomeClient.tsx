'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { dictionaryData } from '../data/dictionary';
import { simpleSearch } from '../utils/search';
import SearchBar from './SearchBar';
import DictionaryCard from './DictionaryCard';

// Debounce function
function debounce<T extends unknown[]>(func: (...args: T) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate alphabet array
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const translations = {
  de: {
    searchPlaceholder: 'Suchen Sie in Darija, Arabisch, Englisch oder Deutsch...',
    foundResults: 'Gefunden',
    result: 'Ergebnis',
    results: 'Ergebnisse',
    for: 'für',
    showing: 'Zeige',
    entries: 'Einträge',
    startingWith: 'beginnt mit',
    noResults: 'Keine Ergebnisse gefunden',
    noEntriesForLetter: 'Keine Einträge beginnend mit',
    tryAdjusting: 'Versuchen Sie, Ihre Suchbegriffe anzupassen',
    footer: '© 2024 Darija Wörterbuch. Erstellt mit Next.js und Tailwind CSS.',
    grid: 'Raster',
    list: 'Liste'
  },
  en: {
    searchPlaceholder: 'Search in Darija, Arabic, English, or German...',
    foundResults: 'Found',
    result: 'result',
    results: 'results',
    for: 'for',
    showing: 'Showing',
    entries: 'entries',
    startingWith: 'starting with',
    noResults: 'No results found',
    noEntriesForLetter: 'No entries starting with',
    tryAdjusting: 'Try adjusting your search terms',
    footer: '© 2024 Darija Dictionary. Built with Next.js and Tailwind CSS.',
    grid: 'Grid',
    list: 'List'
  }
};

export default function HomeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<'en' | 'de'>('en');
  const [mounted, setMounted] = useState(false);
  
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
  
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('q') || ''
  );
  const [debouncedQuery, setDebouncedQuery] = useState(
    searchParams.get('q') || ''
  );
  const [selectedLetter, setSelectedLetter] = useState(
    searchParams.get('letter') || 'A'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setDebouncedQuery(query);
      if (query.trim()) {
        setSelectedLetter('');
      } else {
        const lastLetter = searchParams.get('letter') || 'A';
        setSelectedLetter(lastLetter);
      }
    }, 300),
    [searchParams]
  );

  const updateURL = useCallback((query: string, letter: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (letter) params.set('letter', letter);
    
    const basePath = language === 'de' ? '/de' : language === 'en' ? '/en' : '';
    const newURL = params.toString() ? `${basePath}/?${params.toString()}` : basePath || '/';
    router.replace(newURL, { scroll: false });
  }, [router, language]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
    updateURL(query, selectedLetter);
  }, [debouncedSearch, selectedLetter, updateURL]);

  const handleLetterSelect = useCallback((letter: string) => {
    setSelectedLetter(letter);
    setSearchQuery('');
    setDebouncedQuery('');
    updateURL('', letter);
  }, [updateURL]);

  const filteredEntries = useMemo(() => {
    if (debouncedQuery.trim()) {
      const searchResults = simpleSearch(debouncedQuery, dictionaryData, ['darija_latin', 'darija_latin_alt', 'n1', 'n2', 'n3', 'n4', 'darija_ar', 'eng', 'eng2', 'eng3', 'eng4', 'de', 'de2', 'de3', 'de4'], 1000);
      return searchResults.slice(0, 52);
    } else if (selectedLetter) {
      return dictionaryData.filter(entry => 
        entry.darija_latin.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    } else {
      return dictionaryData.slice(0, 52);
    }
  }, [debouncedQuery, selectedLetter]);

  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    dictionaryData.forEach(entry => {
      const firstLetter = entry.darija_latin.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstLetter)) {
        letters.add(firstLetter);
      }
    });
    return Array.from(letters).sort();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={mounted ? t.searchPlaceholder : "Search in Darija, Arabic, English, or German..."}
            language={language}
          />

          {!debouncedQuery.trim() && (
            <div className="mb-6">
              <div className="md:hidden">
                <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                  {alphabet.map(letter => (
                    <button
                      key={letter}
                      onClick={() => handleLetterSelect(letter)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                        selectedLetter === letter
                          ? 'bg-blue-600 text-white shadow-md'
                          : availableLetters.includes(letter)
                          ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-600'
                      }`}
                      disabled={!availableLetters.includes(letter)}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="hidden md:flex flex-wrap justify-center gap-1">
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => handleLetterSelect(letter)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedLetter === letter
                        ? 'bg-blue-600 text-white shadow-md'
                        : availableLetters.includes(letter)
                        ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-600'
                    }`}
                    disabled={!availableLetters.includes(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 flex justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                  </svg>
                  <span>{mounted ? t.grid : 'Grid'}</span>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                  </svg>
                  <span>{mounted ? t.list : 'List'}</span>
                </div>
              </button>
            </div>
          </div>

          <div className="mb-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {debouncedQuery ? (
                <>
                  {mounted ? t.foundResults : 'Found'} <span className="font-semibold text-gray-900 dark:text-white">{filteredEntries.length}</span> {filteredEntries.length !== 1 ? (mounted ? t.results : 'results') : (mounted ? t.result : 'result')} {mounted ? t.for : 'for'} &ldquo;{debouncedQuery}&rdquo;
                  {filteredEntries.length === 52 && (
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Limited to 52 results
                    </span>
                  )}
                </>
              ) : (
                <>
                  {mounted ? t.showing : 'Showing'} <span className="font-semibold text-gray-900 dark:text-white">{filteredEntries.length}</span> {mounted ? t.entries : 'entries'} {mounted ? t.startingWith : 'starting with'} &ldquo;{selectedLetter}&rdquo;
                </>
              )}
            </p>
          </div>

          {filteredEntries.length > 0 ? (
            <>
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-3"
              }>
                {filteredEntries.map((entry) => (
                  <DictionaryCard 
                    key={entry.id} 
                    entry={entry} 
                    language={language}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {mounted ? t.noResults : 'No results found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedLetter 
                  ? `${mounted ? t.noEntriesForLetter : 'No entries starting with'} "${selectedLetter}"`
                  : (mounted ? t.tryAdjusting : 'Try adjusting your search terms')
                }
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {mounted ? t.footer : '© 2024 Darija Dictionary. Built with Next.js and Tailwind CSS.'}
          </p>
        </div>
      </footer>
    </div>
  );
} 