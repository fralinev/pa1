import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Users from "./Users";
import Login from "./Login";
import { setupServer } from "msw/node";
import { rest } from "msw";


test("it should render an input and a button to the screen", () => {
  render(
    <MemoryRouter>
      <Users />
    </MemoryRouter>
  );
  const input = screen.getByRole("spinbutton");
  const button = screen.getByRole("button");
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("empties the two inputs when form is submitted", async () => {
  render(
    <UserContext.Provider value={{ currentUser: null, setCurrentUser: null }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </UserContext.Provider>
  );
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const passwordInput = screen.getByRole("textbox", { name: /password/i });
  const button = screen.getByRole("button");
  act(() => {
    user.click(nameInput);
    user.keyboard("jane");
    user.click(passwordInput);
    user.keyboard("bitcom");
    user.click(button);
  });

  await waitFor(() => expect(nameInput).toHaveValue(""));
  await waitFor(() => expect(passwordInput).toHaveValue(""));
});

// IMAGES

const handlers = [rest.get("https://api.unsplash.com/search/photos", (req, res, ctx) => {
  return res(
    ctx.json({
      items: [
        {
          
        }
      ]
    })
  )
})];


test("it should render two images", () => {});
