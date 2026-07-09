import { useEffect, useRef, useState } from "react";

export function ChatSseCard() {
  const [sseStatus, setSseStatus] = useState<string>("Disconnected");
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  function connectToChatSSE() {
    if (eventSourceRef.current) {
      return;
    }

    try {
      const eventSource = new EventSource("http://localhost:8000/api/chat/response");
      eventSourceRef.current = eventSource;
      setSseStatus("Connected");

      eventSource.onmessage = (event) => {
        console.log("Received SSE message:", event.data);
      };

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        eventSource.close();
        eventSourceRef.current = null;
        setSseStatus("Disconnected");
      };
    } catch (error) {
      console.error("Failed to connect to SSE:", error);
      setSseStatus("Disconnected");
    }
  }

  function disconnectFromChatSSE() {
    if (!eventSourceRef.current) {
      return;
    }

    eventSourceRef.current.close();
    eventSourceRef.current = null;
    setSseStatus("Disconnected");
  }

  return (
    <section className="card">
      <h2>Chat</h2>
      <p className="muted">This currently connects to /api/chat/response.</p>
      <p className="muted">SSE status: {sseStatus}</p>
      <button
        className="chat-button"
        onClick={sseStatus === "Connected" ? disconnectFromChatSSE : connectToChatSSE}
      >
        {sseStatus === "Connected" ? "Disconnect Chat SSE" : "Connect to Chat SSE"}
      </button>
    </section>
  );
}
