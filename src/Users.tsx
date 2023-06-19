import "./Users.css";
import { useEffect, useState } from "react";
import { addUsers, sortList } from "./utilities/utilities";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export interface UserProperties {
  firstname: string;
  lastname: string;
  email: string;
  id: number;
  username: string;
  password: string;
}

const Users = () => {
  const [users, setUsers] = useState<any>([]);
  const [input, setInput] = useState(1);
  const [hovered, setHovered] = useState(-1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5050/users");
      const parsedResponse = await response.json();
      setUsers(parsedResponse);
    };
    fetchUsers();
  }, []);

  const handleChange = (event: any) => {
    setInput(event.target.value);
  };
  const handleClick = async () => {
    const batch: any = [];
    const usersToAdd = addUsers(input);
    for (let i = 0; i < usersToAdd.length; i++) {
      const response = await fetch("http://localhost:5050/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usersToAdd[i]),
      });
      const parsedResponse = await response.json();
      batch.push(parsedResponse.user);
    }
    console.log("batch: ", batch);
    console.log("users: ", users);
    setUsers((prev: any) => {
      return [...prev, ...batch];
    });
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`http://localhost:5050/users/${id}`, {
      method: "DELETE",
    });
    const parsedResponse = await response.json();
    if (parsedResponse.status === "OK") {
      setUsers(users.filter((user: UserProperties) => user.id !== id));
    }
  };

  const handleSort = (event: any) => {
    const header = event.target.innerHTML.replace(" ", "");
    const sortedUsers = sortList(users, header);
    setUsers(sortedUsers);
  };

  const handleUserClick = (user: any) => {
    // const formattedString = user.username.replace(/[ .]/g, "-");
    navigate(`/users/${user.id}`);
  };

  const mappedUsers = (
    <table className="users-table">
      <thead>
        <tr>
          <th onClick={handleSort}>first name</th>
          <th onClick={handleSort}>last name</th>
          <th onClick={handleSort}>email</th>
          <th onClick={handleSort}>username</th>
          <th onClick={handleSort}>password</th>
          <th>id</th>
        </tr>
      </thead>
      {users.map((user: UserProperties, i: number) => {
        return (
          <tbody
            key={user.id}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(-1)}
          >
            <tr onClick={() => handleUserClick(user)}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.id}</td>
              {hovered === i ? (
                <div
                  onClick={() => handleDelete(user.id)}
                  style={{ cursor: "pointer" }}
                >
                  <FaTrashAlt />
                </div>
              ) : null}
            </tr>
          </tbody>
        );
      })}
    </table>
  );

  return (
    <div className="users-container">
      <div>{mappedUsers}</div>
      <div className="add-users-div">
        <p>add</p>
        <input type="number" value={input} onChange={handleChange} />
        <p>fake users</p>
        <button onClick={handleClick}>submit</button>
      </div>
    </div>
  );
};
export default Users;
