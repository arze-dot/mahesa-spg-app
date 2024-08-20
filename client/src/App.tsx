import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
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
import Inputemployee from "./pages/input/employee/Inputemployee";
import Assetinput from "./pages/input/asset/Assetinput";
import Productinput from "./pages/input/product/Productinput";

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
          <Route path="input/Outlet" element={<Outlet />} />
          <Route path="input/product" element={<Product />} />
          <Route path="input/asset" element={<Asset />} />
          <Route path="input/employee" element={<Employee />} />
          <Route path="report" element={<Report />} />
          <Route path="report/daily-spg" element={<ReportSpg />} />
          <Route path="report/daily-competitor" element={<ReportCompetitor />} />
          <Route path="input/Inputemployee" element={<Inputemployee />} />
          <Route path="input/Assetinput" element={<Assetinput />} />
          <Route path="input/Productinput" element={<Productinput />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

