import { BrowserRouter, Outlet, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./navigator/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/home/Home";
import Input from "./pages/input/Input";
import Product from "./pages/input/product/Product";
import Asset from "./pages/input/asset/Asset";
import Employee from "./pages/input/employee/Employee";
import Report from "./pages/report/Report";
import ReportSpg from "./pages/report/daily-report-spg/ReportSpg";
import ReportCompetitor from "./pages/report/daily-report-competitor/ReportCompetitor";

const App: React.FC = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="input" element={<Input />} />
          <Route path="input/outlet" element={<Outlet />} />
          <Route path="input/product" element={<Product />} />
          <Route path="input/asset" element={<Asset />} />
          <Route path="input/employee" element={<Employee />} />
          <Route path="report" element={<Report />} />
          <Route path="report/daily-spg" element={<ReportSpg />} />
          <Route path="report/daily-competitor" element={<ReportCompetitor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

