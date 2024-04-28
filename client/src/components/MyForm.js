import { useState } from "react";
import { socket } from "../socket";

export function MyForm({ messages }) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit("message", value, () => {
      setIsLoading(false);
    });
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={(e) => setValue(e.target.value)} />

        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
      <ul>
        {messages.length > 0 &&
          messages.map((message) => <li key={message}>{message}</li>)}
      </ul>
    </>
  );
}
