import { useState } from "react";

const Test = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessage("form submitted");
    setInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setInput(e.target.value)} />
        <button>submit</button>
      </form>
      <hr />
      <h4>{message}</h4>
    </div>
  );
};
export default Test;
