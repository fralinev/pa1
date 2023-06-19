import "./User.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCaretRight, FaCaretDown } from "react-icons/fa";

const User = () => {
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      console.log("hello");
      const response = await fetch(`http://localhost:5050/users/notes/${id}`);
      console.log(response);
      const formattedResponse = await response.json();
      console.log(formattedResponse);
      setNotes(formattedResponse.response);
    };
    fetchNotes();
  }, []);

  const handleClick = (event: any) => {
    if (selected === event.currentTarget.getAttribute("id")) {
      return setSelected(null);
    }
    setSelected(event.currentTarget.getAttribute("id"));
  };
  const handleSave = async (event: any) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5050/users/notes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: notes, userid: id }),
    });
  };

  return (
    <div>
      <h3>page for user {id}</h3>
      <div id="stats" className="user-info" onClick={handleClick}>
        <p>stats</p>
        {selected === "stats" ? <FaCaretDown /> : <FaCaretRight />}
      </div>
      {selected === "stats" && (
        <div>
          <li>lorem ipsum</li>
          <li>lorem ipsum</li>
          <li>lorem ipsum</li>
        </div>
      )}
      <div id="profile" className="user-info" onClick={handleClick}>
        <p>profile</p>
        {selected === "profile" ? <FaCaretDown /> : <FaCaretRight />}
      </div>
      {selected === "profile" && (
        <div>
          <li>лорем ипсум</li>
          <li>лорем ипсум</li>
          <li>лорем ипсум</li>
        </div>
      )}
      <div id="notes" className="user-info" onClick={handleClick}>
        <p>notes</p>
        {selected === "notes" ? <FaCaretDown /> : <FaCaretRight />}
      </div>
      {selected === "notes" && (
        <div>
          <form onSubmit={handleSave}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <button>save</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default User;
