import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

import { sessionData } from "../constants";
import _ from "underscore";
import api from "../../api";

import Loaderlayout from "../layouts/Loaderlayout";
import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  token: string | null;
  userId: string | null;
  isToggleSidebar: boolean;
  isToggleFilterDrawer: boolean;
  recordsPerPage: number;
  customersOrdersFilterData: any;
  customersOrdersTableData: any;
  serviceProviderOrdersFilterData: any;
  serviceProviderOrdersTableData: any;
  notifications: [];
  isNotificationsReady: boolean;
  unreadNotify: number;
  signin: (data: SigninData) => Promise<void>;
  signout: () => Promise<void>;
  updateUser: (data: User) => Promise<void>;
  handleSidebar: (status: boolean) => Promise<void>;
  handleFilterDrawer: (status: boolean) => Promise<void>;
  updateRecordsPerPage: (data: number) => Promise<void>;
  updateCustomersOrdersTableData: (data: any) => Promise<void>;
  updateCustomersOrdersFilterData: (data: any) => Promise<void>;
  updateServiceProviderOrdersTableData: (data: any) => Promise<void>;
  updateServiceProviderOrdersFilterData: (data: any) => Promise<void>;
  isAdmin: () => Promise<boolean>;
  fetchNotifications: (data: string) => Promise<void>;
  updateUnreadNotify: (data: any) => Promise<void>;
}

interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  roleId: number;
  countryId: string;
  stateId: string;
  cityId: string;
  createdAt: string;
  status: string;
  updatedAt: string;
}

interface SigninData {
  user: User;
  token: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context not found");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const [isToggleSidebar, setToggleSidebar] = useState(false);

  const [isToggleFilterDrawer, setToggleFilterDrawer] = useState(false);

  const [customersOrdersTableData, setCustomersOrdersTableData] = useState({});
  const [customersOrdersFilterData, setCustomersOrdersFilterData] =
    useState(null);

  const [serviceProviderOrdersFilterData, setServiceProviderOrdersFilterData] =
    useState({});
  const [serviceProviderOrdersTableData, setServiceProviderOrdersTableData] =
    useState(null);

  const [notifications, setNotifications] = useState<any>([]);
  const [isNotificationsReady, setNotificationsReady] = useState(false);
  const [unreadNotify, setUnreadNotify] = useState<any>(0);

  const signin = async (data: any) => {
    const currentUser = data.user;

    setUser(currentUser);

    setToken(data.token);
    sessionData.setUserToken(data.token);
    sessionData.setUserEmail(currentUser.email);

    setUserId(currentUser.id);
    sessionData.setUserId(currentUser.id);

    navigate("/dashboard");
  };

  const signout = async () => {
    setUser(null);
    setToken(null);

    sessionData.removeUserToken();
    sessionData.removeUserId();

    navigate("/sign-in");
  };

  const updateUser = async (data: User) => {
    setUser(data);
  };

  const handleSidebar = async (status: boolean) => {
    setToggleSidebar(status);
  };

  const handleFilterDrawer = async (status: boolean) => {
    setToggleFilterDrawer(status);
  };

  const fetchUser = async (userId: string | null) => {
    try {
      const response = await api.get(`/admin/users/${userId}`);

      if (response.data) {
        setUser(response.data.currentUser);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await api.get("/admin/settings");

      if (response.data) {
        setRecordsPerPage(
          Number(response.data.fetchedData[0].noOfRecordsPerPage)
        );
        setLoading(false);
      }
    } catch (error) {
      setRecordsPerPage(5);
      setLoading(false);
    }
  };

  const fetchNotifications = async (id: string | null) => {
    setNotificationsReady(false);
    try {
      const response = await api.get(`/admin/notifications/by-user/${id}`);
      if (response) {
        const notifications = response.data.fetchedData || [];
        setNotifications(notifications);
        setNotificationsReady(true);
        let unread = 0;
        notifications.forEach((notif: any) => {
          if (!notif.isRead) unread++;
        });
        updateUnreadNotify(unread);
      }
    } catch (error: any) {
      setNotificationsReady(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network Error");
      }
    }
  };

  const updateUnreadNotify = async (data: any) => {
    setUnreadNotify(data);
  };


  const isAdmin = async () => {
    return user?.roleId == 1 ? true : false;
  };

  const updateRecordsPerPage = async (data: number) => {
    setRecordsPerPage(data);
  };

  const updateCustomersOrdersTableData = async (data: any) => {
    setCustomersOrdersTableData(data);
  };

  const updateCustomersOrdersFilterData = async (data: any) => {
    setCustomersOrdersFilterData(data);
  };

  const updateServiceProviderOrdersFilterData = async (data: any) => {
    setServiceProviderOrdersFilterData(data);
  };

  const updateServiceProviderOrdersTableData = async (data: any) => {
    setServiceProviderOrdersTableData(data);
  };


  useEffect(() => {
    const userId: string | null = sessionData.getUserId();
    if (!_.isEmpty(userId) && _.isEmpty(user)) {
      fetchUser(userId);
      fetchNotifications(userId)
      fetchSettings();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loaderlayout />;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userId,
        recordsPerPage,
        isToggleSidebar,
        isToggleFilterDrawer,
        customersOrdersTableData,
        customersOrdersFilterData,
        serviceProviderOrdersFilterData,
        serviceProviderOrdersTableData,
        notifications,
        isNotificationsReady,
        unreadNotify,
        signin,
        signout,
        updateUser,
        handleSidebar,
        handleFilterDrawer,
        isAdmin,
        updateRecordsPerPage,
        updateCustomersOrdersTableData,
        updateCustomersOrdersFilterData,
        updateServiceProviderOrdersTableData,
        updateServiceProviderOrdersFilterData,
        updateUnreadNotify,
        fetchNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
