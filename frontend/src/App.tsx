import { useEffect, useState } from "react";
import "./index.css";

type HealthResponse = {
  status: string;
};

function App() {
  const [apiStatus, setApiStatus] = useState<string>("Checking API...");

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch("http://localhost:8000/api/health");

        if (!response.ok) {
          throw new Error("API health check failed");
        }

        const data: HealthResponse = await response.json();
        setApiStatus(data.status);
      } catch (error) {
        setApiStatus("API unavailable");
      }
    }

    checkHealth();
  }, []);

  return (
    <main className="app">
      <h1>ScribeMind</h1>
      <p>AI-powered document Q&A platform</p>

      <section>
        <h2>Backend Status</h2>
        <p>{apiStatus}</p>
      </section>
    </main>
  );
}

export default App;
