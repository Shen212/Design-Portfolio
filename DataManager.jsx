import React from 'react';

// DataManager previously relied on Base44's backend for storing projects,
// experiences, and images. Since Base44 has been removed, this page is now
// a static read-only view. To add dynamic data management, integrate a
// backend such as Supabase, Firebase, or a simple JSON file in the repo.

export default function DataManager() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-lg text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Data Manager</h1>
        <p className="text-gray-500 leading-relaxed">
          This page previously used Base44's backend to manage projects, experiences,
          and images. Base44 has been removed from this project.
        </p>
        <p className="text-gray-500 leading-relaxed">
          To edit your portfolio content, update the static data arrays directly in{' '}
          <code className="bg-gray-100 px-1 rounded text-sm">src/pages/Home.jsx</code>.
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
