import { Outlet } from "react-router-dom";

import AuthFooter from "../components/Regulars/AuthFooter";


const PlainLayout = () => {
  return (
    <div className="plain-layout-wrapper d-flex flex-column">
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
  )
}

export default PlainLayout