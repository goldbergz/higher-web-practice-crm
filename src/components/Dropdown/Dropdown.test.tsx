import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";
import type { DropdownOption } from "./Dropdown";

const options: DropdownOption[] = [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
  { label: "Option 3", value: "opt3" },
];

describe("Dropdown", () => {
  it("renders with placeholder when no value selected", () => {
    render(
      <Dropdown
        options={options}
        value=""
        onChange={jest.fn()}
        placeholder="Select..."
      />,
    );
    expect(screen.getByText("Select...")).toBeInTheDocument();
  });

  it("renders selected option label", () => {
    render(
      <Dropdown
        options={options}
        value="opt2"
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("shows menu on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        options={options}
        value=""
        onChange={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("calls onChange and closes menu when option is selected", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Dropdown
        options={options}
        value=""
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Option 1"));

    expect(onChange).toHaveBeenCalledWith("opt1");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes menu on Escape key", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        options={options}
        value=""
        onChange={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders label and required indicator", () => {
    render(
      <Dropdown
        options={options}
        value=""
        onChange={jest.fn()}
        label="Status"
        required
      />,
    );
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(
      <Dropdown
        options={options}
        value=""
        onChange={jest.fn()}
        error="This field is required"
        label="Status"
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("This field is required");
  });

  it("highlights selected option in the menu", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        options={options}
        value="opt2"
        onChange={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("button"));
    const menuItems = screen.getAllByRole("option");
    const option2 = menuItems.find((item) => item.textContent === "Option 2");
    expect(option2).toHaveAttribute("aria-selected", "true");
    const option1 = menuItems.find((item) => item.textContent === "Option 1");
    expect(option1).toHaveAttribute("aria-selected", "false");
  });
});
