import { Link } from "react-router-dom";
import Avatar from "../../assets/images/avatar.png";

import { UserIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import Signout from "../Common/Signout/Signout";

type TProfileMenuProps = {
  user: any;
};

const ProfileMenu = ({ user }: TProfileMenuProps) => {
  return (
    <div className="icon-box profile-menu-wrapper">
      <div className="dropdown">
        <div
          className="profile-menu pointer"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src={`${user?.image ? user?.image : Avatar}`} />
        </div>
        <div className="dropdown-menu">
          <div className="dropdown-item name-box">
            <div className="name">{user?.email}</div>
            <div className="role d-flex">
              <div className="text-smr text-slate-700 badge px-3 py-2 bg-warning-300 mt-1">
                {user?.roleId == 1 ? "Admin" : "Sub Admin"}
              </div>
            </div>
          </div>

          <Link
            to="/profile"
            className="dropdown-item d-flex align-items-center pointer"
          >
            <div className="icon">
              <UserIcon />
            </div>
            <div className="text-smr label">Profile</div>
          </Link>

          {/*       <Link
            to="/help"
            className="dropdown-item d-flex align-items-center pointer"
          >
            <div className="icon">
              <QuestionMarkCircleIcon />
            </div>
            <div className="text-smr label">Help</div>
          </Link> */}

          <Signout />
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
