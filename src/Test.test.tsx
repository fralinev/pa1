import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import Test from "./Test";
import { screen, render, waitFor, act } from "@testing-library/react";

test("it should should message after submitting", async () => {
  render(<Test />);

  const nameInput = screen.getByRole("textbox");
  const button = screen.getByRole("button");
  act(() => {
    user.click(nameInput);
    user.keyboard("jane");
    user.click(button);
  });

  //   screen.debug;
  //   screen.debug;

  const message = await screen.findByText("form submitted");
  expect(message).toBeInTheDocument();

  act(() => {
    user.clear(nameInput);
  });
});

// const pause = (): Promise<void> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 100);
//   });
// };
