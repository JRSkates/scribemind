export function SendQuestionCard() {
  return (
    <section className="card">
      <h2>Send Question</h2>
      <p className="muted">This currently posts JSON to /api/chat/question.</p>

      <form
        className="question-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const message = String(formData.get("message") ?? "").trim();

          const response: Response = await fetch("http://localhost:8000/api/chat/question", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
          });

          if (response.ok) {
            alert("Question sent successfully!");
            console.log("Question response:", await response.json());
          } else {
            alert("Failed to send question.");
          }
        }}
      >
        <input className="question-input" type="text" name="message" placeholder="Enter your question" required />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}   
