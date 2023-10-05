import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import toast from "react-hot-toast";
import { CreateLinkMutation } from "../../pages/admin";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    };
  };

jest.mock("../../utils/uploadPhoto", () => ({
  uploadPhoto: jest.fn().mockResolvedValue(null) // Assuming you don't need a return value
}));

// jest.mock("react-hot-toast");
// toast.promise = jest.fn();

const mocks = [
  {
    request: {
      query: CreateLinkMutation,
      variables: {
        title: "Sample Title",
        url: "https://sample.com",
        category: "Sample Category",
        description: "Sample Description",
        imageUrl: "https://awes0me-l1nk.s3.amazonaws.com/sample.png"
      }
    },
    result: {
      data: {
        createLink: {
          title: "Sample Title",
          url: "https://sample.com",
          category: "Sample Category",
          description: "Sample Description",
          imageUrl: "https://awes0me-l1nk.s3.amazonaws.com/sample.png"
        }
      }
    }
  }
];

import Admin from "../../pages/admin"; // change to the path to your admin file

afterEach(() => {
  jest.clearAllMocks();
});

describe("Admin component", () => {
  it("displays toaster message when user fills all inputs and submits", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Admin />
      </MockedProvider>
    );

    // Fill out the form fields
    await userEvent.type(screen.getByPlaceholderText("Title"), "Sample Title");
    await userEvent.type(
      screen.getByPlaceholderText("Description"),
      "Sample Description"
    );
    await userEvent.type(
      screen.getByPlaceholderText("https://example.com"),
      "https://sample.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Name"),
      "Sample Category"
    );

    const file = new File(["image-content"], "sample.png", {
      type: "image/png"
    });
    const imageInput = screen.getByRole("uploadInput");
    await userEvent.upload(imageInput, file);

    // Submit the form
    await userEvent.click(screen.getByText("Create Link"));

    await waitFor(() => {
      expect(
        screen.getByText("Link successfully created!")
      ).toBeInTheDocument();
    });
  });
});
