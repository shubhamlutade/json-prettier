import { useState, useCallback, useRef } from "react";

import "./App.css";

function App() {
  const [json, setJson] = useState("");
  const [isInvalidJson, setIsInvalidJson] = useState(true);
  const jsonRef = useRef(null);

  const validateJson = useCallback(() => {
    const value = jsonRef.current?.value ?? "";
    setJson(value);

    if (!value.trim()) {
      setIsInvalidJson(false);
      return;
    }

    try {
      setJson(JSON.stringify(JSON.parse(value), null, 4));
      setIsInvalidJson(false);
    } catch {
      setIsInvalidJson(true);
    }
  }, [json]);
  function copyToClipboard() {
    navigator.clipboard.writeText(json);
    jsonRef.current?.select();
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-800">JSON Validator</h1>
          <p>To format and validate your JSON, just copy + paste it below:</p>
        </div>

        <div className="p-6">
          <textarea
            className="h-[500px] w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={json}
            onChange={validateJson}
            ref={jsonRef}
          />
          {isInvalidJson && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              Invalid Json
            </p>
          )}
          {!isInvalidJson && (
            <p className="mt-2 text-sm text-green-600" role="alert">
              Valid Json
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            onClick={validateJson}
            type="button"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Validate
          </button>
          <button
            onClick={copyToClipboard}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
