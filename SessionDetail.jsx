
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SessionDetail({ sessionId, onBack }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    axios.get(`/api/sessions/${sessionId}`).then(res => setSession(res.data));
  }, [sessionId]);

  const downloadReport = () => {
    const content = [
      `Session ID: ${session._id}`,
      `Created: ${new Date(session.createdAt).toLocaleString()}`,
      `Risk Score: ${session.riskScore || 'Not Evaluated'}`,
      '',
      ...session.logs.map(
        (log, i) => `#${i + 1}\nUser: ${log.user}\nAI: ${log.ai}\nTimestamp: ${new Date(log.timestamp).toLocaleString()}\n`
      )
    ].join('\n\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `session-${session._id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!session) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 text-sm text-blue-600 underline">← Back to Sessions</button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Session Detail: {session._id}</h2>
        <button onClick={downloadReport} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Download Report</button>
      </div>
      <p className="mb-2">Created: {new Date(session.createdAt).toLocaleString()}</p>
      <p className="mb-4">Risk Score: {session.riskScore || 'Not Evaluated'}</p>
      <div className="space-y-2">
        {session.logs.map((log, index) => (
          <div key={index} className="bg-gray-50 border p-2 rounded">
            <p><strong>User:</strong> {log.user}</p>
            <p><strong>AI:</strong> {log.ai}</p>
            <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
