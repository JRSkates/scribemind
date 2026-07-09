import { BackendStatusCard } from "./components/BackendStatusCard";
import { ChatSseCard } from "./components/ChatSseCard";
import { UploadCard } from "./components/UploadCard";
import { SendQuestionCard } from "./components/SendQuestionCard";
import "./index.css";

function App() {
  return (
    <main className="app-shell">
      <div className="mesh" aria-hidden="true" />
      <section className="panel">
        <header className="hero">
          <p className="eyebrow">ScribeMind</p>
          <h1>Document Chat Workspace</h1>
          <p className="subtitle">Upload content and prepare it for AI-powered Q&A.</p>
        </header>
        <BackendStatusCard />
        <UploadCard />
        <ChatSseCard />
        <SendQuestionCard />
      </section>
    </main>
  );
}

export default App;
