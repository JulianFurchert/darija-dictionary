import { DictionaryEntry } from '../data/dictionary';

export type SearchField = 'n1' | 'n2' | 'n3' | 'n4' | 'darija_ar' | 'eng' | 'de';

// Simple prefix and exact search function
export function simpleSearch(
  query: string, 
  entries: DictionaryEntry[], 
  searchFields: SearchField[] = ['n1', 'n2', 'n3', 'n4', 'darija_ar', 'eng', 'de'],
  maxResults: number = 50
): DictionaryEntry[] {
  if (!query.trim()) return entries.slice(0, maxResults);
  
  const searchTerm = query.toLowerCase().trim();
  
  const results = entries.filter(entry => {
    return searchFields.some(field => {
      const value = entry[field];
      if (!value) return false;
      
      const fieldValue = value.toLowerCase();
      
      // Exact match (highest priority)
      if (fieldValue === searchTerm) return true;
      
      // Starts with match (second priority)
      if (fieldValue.startsWith(searchTerm)) return true;
      
      // Contains match (lowest priority)
      if (fieldValue.includes(searchTerm)) return true;
      
      return false;
    });
  });
  
  // Sort results by relevance (exact matches first, then starts with, then contains)
  const sortedResults = results.sort((a, b) => {
    const aScore = getRelevanceScore(a, searchTerm, searchFields);
    const bScore = getRelevanceScore(b, searchTerm, searchFields);
    return bScore - aScore;
  });
  
  return sortedResults.slice(0, maxResults);
}

// Helper function to calculate relevance score
function getRelevanceScore(entry: DictionaryEntry, searchTerm: string, searchFields: SearchField[]): number {
  let maxScore = 0;
  
  searchFields.forEach(field => {
    const value = entry[field];
    if (!value) return;
    
    const fieldValue = value.toLowerCase();
    
    if (fieldValue === searchTerm) {
      maxScore = Math.max(maxScore, 100); // Exact match
    } else if (fieldValue.startsWith(searchTerm)) {
      maxScore = Math.max(maxScore, 50); // Starts with
    } else if (fieldValue.includes(searchTerm)) {
      maxScore = Math.max(maxScore, 25); // Contains
    }
  });
  
  return maxScore;
}

// Enhanced search (keeping for backward compatibility)
export function enhancedSearch(query: string, entries: DictionaryEntry[], maxResults: number = 50): DictionaryEntry[] {
  return simpleSearch(query, entries, ['n1', 'n2', 'n3', 'n4', 'darija_ar', 'eng', 'de'], maxResults);
}

// Simple fuzzy search (keeping for backward compatibility)
export function fuzzySearch(query: string, entries: DictionaryEntry[]): DictionaryEntry[] {
  return simpleSearch(query, entries);
}

// Search in specific fields only
export function searchInFields(
  query: string, 
  entries: DictionaryEntry[], 
  fields: SearchField[]
): DictionaryEntry[] {
  return simpleSearch(query, entries, fields);
}

// Get search results with scoring information (for debugging or advanced features)
export function getSearchResultsWithScore(query: string, entries: DictionaryEntry[]) {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  const results = entries.map(entry => {
    const score = getRelevanceScore(entry, searchTerm, ['n1', 'n2', 'n3', 'n4', 'darija_ar', 'eng', 'de']);
    return { entry, score };
  }).filter(result => result.score > 0);
  
  return results.sort((a, b) => b.score - a.score);
}

// Search with custom threshold (not really needed for simple search, but keeping for compatibility)
export function customSearch(query: string, entries: DictionaryEntry[], maxResults: number = 50): DictionaryEntry[] {
  return simpleSearch(query, entries, ['n1', 'n2', 'n3', 'n4', 'darija_ar', 'eng', 'de'], maxResults);
}

// Clear the cached instance (not needed for simple search, but keeping for compatibility)
export function clearFuseCache() {
  // No cache to clear for simple search
} 