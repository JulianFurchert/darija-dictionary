'use client';

import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearchTypeChange?: (type: 'all' | 'darija' | 'arabic' | 'english' | 'german') => void;
  searchType?: 'all' | 'darija' | 'arabic' | 'english' | 'german';
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search in Darija, Arabic, English, or German...",
  onSearchTypeChange,
  searchType = 'all'
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg
              className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Type Filter */}
      {onSearchTypeChange && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[
            { key: 'all', label: 'All', icon: '🌐' },
            { key: 'darija', label: 'Darija', icon: '🔤' },
            { key: 'arabic', label: 'Arabic', icon: '📝' },
            { key: 'english', label: 'English', icon: '🇺🇸' },
            { key: 'german', label: 'German', icon: '🇩🇪' }
          ].map((type) => (
            <button
              key={type.key}
              onClick={() => onSearchTypeChange(type.key as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                searchType === type.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span className="mr-1">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      )}

      {/* Search Tips */}
      {isFocused && !value && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 z-10">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Search Tips:</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Search in Darija (Latin script), Arabic, English, or German</li>
            <li>• Fuzzy search finds similar words even with typos</li>
            <li>• Try partial words or different spellings</li>
            <li>• Use the filter buttons to search in specific languages</li>
          </ul>
        </div>
      )}
    </div>
  );
} 