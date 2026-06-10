import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders current page number", () => {
    render(
      <Pagination currentPage={3} totalPages={10} onPageChange={jest.fn()} />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={jest.fn()} />,
    );
    expect(screen.getByLabelText("Предыдущая страница")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination currentPage={10} totalPages={10} onPageChange={jest.fn()} />,
    );
    expect(screen.getByLabelText("Следующая страница")).toBeDisabled();
  });

  it("enables both buttons on middle page", () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={jest.fn()} />,
    );
    expect(screen.getByLabelText("Предыдущая страница")).toBeEnabled();
    expect(screen.getByLabelText("Следующая страница")).toBeEnabled();
  });

  it("calls onPageChange with previous page on prev click", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();

    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByLabelText("Предыдущая страница"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with next page on next click", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();

    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByLabelText("Следующая страница"));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("disables both buttons when only one page", () => {
    render(
      <Pagination currentPage={1} totalPages={1} onPageChange={jest.fn()} />,
    );
    expect(screen.getByLabelText("Предыдущая страница")).toBeDisabled();
    expect(screen.getByLabelText("Следующая страница")).toBeDisabled();
  });
});
