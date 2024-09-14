import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const breadcrumbNameMap: { [key: string]: string } = {
  "/dashboard": "Home",
  "/dashboard/input": "Input",
  "/dashboard/input/product": "Product",
  "/dashboard/input/asset": "Asset",
  "/dashboard/input/employee": "Employee",
  "/dashboard/input/Outletlist": "Outlet",
  "/dashboard/input/Outletinput": "Outlet input",
  "/dashboard/report": "Report",
  "/dashboard/report/daily-spg": "Daily SPG Report",
  "/dashboard/report/daily-competitor": "Daily Competitor Report",
  "/dashboard/input/Productinput": "Product Input",
  "/dashboard/input/Assetinput": "Asset input",
  "/dashboard/input/input-employee": "Add Employee",
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleBreadcrumbClick = () => {
    navigate(-1);
  };

  return (
    <nav className="p-2 rounded mt-4">
      <ul className="flex items-center space-x-2">
        <li className="flex items-center">
          {currentPath !== "/dashboard" && (
            <span
              className="text-white cursor-pointer hover:underline text-[24px]"
              onClick={handleBreadcrumbClick}
            >
              <Icon icon="material-symbols:chevron-left" />
            </span>
          )}
          <span
            className={`ml-2 text-white cursor-pointer hover:underline text-[17px] ${currentPath === "/dashboard" ? "text-[20px]" : ""
              }`}
            onClick={handleBreadcrumbClick}
          >
            {breadcrumbNameMap[currentPath] || "Page"}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
