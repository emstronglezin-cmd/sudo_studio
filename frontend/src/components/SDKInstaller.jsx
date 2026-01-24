import React, { useState } from 'react';

const SDKInstaller = () => {
  const [status, setStatus] = useState('');

  const installSDK = async () => {
    const sdkName = 'Node.js';
    const downloadUrl = 'https://nodejs.org/dist/v16.20.0/node-v16.20.0-x64.msi';
    const installPath = 'C:/SDKs/NodeJS';

    try {
      const response = await fetch('http://localhost:3001/api/install-sdk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sdkName, downloadUrl, installPath }),
      });

      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      console.error('Error installing SDK:', error);
      setStatus('Failed to start SDK installation.');
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={installSDK}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Installer Node.js SDK
      </button>
      {status && (
        <div className="mt-4 bg-gray-700 p-4 rounded">
          <p className="text-sm">{status}</p>
        </div>
      )}
    </div>
  );
};

export default SDKInstaller;