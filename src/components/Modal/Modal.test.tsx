import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal", () => {
  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()} title="Test">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("calls onClose when Escape key is pressed", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <p>Content</p>
      </Modal>,
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when overlay is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <p>Content</p>
      </Modal>,
    );

    await user.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when modal body is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <p>Content</p>
      </Modal>,
    );

    await user.click(screen.getByRole("document"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("renders headerRight when provided", () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test" headerRight={<span>Extra</span>}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByText("Extra")).toBeInTheDocument();
  });

  it("has accessible attributes", () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Accessible Modal">
        <p>Content</p>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
  });

  it("does not attach escape listener when closed", () => {
    const addSpy = jest.spyOn(document, "addEventListener");
    const { unmount } = render(
      <Modal isOpen={false} onClose={jest.fn()} title="Test">
        <p>Content</p>
      </Modal>,
    );
    expect(addSpy).not.toHaveBeenCalledWith("keydown", expect.any(Function));
    addSpy.mockRestore();
    unmount();
  });
});
