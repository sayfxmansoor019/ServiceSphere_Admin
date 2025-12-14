import { Outlet } from "react-router-dom";

import AuthHeader from "../components/Regulars/AuthHeader";
import AuthFooter from "../components/Regulars/AuthFooter";

const AuthLayout = () => {
  return (
    <div className="auth-layout-wrapper d-flex flex-column">
      <AuthHeader />
      <div className="content-block flex-grow-1">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
