import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notify from "./Notify";
import ProfileMenu from "../Regulars/ProfileMenu";
import Breadcrumb from "../Common/Breadcrumb";

import { Cog6ToothIcon, Bars2Icon } from "@heroicons/react/24/outline";

import { useAuth } from "../../context/AuthContext";
import _ from "underscore";

const Header = () => {
  const navigate = useNavigate();

  const { user, isToggleSidebar, handleSidebar } = useAuth();

  const [isAwake, setAwake] = useState(false);

  const handleScroll = () => {
    const scrollOffset = window.scrollY;
    if (scrollOffset >= 20) {
      setAwake(true);
    } else {
      setAwake(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth >= 991) {
      handleSidebar(false);
    }
  };

  const toggleSidebar = () => {
    handleSidebar(!isToggleSidebar);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleSidebar(isToggleSidebar);
  }, [isToggleSidebar]);

  return (
    <div
      className={`header d-flex align-items-center ${isAwake ? "awake" : ""}`}
    >
      <div className="hamburger pointer me-3" onClick={toggleSidebar}>
        <Bars2Icon className="icon" />
      </div>
      <Breadcrumb noLastIndex={false} />
      <div className="ms-auto d-flex right align-items-center">
        <Notify />
        <Link to="/settings" className="icon-box notify pointer">
          <Cog6ToothIcon className="icon text-slate-700" />
        </Link>
        <ProfileMenu user={user} />
      </div>
    </div>
  );
};

export default Header;
