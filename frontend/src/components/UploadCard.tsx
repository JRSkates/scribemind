export function UploadCard() {
  return (
    <section className="card">
      <h2>Upload Document</h2>
      <p className="muted">This currently posts to /api/upload.</p>

      <form
        className="upload-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData: FormData = new FormData(e.currentTarget);
          const response: Response = await fetch("http://localhost:8000/api/upload", {
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
  );
}
