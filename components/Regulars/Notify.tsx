import { BellIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import NotificationItem from "../../pages/User/Notifications/NotificationItem";
import _ from "underscore";

const Notify = () => {

  const {
      notifications,
      isNotificationsReady,
      unreadNotify,
    } = useAuth();

    const [initialData, setInitialData] = useState([]);

    const handleNotificationRead = (id:string) => {

    }

     useEffect(() => {
        if (isNotificationsReady) {
          setInitialData(notifications);
        }
      }, [notifications, isNotificationsReady]);

  return (
    <div className={`icon-box notify position-relative ${unreadNotify > 0 ? 'me-2' : 'me-1'}`}>
      <div className="dropdown">
        <div
          className="notify-menu pointer"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <BellIcon className="icon text-slate-700" />
          { unreadNotify > 0 && <span className="dot position-absolute start-100 translate-middle badge rounded-pill bg-danger-500">
            <span>{unreadNotify}</span>
          </span> }
        </div>
        <div className="dropdown-menu">
            <ul className="list">
              {initialData.slice(0,4).map((item: any, idx) => (
                  <NotificationItem key={idx} item={item} type="simple" onRead={handleNotificationRead} />
                ))}
                { _.isEmpty(initialData) && <p className="p-3 text-slate-500">No Notifications. We will notify when something arrives</p> }
            </ul>
          <Link to="/notifications" className="box border-top border-slate-200 fw-medium text-center">View all</Link>
        </div>
      </div>
    </div>
  );
};

export default Notify;
