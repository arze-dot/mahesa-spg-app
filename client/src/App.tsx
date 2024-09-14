import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Assetinput from "./pages/input/asset/Assetinput";
import Productinput from "./pages/input/product/Productinput";
import { URL } from "./config/url_constant";
import InputEmployee from "./pages/input/employee/InputEmployee";
import EditEmployee from "./pages/input/employee/EditEmployee";
import Outlet from "./pages/input/outlet/Outlet";
import InputOutlet from "./pages/input/outlet/InputOutlet";
import EditOutlet from "./pages/input/outlet/EditOutlet";

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

          {/* INPUT OUTLET */}
          <Route path="input/outlet" element={<Outlet />} />
          <Route path={URL.INPUT.INDEX + URL.INPUT.OUTLET.CREATE} element={<InputOutlet />} />
          <Route path={URL.INPUT.INDEX + URL.INPUT.OUTLET.EDIT + '/:id'} element={<EditOutlet />} />

          {/* INPUT EMPLOYEE */}
          <Route path="input/employee" element={<Employee />} />
          <Route path={URL.INPUT.INDEX + URL.INPUT.EMPLOYEE.CREATE} element={<InputEmployee />} />
          <Route path={URL.INPUT.INDEX + URL.INPUT.EMPLOYEE.EDIT + '/:id'} element={<EditEmployee />} />


          <Route path="input/product" element={<Product />} />
          <Route path="input/asset" element={<Asset />} />
          <Route path="report" element={<Report />} />
          <Route path="report/daily-spg" element={<ReportSpg />} />
          <Route path="report/daily-competitor" element={<ReportCompetitor />} />


          <Route path="input/Assetinput" element={<Assetinput />} />
          <Route path="input/Productinput" element={<Productinput />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

