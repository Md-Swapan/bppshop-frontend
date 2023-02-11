import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userLogin } from "./../../../Redux/Actions/UserAction";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const loginMessage = localStorage.getItem("message");
  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    dispatch(userLogin(data));

  
  };

  if (isAuthenticated === true && token) {
    console.log(isAuthenticated,token);
    let from = location?.state?.from?.pathname || "/";
    navigate(from, { replace: true });
   
    // alert(loginMessage)

  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="login_card">
          <div className="card-body">
            <h2 className="h4 mb-4">Sign in</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group my-2">
                <label>Mobile</label>
                <input
                  {...register("phone", { required: true })}
                  required
                  className="login_input_form"
                  type="text"
                  name="phone"
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  {...register("password", { required: true })}
                  required
                  className="login_input_form"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              {loginMessage && (
                <small className="text-danger">{loginMessage}</small>
              )}
              <div className="form-group d-flex flex-wrap justify-content-between py-2">
                <div className="form-group">
                  <input
                    type="checkbox"
                    className="mr-1"
                    name="remember"
                    id="remember"
                  />

                  <label className="ms-1" htmlFor="remember">
                    Remember me
                  </label>
                </div>
                <div className="forget_pass">
                  <Link to="/recover-password">Forgot password?</Link>
                </div>
              </div>
              <button className="signin_btn" type="submit">
                Sign in
              </button>
            </form>
          </div>
          <div className="login_card_footer">
            <div>
              <h6>No account ? Sign up now </h6>
            </div>
            <div className="sign_up_path">
              <Link to="/sign-up">
                <i className="fa fa-user-circle"></i> Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
