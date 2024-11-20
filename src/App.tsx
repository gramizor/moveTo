import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import NotificationWrapper from "./components/NotificationWrapper";
import Layout from "./components/Layout";
import MoveTo from "./components/MoveTo";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/sec/auth" />;
};

const PublicRoute = ({ element }: { element: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return !token ? element : <Navigate to="/sec" />;
};

const App = () => {
  return (
    <>
      <NotificationWrapper />
      <BrowserRouter>
        <Routes>
          <Route
            path="/sec/auth"
            element={<PublicRoute element={<Auth />} />}
          />

          <Route path="/sec" element={<PrivateRoute element={<Layout />} />}>
            <Route path="move_to" element={<MoveTo />} />
          </Route>

          <Route path="*" element={<Navigate to="/sec" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
