import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Logo from "../../assets/images/logo-black.png";
import { sidebarMenus } from "../../constants";

type TSidebarMenusProps = {
  id: number;
  name: string;
  roleIds: any[];
  link: string;
  outlet: TSidebarMenusOutletProps[];
  icon: React.ReactNode
}


type TSidebarMenusOutletProps = {
  id: number;
  name: string;
}

const SideBar = () => {

  const { user, isToggleSidebar, handleSidebar } = useAuth();

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  const toggleSidebar = () => {
    handleSidebar(false)
  }

  const getLink = (outlet: any[]) => {
    return outlet.some((item: any) => item.name === currentPath);
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
    handleSidebar(false)
  }, [location]);

  return (
    <div className={`sidebar ${isToggleSidebar ? 'show' : ''}`}>
      <div className="overlay" onClick={toggleSidebar}></div>
      <div className="logo-box">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="inner flex flex-column justify-between">
        <ul className="menu-list">
        { sidebarMenus.map((item: TSidebarMenusProps, index: number) => {
          return (
            item.roleIds.includes(user?.roleId) && <Link className={`item d-flex pointer align-items-center ${ getLink(item.outlet) && "active" }`} key={index} to={`/${item.link}`}>
            <div className="icon">{item.icon}</div>
            <div className="label text-mod">{item.name}</div>
          </Link>
          )
        })}
        </ul>
      </div>
    </div>
  )
}

export default SideBar