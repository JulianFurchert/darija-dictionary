'use client';

import { useState } from 'react';
import { SearchField } from '../utils/search';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFieldFilterChange?: (fields: SearchField[]) => void;
  selectedFields?: SearchField[];
  language?: string;
}

const translations = {
  de: {
    all: 'Alle',
    darijaLatin: 'Darija Latein',
    darijaArabic: 'Darija Arabisch',
    english: 'Englisch',
    german: 'Deutsch'
  },
  en: {
    all: 'All',
    darijaLatin: 'Darija Latin',
    darijaArabic: 'Darija Arabic',
    english: 'English',
    german: 'German'
  }
};

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search in Darija, Arabic, English, or German...",
  language = 'en'
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-6">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            isFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
} 