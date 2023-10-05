import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashBoard from "../../pages/dashBoard/index";
import { MockedProvider } from "@apollo/client/testing";

it("rendering hellow world in the document", () => {
  render(
    <MockedProvider mocks={undefined} addTypename={false}>
      <DashBoard />
    </MockedProvider>
  );
  const title = screen.getByRole("heading", { name: /hello, world/i });
  expect(title).toBeInTheDocument();
});
