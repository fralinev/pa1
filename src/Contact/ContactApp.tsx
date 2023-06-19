import ContactForm from "./ContactForm";
import { useEffect, useState } from "react";
import "./ContactApp.css";
import ContactDisplay from "./ContactDisplay";

const ContactApp = () => {
  const [contacts, setContacts] = useState<any>([]);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    favColor: "",
  });
  const [editedInput, setEditedInput] = useState({
    firstName: "",
    lastName: "",
    favColor: "",
  });
  const [editable, setEditable] = useState(-1);

  useEffect(() => {
    const getContacts = async () => {
      const response = await fetch("http://localhost:5050/contacts");
      const parsedResponse = await response.json();
      setContacts(parsedResponse);
    };
    getContacts();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    input: any
  ) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5050/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const parsedResponse = await response.json();
    setContacts((prev: any) => {
      return [...prev, ...parsedResponse];
    });
    setInput({ firstName: "", lastName: "", favColor: "" });
  };

  const handleEditSubmit = async (e: any, id: number) => {
    e.preventDefault();
    console.log("handling edit submit...", input);
    const response = await fetch("http://localhost:5050/contacts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.assign(editedInput, { id })),
    });
    const formattedResponse = await response.json();
    console.log("formatted response", formattedResponse);
    setContacts([...formattedResponse]);
    setEditedInput({ firstName: "", lastName: "", favColor: "" });
    setEditable(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleEditChange = (e: any) => {
    setEditedInput((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleDelete = async (name: string, id: number) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmed) {
      const response = await fetch(`http://localhost:5050/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const formattedResponse = await response.json();
      setContacts([...formattedResponse]);
    } else return;
  };

  const handleEdit = (
    firstName: string,
    lastName: string,
    favColor: string,
    id: number
  ) => {
    setEditable(id);
    setEditedInput({ firstName, lastName, favColor });
  };

  return (
    <div>
      <div>
        <ContactForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          input={input}
          setInput={setInput}
          style={{ margin: "20px 0 20px 20px" }}
        />
        <hr />
        <div style={{ margin: "20px 0 0 20px", fontWeight: "bold" }}>
          <span>firstName -- </span>
          <span>lastName -- </span>
          <span>favColor</span>
        </div>
        <ContactDisplay
          editedInput={editedInput}
          handleEditSubmit={handleEditSubmit}
          editable={editable}
          contacts={contacts}
          handleEditChange={handleEditChange}
          setEditable={setEditable}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ContactApp;
