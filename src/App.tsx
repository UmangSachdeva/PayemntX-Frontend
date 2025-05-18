import { Route, Routes } from "react-router-dom";

import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Transactions from "./pages/transactions";
import DefaultLayout from "./layouts/default";
import NoSidebarLayout from "./layouts/nosidebarlayout";
import Analysis from "./pages/analysis";
import PrivateRoute from "./components/privateRoute";
// import About from "@/pages/about";

function App() {
  return (
    <>
      {/* Public Routes */}

      {/* Protected Routes */}

      <Routes>
        <Route key="public-routes" element={<NoSidebarLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route
          key="protected-routes"
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>
          }
        >
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Transactions />} path="/transactions" />
          <Route element={<Analysis />} path="/analysis" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
