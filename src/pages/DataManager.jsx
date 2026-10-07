import React from 'react';

// This page is a static pointer for editors — the portfolio's actual content
// lives in the JSON files under /content, not in a database or admin UI.

export default function DataManager() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-lg text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Data Manager</h1>
        <p className="text-gray-500 leading-relaxed">
          This portfolio has no admin backend. To edit content, update{' '}
          <code className="bg-gray-100 px-1 rounded text-sm">content/projects.json</code>{' '}
          and{' '}
          <code className="bg-gray-100 px-1 rounded text-sm">content/experience.json</code>{' '}
          directly, and add project images under{' '}
          <code className="bg-gray-100 px-1 rounded text-sm">public/images/projects/&lt;id&gt;/</code>.
        </p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Portfolio
        </a>
      </div>
    </div>
  );
}
