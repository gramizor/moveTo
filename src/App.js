import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import NotificationWrapper from "./components/NotificationWrapper";
import Layout from "./components/Layout";
import MoveTo from "./components/MoveTo";
const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : _jsx(Navigate, { to: "/sec/auth" });
};
const PublicRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return !token ? element : _jsx(Navigate, { to: "/sec" });
};
const App = () => {
    return (_jsxs(_Fragment, { children: [_jsx(NotificationWrapper, {}), _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/sec/auth", element: _jsx(PublicRoute, { element: _jsx(Auth, {}) }) }), _jsx(Route, { path: "/sec/", element: _jsx(PrivateRoute, { element: _jsx(Layout, {}) }), children: _jsx(Route, { path: "move_to", element: _jsx(MoveTo, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/sec/" }) })] }) })] }));
};
export default App;
