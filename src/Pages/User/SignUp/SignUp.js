import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { userRegister } from "../../../Redux/Actions/UserAction";
import { useSelector } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [signUpError, setSignUpError] = useState("");
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    dispatch(userRegister(data));
  };

  if (isAuthenticated === true) {
    let from = location?.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="signup_card">
          <div>
            <h2 className="h4 mb-1">Create Account</h2>
            <p className="font-size-sm text-muted mb-4">
              Register control your order .
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className=" col-md-6">
                  <div className="my-1">
                    <label>Your name</label>
                    <input
                      {...register("name", { required: true })}
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
                <div className=" col-md-6">
                  <div className="my-1">
                    <label>
                      Mobile
                      <small className="text-dark">
                        ( * Country code is must Like for BD 880 )
                      </small>
                    </label>
                    <input
                      {...register("phone", { required: true })}
                      className="form-control"
                      type="text"
                      name="phone"
                      placeholder="+880"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" col-md-6">
                  <div className="my-1">
                    <label>Password</label>
                    <input
                      {...register("password", { required: true })}
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Minimum 8 characters long"
                      required
                    />
                  </div>
                </div>
                <div className=" col-md-6">
                  <div className="my-1">
                    <label>Confirm password</label>
                    <input
                      {...register("con_password", { required: true })}
                      className="form-control"
                      type="password"
                      name="con_password"
                      placeholder="Minimum 8 characters long"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group d-flex flex-wrap justify-content-between">
                <div className="form-group my-3">
                  <strong>
                    <input
                      type="checkbox"
                      className="mr-1"
                      name="remember"
                      id="inputCheckd"
                    />
                  </strong>
                  <label className="ms-1" htmlFor="remember">
                    I agree to Your Terms and condition
                  </label>
                </div>
                <div id="invalid-feedback">{signUpError}</div>
              </div>

              <div className="row">
                <div className="signup_card_footer login_card_footer">
                  <div className="sign_in_path">
                  Already Have account ?<Link to="/login"> Sign in now </Link>
                  </div>
                  <div className="sign_up_btn">
                    <button type="submit">Sign-up</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
