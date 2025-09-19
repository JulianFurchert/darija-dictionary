import { dictionaryData } from '../../data/dictionary';
import EntryClient from '../../components/EntryClient';

// Generate static params for all entries
export async function generateStaticParams() {
  return dictionaryData.map((entry) => ({
    id: entry.id,
  }));
}

export default function EntryPage({ params }: { params: { id: string } }) {
  const entry = dictionaryData.find(e => e.id === params.id);
  
  if (!entry) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Entry not found
          </h1>
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Dictionary
          </a>
        </div>
      </div>
    );
  }

  return <EntryClient entry={entry} />;
} 