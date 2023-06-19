import { useState } from "react";

const ContactDisplay = ({
  contacts,
  editable,
  setEditable,
  handleEdit,
  handleDelete,
  handleEditSubmit,
  editedInput,
  handleEditChange,
}: any) => {
  const formattedContacts = contacts.map((contact: any) => {
    return (
      <div key={contact.id}>
        {editable === contact.id ? (
          <div>
            <form onSubmit={(e) => handleEditSubmit(e, contact.id)}>
              <label>
                firstName
                <input
                  placeholder={contact.firstName}
                  value={editedInput.firstName}
                  name="firstName"
                  type="text"
                  onChange={handleEditChange}
                />
              </label>
              <label>
                lastName
                <input
                  placeholder={contact.lastName}
                  value={editedInput.lastName}
                  name="lastName"
                  type="text"
                  onChange={handleEditChange}
                />
              </label>
              <label>
                favColor
                <input
                  placeholder={contact.favColor}
                  value={editedInput.favColor}
                  name="favColor"
                  type="text"
                  onChange={handleEditChange}
                />
              </label>
              <button type="submit">submit</button>
              <button type="button" onClick={() => setEditable(-1)}>
                cancel
              </button>
            </form>
          </div>
        ) : (
          <div className="contact-map" key={contact.id}>
            <div className="side front">
              <span>{contact.firstName}</span>
              <span>{contact.lastName}</span>
              <span>{contact.favColor}</span>
            </div>
            <div className="side back">
              <h4
                onClick={() =>
                  handleEdit(
                    contact.firstName,
                    contact.lastName,
                    contact.favColor,
                    contact.id
                  )
                }
              >
                edit contact
              </h4>
              <span>&nbsp;</span>
              <h4 onClick={() => handleDelete(contact.firstName, contact.id)}>
                delete contact
              </h4>
            </div>
          </div>
        )}
      </div>
    );
  });
  return <div>{formattedContacts}</div>;
};
export default ContactDisplay;
