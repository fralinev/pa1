import { useState } from "react";

const ContactForm = ({
  handleSubmit,
  input,
  setInput,
  style,
  handleChange,
}: any) => {
  return (
    <div style={style}>
      <form onSubmit={(e) => handleSubmit(e, input)}>
        <label>
          First Name
          <input
            name="firstName"
            value={input.firstName}
            type="text"
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name
          <input
            name="lastName"
            value={input.lastName}
            type="text"
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Color
          <input
            name="favColor"
            value={input.favColor}
            type="text"
            onChange={handleChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default ContactForm;
