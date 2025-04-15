import { Route, Routes } from "react-router-dom";

import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import PrivateRoute from "./components/PrivateRoute";
// import About from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Signup />} path="/signup" />


      <Route
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
        path="/dashboard"
      />
    </Routes>
  );
}

export default App;
