import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });
  const [serverResponse, setServerResponse] = useState({
    status: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5050/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const parsedResponse = await response.json();
    setServerResponse(parsedResponse);
    if (parsedResponse.status === "OK") navigate("/login");
  };

  return (
    <div>
      <h2>Signup</h2>
      <nav>
        <label>
          first name
          <input
            type="text"
            name="firstname"
            value={input.firstname}
            onChange={handleChange}
          />
        </label>
        <label>
          last name
          <input
            type="text"
            name="lastname"
            value={input.lastname}
            onChange={handleChange}
          />
        </label>
        <label>
          email
          <input
            type="text"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </label>
        <label>
          username
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={handleChange}
          />
        </label>
        <label>
          password
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSubmit}>submit</button>
        <h4>{serverResponse.message}</h4>
      </nav>
    </div>
  );
};
export default Signup;
