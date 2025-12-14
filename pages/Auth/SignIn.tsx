import { useState, useEffect } from "react";

import { useFormik } from "formik";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { sessionData } from "../../constants";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import api from "../../../api";
import SubmitButton from "../../components/Common/SubmitButton";

type TSignInValues = {
  email: string;
  password: string;
  remember_me: boolean;
};

const SignIn = () => {
  const { signin } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [isFormSubmitted, setFormSubmiited] = useState(false);

  const initialValues: TSignInValues = {
    email: "",
    password: "",
    remember_me: false,
  };

  const onSubmit = async (values: TSignInValues) => {
    setFormSubmiited(true);

    let formData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await api.post("/admin/signin", formData);

      if (response.data) {
        setFormSubmiited(false);
        if (formik.values.remember_me) {
          sessionData.setUserEmail(values.email);
        } else {
          sessionData.removeUserEmail();
        }

        formik.resetForm();

        const data = response.data;

        let userData = {
          token: data.token,
          user: data.user,
        };
        await signin(userData);
      }
    } catch (error: any) {
      console.log(error);
      setFormSubmiited(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network Error");
      }
    }
  };

  const validate = (values: TSignInValues) => {
    let errors: Record<string, any> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[a-z0-9][a-z0-9._+-]*@([a-z0-9-]+\.)+[a-z]{2,5}$/i.test(values.email)
    ) {
      errors.email = "Enter a valid email address";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 7) {
      errors.password = "Password should contain minimum 7 characters!";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const handleRememberMe = () => {
    formik.setFieldValue("remember_me", !formik.values.remember_me);
  };

  const resetRememberMe = () => {
    let data = sessionData.getUserEmail();
    if (data) {
      formik.setFieldValue("remember_me", true);
      formik.setFieldValue("email", data);
    }
  };

  useEffect(() => {
    resetRememberMe();
  }, []);

  return (
    <div className="auth-wrapper signin-wrapper">
      <div className="card">
        <div className="card-body">
          <div className="title">
            <h3 className="fw-medium">Sign In</h3>
            <p className="mt-3 text-slate-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div className="form-area">
            <form
              className="sign-in-form"
              name="signInForm"
              onSubmit={formik.handleSubmit}
            >
              <div className="input-box">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control input-lg"
                  id="email"
                  placeholder="Enter email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="mt-2 text-sm text-danger">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="input-box">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control input-lg"
                    id="password"
                    placeholder="Enter password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <div
                    className="input-group-text"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <span className="icon d-flex align-items-center icon-md pointer text-slate-700">
                      {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>

                {formik.touched.password && formik.errors.password && (
                  <p className="mt-2 text-sm text-danger">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="remember-me d-flex">
                <div className="check flex-1">
                  <input
                    type="checkbox"
                    id="rememberMeCheck"
                    className="form-check-input me-2"
                    name="remember_me"
                    checked={formik.values.remember_me}
                    onChange={handleRememberMe}
                  />
                  <label htmlFor="rememberMeCheck" className="form-check-label">
                    Remember me
                  </label>
                </div>
                {/* <Link
                  to="/forgot-password"
                  className="ms-auto text-sm fw-medium"
                >
                  Forgot Password?
                </Link> */}
              </div>

              <div className="submit-box submit-box-lg">
                <SubmitButton
                  label="Sign In"
                  size="lg"
                  width="full"
                  isSubmit={isFormSubmitted}
                  onSubmit={() => {
                    formik.handleSubmit();
                  }}
                ></SubmitButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
