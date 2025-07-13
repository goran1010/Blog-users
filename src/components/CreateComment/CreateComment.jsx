import { useState } from "react";

export default function CreateComment({ postId }) {
  const [text, setText] = useState("");
  function handleText(e) {
    setText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(
      `http://localhost:3000/api/posts/${postId}`,
      { mode: "POST" },
      { headers: { "Content-Type": "application/json" } }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <legend>Create a new comment:</legend>
      <div className="text">
        <label htmlFor="text">Write text:</label>
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={handleText}
        />
        <button type="submit">Post comment</button>
      </div>
    </form>
  );
}
