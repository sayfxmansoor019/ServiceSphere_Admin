import { Link, useLocation } from "react-router-dom";

import { HomeIcon } from "@heroicons/react/24/solid";

type TBreadcrumbProps = {
  noLastIndex: boolean;
};

const Breadcrumb = ({ noLastIndex }: TBreadcrumbProps) => {
  const location = useLocation();
  const crumbs = location.pathname.split("/").filter((crumb) => crumb !== "");

  const getLocationName = (item: string) => {
    return item.replace(/-/g, " ");
  };

  return (
    <div className="breadcrumb-wrapper">
      <Link
        className="text-capitalize fw-medium item d-flex align-items-center"
        to="/dashboard"
      >
        <HomeIcon className="icon icon-md text-slate-700" />
      </Link>
      {crumbs.map((item, index) => {
        return !noLastIndex ? (
          <Link
            key={index}
            className={`text-capitalize item d-flex align-items-center ${
              index === crumbs.length - 1 ? "no-event" : "pointer active"
            } `}
            to={`/${item}`}
          >
            {getLocationName(item)}
          </Link>
        ) : (
          crumbs.length - 1 != index && (
            <Link
              key={index}
              className={`text-capitalize item-mod ${
                index === crumbs.length - 2 ? "no-event" : "pointer active"
              } `}
              to={`/${item}`}
            >
              {getLocationName(item)}
            </Link>
          )
        );
      })}
    </div>
  );
};

export default Breadcrumb;
