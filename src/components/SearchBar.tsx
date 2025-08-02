'use client';

import { useState } from 'react';
import { SearchField } from '../utils/search';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFieldFilterChange?: (fields: SearchField[]) => void;
  selectedFields?: SearchField[];
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search in Darija, Arabic, English, or German...",
  onFieldFilterChange,
  selectedFields = ['n1', 'n2', 'n3', 'n4', 'darija_ar', 'eng', 'de']
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const fieldOptions = [
    { 
      key: 'all', 
      label: 'All', 
      fields: ['n1', 'n2', 'n3', 'n4', 'darija_ar', 'eng', 'de'] as SearchField[]
    },
    { 
      key: 'darija_latin', 
      label: 'Darija Latin', 
      fields: ['n1', 'n2', 'n3', 'n4'] as SearchField[]
    },
    { 
      key: 'darija_ar', 
      label: 'Darija Arabic', 
      fields: ['darija_ar'] as SearchField[]
    },
    { 
      key: 'eng', 
      label: 'English', 
      fields: ['eng'] as SearchField[]
    },
    { 
      key: 'de', 
      label: 'German', 
      fields: ['de'] as SearchField[]
    }
  ];

  const handleFieldToggle = (optionFields: SearchField[]) => {
    if (!onFieldFilterChange) return;
    onFieldFilterChange(optionFields);
  };

  const isOptionSelected = (optionFields: SearchField[]) => {
    if (optionFields.length === 7) {
      // For "All" option
      return selectedFields.length === 7;
    }
    // For specific field options
    return selectedFields.length === optionFields.length && 
           optionFields.every(field => selectedFields.includes(field));
  };

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

      {/* Field Filters - Compact horizontal layout */}
      <div className="mt-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Search in:</span>
          <div className="flex flex-wrap items-center gap-3">
            {fieldOptions.map((option) => {
              const isSelected = isOptionSelected(option.fields);
              return (
                <div key={option.key} className="flex items-center space-x-2 min-w-0">
                  <button
                    onClick={() => handleFieldToggle(option.fields)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 flex-shrink-0 ${
                      isSelected 
                        ? 'bg-blue-600' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        isSelected ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap truncate max-w-20 sm:max-w-none">{option.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search Tips */}
      {isFocused && !value && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 z-10">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Search Tips:</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Exact matches: &ldquo;haus&rdquo; finds &ldquo;haus&rdquo;</li>
            <li>• Prefix matches: &ldquo;hau&rdquo; finds &ldquo;haus&rdquo;, &ldquo;haushalt&rdquo;</li>
            <li>• Contains matches: &ldquo;leb&rdquo; finds &ldquo;lebensmittel&rdquo;</li>
            <li>• Use toggles to search in specific fields only</li>
          </ul>
        </div>
      )}
    </div>
  );
} 