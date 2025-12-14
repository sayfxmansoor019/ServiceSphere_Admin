import { Outlet } from "react-router-dom";

import SideBar from "../components/Regulars/SideBar";
import Header from "../components/Regulars/Header";
import Footer from "../components/Regulars/Footer";

const UserLayout = () => {
  return (
    <div className="user-layout-wrapper">
      <SideBar />
      <div className="user-wrapper d-flex flex-column">
        <Header />
        <div className="content-block flex-grow-1">
          <div className="container-fluid g-0">
            <div className="row">
              <div className="col-sm-12">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
