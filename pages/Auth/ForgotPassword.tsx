import { Link } from "react-router-dom";
import { useFormik } from "formik";

type TForgotPasswordValues = {
  email: string;
};

const ForgotPassword = () => {
  const initialValues: TForgotPasswordValues = {
    email: "",
  };

  const onSubmit = async (values: TForgotPasswordValues) => {
    let userData = {
      email: values.email,
    };
  };

  const validate = (values: TForgotPasswordValues) => {
    let errors: Record<string, any> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[a-z0-9][a-z0-9._+-]*@([a-z0-9-]+\.)+[a-z]{2,5}$/i.test(values.email)
    ) {
      errors.email = "Enter a valid email address";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="auth-wrapper forgot-password-wrapper">
      <div className="card">
        <div className="card-body">
          <div className="title">
            <h4 className="fw-medium">Forgot Password</h4>
            <p className="mt-3 text-slate-400">
              Enter the email address associated with your account
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

              <div className="submit-box submit-box-lg">
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Forgot Password
                </button>
              </div>

              <div className="mt-5 text-center">
                <Link to="/sign-in" className="text-primary text-sm fw-medium">
                  Back to Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
