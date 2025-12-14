import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Slide, ToastContainer } from "react-toastify";

import { AuthProvider } from "./context/AuthContext";

import { authRoutes, userRoutes, plainRoutes } from "./routes/allRoutes";

import AuthMiddleware from "./routes/middleware/AuthMiddleWare";
import UserMiddleware from "./routes/middleware/UserMiddleWare";
import ProtectedMiddleware from "./routes/middleware/ProtectedMiddleware";

import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";
import PlainLayout from "./layouts/PlainLayout";

import "./assets/scss/styles.scss";

const AppRoutes = () => {
  return (
    <Routes>
      {authRoutes.map((route, index) => (
        <Route
          key={index}
          element={
            <AuthMiddleware>
              <AuthLayout />
            </AuthMiddleware>
          }
        >
          <Route key={index} path={route.path} element={<route.component />} />
        </Route>
      ))}

      {userRoutes.map((route, index) => (
        <Route
          key={index}
          element={
            <UserMiddleware>
              <UserLayout />
            </UserMiddleware>
          }
        >
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedMiddleware roleIds={route.roleIds || []}>
                <route.component />
              </ProtectedMiddleware>
            }
          >
            {route.children &&
              route.children.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  path={childRoute.path}
                  element={
                    <ProtectedMiddleware roleIds={route.roleIds || []}>
                      <childRoute.component />
                    </ProtectedMiddleware>
                  }
                ></Route>
              ))}
          </Route>
        </Route>
      ))}

      {plainRoutes.map((route, index) => (
        <Route key={index} element={<PlainLayout />}>
          <Route key={index} path={route.path} element={<route.component />} />
        </Route>
      ))}
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />

        <ToastContainer
          toastClassName="custom-toast"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </AuthProvider>
    </Router>
  );
};

export default App;
