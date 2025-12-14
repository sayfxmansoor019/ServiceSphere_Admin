import { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

import {
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";

type TCustomFilterDrawerProps = {
  isFiltered: boolean;
  children: ReactNode;
};

const CustomFilterDrawer = ({
  isFiltered,
  children,
}: TCustomFilterDrawerProps) => {
  const { isToggleFilterDrawer, handleFilterDrawer } = useAuth();

  const toggleDrawer = (status: boolean) => {
    handleFilterDrawer(status);
  };

  return (
    <div className="custom-filter-container">
      <div className="d-flex align-items-center">
        <div
          className={`btn btn-outline-slate btn-md mw-auto position-relative ${
            isFiltered ? "filtered" : ""
          }`}
          onClick={() => {
            toggleDrawer(true);
          }}
        >
          <AdjustmentsHorizontalIcon className="icon" />
          <span className="ms-2 d-none d-md-inline-block">Filter</span>
          {isFiltered && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              1<span className="visually-hidden">unread messages</span>
            </span>
          )}
        </div>
      </div>
      <div
        className={`custom-filter-area ${isToggleFilterDrawer ? "show" : ""}`}
      >
        <div className="overlay"></div>
        <div
          className={`custom-filter-box ${isToggleFilterDrawer ? "show" : ""}`}
        >
          <div className="close-icon pt-4 py-2 px-3 d-flex justify-content-end">
            <XMarkIcon
              className="icon icon-lg text-slate-700 pointer"
              onClick={() => {
                toggleDrawer(false);
              }}
            />
          </div>
          <div className="custom-filter-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomFilterDrawer;
