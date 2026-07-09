export function SendQuestionCard() {
  return (
    <section className="card">
      <h2>Send Question</h2>
      <p className="muted">This currently posts to /api/question.</p>

      <form
        className="question-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData: FormData = new FormData(e.currentTarget);
          const response: Response = await fetch("http://localhost:8000/api/chat/question", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            alert("Question sent successfully!");
            console.log("Question response:", await response.json());
          } else {
            alert("Failed to send question.");
          }
        }}
      >
        <input className="question-input" type="text" name="question" placeholder="Enter your question" required />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}   
