import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [serverResponse, setServerResponse] = useState({
    user: {},
    message: "",
  });
  const { setCurrentUser } = useContext(UserContext);
  // console.log(useContext(UserContext));

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5050/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const parsedResponse = await response.json();
    setServerResponse(parsedResponse);
    if (parsedResponse.message === "OK") {
      setCurrentUser(parsedResponse.user);
      navigate("/");
    }
    setInput((prev) => {
      return { ...prev, username: "", password: "" };
    });
    console.log(input);
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          username
          <input
            type="text"
            value={input.username}
            name="username"
            onChange={handleChange}
          />
        </label>
        <label>
          password
          <input
            type="password"
            value={input.password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSubmit}>submit</button>
        <h4>{serverResponse.message}</h4>
      </form>
    </div>
  );
};

export default Login;
