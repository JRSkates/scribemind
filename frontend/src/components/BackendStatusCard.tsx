import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
};

export function BackendStatusCard() {
  const [apiStatus, setApiStatus] = useState<string>("Checking API...");

  const isHealthy = apiStatus.toLowerCase() === "healthy";

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
        console.log(error);
        setApiStatus("API unavailable");
      }
    }

    checkHealth();
  }, []);

  return (
    <section className="card status-card">
      <div>
        <h2>Backend Status</h2>
        <p className="muted">Live check against FastAPI health endpoint</p>
      </div>
      <span className={`status-pill ${isHealthy ? "ok" : "warn"}`}>{apiStatus}</span>
    </section>
  );
}
