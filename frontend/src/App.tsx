import { useEffect, useState } from "react";
import "./index.css";

type HealthResponse = {
  status: string;
};

function App() {
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
        setApiStatus("API unavailable");
      }
    }

    checkHealth();
  }, []);

  return (
    <main className="app-shell">
      <div className="mesh" aria-hidden="true" />
      <section className="panel">
        <header className="hero">
          <p className="eyebrow">ScribeMind</p>
          <h1>Document Chat Workspace</h1>
          <p className="subtitle">Upload content and prepare it for AI-powered Q&A.</p>
        </header>

        <section className="card status-card">
          <div>
            <h2>Backend Status</h2>
            <p className="muted">Live check against FastAPI health endpoint</p>
          </div>
          <span className={`status-pill ${isHealthy ? "ok" : "warn"}`}>
            {apiStatus}
          </span>
        </section>

        <section className="card">
          <h2>Upload Document</h2>
          <p className="muted">This currently posts to /api/upload.</p>

        <form
            className="upload-form"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const response = await fetch("http://localhost:8000/api/upload", {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              alert("File uploaded successfully!");
              console.log("File upload response:", await response.json());
            } else {
              alert("File upload failed.");
            }
          }}
        >
          <input className="file-input" type="file" name="file" required />
          <button className="upload-button" type="submit">
            Upload
          </button>
        </form>
        </section>
      </section>
    </main>
  );
}

export default App;
