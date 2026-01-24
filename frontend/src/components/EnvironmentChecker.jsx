import React, { useState } from 'react';

const EnvironmentChecker = () => {
  const [report, setReport] = useState(null);

  const checkEnvironment = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/doctor');
      const data = await response.json();
      setReport(data.report);
    } catch (error) {
      console.error('Error checking environment:', error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={checkEnvironment}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Vérifier l'environnement
      </button>
      {report && (
        <div className="mt-4 bg-gray-700 p-4 rounded">
          <h3 className="text-lg font-bold">Rapport d'environnement :</h3>
          <pre className="text-sm">{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EnvironmentChecker;