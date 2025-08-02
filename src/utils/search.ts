import Fuse from 'fuse.js';
import { DictionaryEntry } from '../data/dictionary';

// Configure Fuse.js for optimal fuzzy search with extended fields
const fuseOptions = {
  // Search in all fields including alternative spellings
  keys: [
    { name: 'n1', weight: 0.4 },        // Primary Darija (Latin) - highest priority
    { name: 'n2', weight: 0.3 },        // Alternative Darija spelling 1
    { name: 'n3', weight: 0.3 },        // Alternative Darija spelling 2
    { name: 'n4', weight: 0.3 },        // Alternative Darija spelling 3
    { name: 'darija_ar', weight: 0.3 }, // Arabic script
    { name: 'eng', weight: 0.2 },       // English
    { name: 'de', weight: 0.2 },        // German
    { name: 'class', weight: 0.1 }      // Word class
  ],
  // Fuzzy search settings
  threshold: 0.3,        // Lower = more strict matching (0.0 = exact, 1.0 = very loose)
  distance: 100,         // Maximum distance between characters
  minMatchCharLength: 2, // Minimum characters that must match
  // Advanced options
  includeScore: true,    // Include relevance score in results
  includeMatches: true,  // Include which fields matched
  useExtendedSearch: false, // Don't use extended search syntax
  ignoreLocation: true,  // Ignore location of matches in string
  findAllMatches: true   // Find all matches, not just the first
};

// Enhanced search using Fuse.js
export function enhancedSearch(query: string, entries: DictionaryEntry[]): DictionaryEntry[] {
  if (!query.trim()) return entries;
  
  const fuse = new Fuse(entries, fuseOptions);
  const results = fuse.search(query);
  
  // Return just the items (without score and matches info)
  return results.map(result => result.item);
}

// Simple fuzzy search (keeping for backward compatibility)
export function fuzzySearch(query: string, entries: DictionaryEntry[]): DictionaryEntry[] {
  return enhancedSearch(query, entries);
}

// Get search results with scoring information (for debugging or advanced features)
export function getSearchResultsWithScore(query: string, entries: DictionaryEntry[]) {
  if (!query.trim()) return [];
  
  const fuse = new Fuse(entries, fuseOptions);
  return fuse.search(query);
}

// Search with custom threshold
export function customSearch(query: string, entries: DictionaryEntry[], threshold: number = 0.3): DictionaryEntry[] {
  if (!query.trim()) return entries;
  
  const customOptions = { ...fuseOptions, threshold };
  const customFuse = new Fuse(entries, customOptions);
  const results = customFuse.search(query);
  
  return results.map(result => result.item);
} 