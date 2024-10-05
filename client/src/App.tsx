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
import { URL } from "./config/url_constant";
import EditEmployee from "./pages/input/employee/EditEmployee";
import Outlet from "./pages/input/outlet/Outlet";
import InputOutlet from "./pages/input/outlet/InputOutlet";
import EditOutlet from "./pages/input/outlet/EditOutlet";
import InputProduct from "./pages/input/product/InputProduct";
import EditProduct from "./pages/input/product/EditProduct";
import InputAsset from "./pages/input/asset/InputAsset";
import EditAsset from "./pages/input/asset/EditAsset";
import SPGInput from "./pages/public/SPGInput";
import DailyReportAttendance from "./pages/report/daily-report-attendance/DailyReportAttendance";
import InputEmployee from "./pages/input/employee/Inputemployee";

const App: React.FC = () => {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/input-data" element={<SPGInput />} />
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

          {/* INPUT PRODUCT */}
          <Route path="input/product" element={<Product />} />
          <Route path={URL.INPUT.INDEX + URL.INPUT.PRODUCT.CREATE} element={<InputProduct />} />
          <Route path={URL.INPUT.INDEX + URL.INPUT.PRODUCT.EDIT + '/:id'} element={<EditProduct />} />

          {/* INPUT ASSET */}
          <Route path="input/asset" element={<Asset />} />
          <Route path={URL.INPUT.INDEX + URL.INPUT.ASSET.CREATE} element={<InputAsset />} />
          <Route path={URL.INPUT.INDEX + URL.INPUT.ASSET.EDIT + '/:id'} element={<EditAsset />} />

          <Route path="report" element={<Report />} />
          <Route path="report/daily-spg" element={<ReportSpg />} />
          <Route path="report/daily-competitor" element={<ReportCompetitor />} />
          <Route path="report/daily-report-before-after" element={<DailyReportAttendance />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

