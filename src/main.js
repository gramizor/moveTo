import { jsx as _jsx } from "react/jsx-runtime";
// src/index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./slices/store";
const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(_jsx(StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }));
}
else {
    console.error("Root element not found");
}
