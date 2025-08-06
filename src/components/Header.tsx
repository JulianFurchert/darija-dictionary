'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const translations = {
  de: {
    title: 'Darija Wörterbuch',
    switchToEnglish: 'Zu Englisch wechseln',
    switchToGerman: 'Zu Deutsch wechseln'
  },
  en: {
    title: 'Darija Dictionary',
    switchToEnglish: 'Switch to English',
    switchToGerman: 'Switch to German'
  }
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'de' | 'en'>('en');

  useEffect(() => {
    setMounted(true);
    // Determine language from pathname
    if (pathname.startsWith('/de')) {
      setLanguage('de');
    } else {
      setLanguage('en');
    }
  }, [pathname]);

  const handleLanguageToggle = () => {
    const newLanguage = language === 'de' ? 'en' : 'de';
    
    // Construct new path
    let newPath = pathname;
    if (newLanguage === 'de') {
      // Switch to German
      if (pathname.startsWith('/en')) {
        newPath = pathname.replace('/en', '/de');
      } else if (!pathname.startsWith('/de')) {
        newPath = '/de' + pathname;
      }
    } else {
      // Switch to English
      if (pathname.startsWith('/de')) {
        newPath = pathname.replace('/de', '/en');
      } else if (!pathname.startsWith('/en')) {
        newPath = '/en' + pathname;
      }
    }
    
    router.push(newPath);
  };

  const t = translations[language];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {mounted ? t.title : 'Darija Dictionary'}
            </h1>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center">
            <button
              onClick={handleLanguageToggle}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={mounted ? (language === 'de' ? t.switchToEnglish : t.switchToGerman) : 'Switch language'}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.01-4.65.83-6.99l2.53 2.52c.39.39.39 1.02 0 1.41zM4.27 3L3 4.27l2.62 2.62C5.23 7.5 5 8.22 5 9c0 2.21 1.79 4 4 4 .78 0 1.5-.23 2.11-.62L19.73 21 21 19.73 4.27 3zM14.73 13.08L11 9.35c-.31-.31-.85-.09-.85.36V12h2.54c.45 0 .67-.54.35-.85z"/>
              </svg>
              <span>{language === 'de' ? 'EN' : 'DE'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 