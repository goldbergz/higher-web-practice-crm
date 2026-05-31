import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import "./index.css";
import { store } from "./store";
import { setUser } from "./store/userSlice";

const savedUser = localStorage.getItem("currentUser");
if (savedUser) {
  try {
    const user = JSON.parse(savedUser);
    store.dispatch(setUser(user));
  } catch {
    localStorage.removeItem("currentUser");
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
