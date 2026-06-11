import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import LoginPage from "../../pages/LoginPage/LoginPage";
import userReducer from "../../store/userSlice";

const mockLoginUser = jest.fn();

jest.mock("../../api", () => ({
  useLoginUserMutation: () => [mockLoginUser, { isLoading: false }],
}));

const createStore = () =>
  configureStore({
    reducer: { user: userReducer },
  });

const renderLoginPage = () => {
  const store = createStore();
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    ),
  };
};

describe("LoginPage integration", () => {
  beforeEach(() => {
    mockLoginUser.mockReset();
  });

  it("renders login form with email and password fields", () => {
    renderLoginPage();

    expect(screen.getByText("Вход в аккаунт")).toBeInTheDocument();
    expect(screen.getByLabelText(/Email или логин/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Войти/ })).toBeInTheDocument();
  });

  it("calls loginUser with form data on submit", async () => {
    const user = userEvent.setup();
    mockLoginUser.mockReturnValue({
      unwrap: () =>
        Promise.resolve({
          id: "1",
          email: "test@test.com",
          name: "Test",
          surname: "",
          accName: "test",
          createdAt: "2024-01-01",
        }),
    });

    renderLoginPage();

    await user.type(screen.getByLabelText(/Email или логин/), "test@test.com");
    await user.type(screen.getByLabelText(/Пароль/), "password123");
    await user.click(screen.getByRole("button", { name: /Войти/ }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "password123",
      });
    });
  });

  it("displays error message on failed login", async () => {
    const user = userEvent.setup();
    mockLoginUser.mockReturnValue({
      unwrap: () => Promise.reject({ data: { message: "Неверный пароль" } }),
    });

    renderLoginPage();

    await user.type(screen.getByLabelText(/Email или логин/), "test@test.com");
    await user.type(screen.getByLabelText(/Пароль/), "wrong");
    await user.click(screen.getByRole("button", { name: /Войти/ }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Неверный пароль");
    });
  });

  it("shows generic error when API returns no message", async () => {
    const user = userEvent.setup();
    mockLoginUser.mockReturnValue({
      unwrap: () => Promise.reject({}),
    });

    renderLoginPage();

    await user.type(screen.getByLabelText(/Email или логин/), "test@test.com");
    await user.type(screen.getByLabelText(/Пароль/), "password");
    await user.click(screen.getByRole("button", { name: /Войти/ }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Ошибка входа. Попробуйте снова.",
      );
    });
  });
});
