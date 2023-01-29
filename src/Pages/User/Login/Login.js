import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userLogin, loadUser } from './../../../Redux/Actions/UserAction';
import { useSelector } from 'react-redux';
// import store from "../../../Redux/Store";
// import { addItemsToCartWithLogin } from "../../../Redux/Actions/CartAction";

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { isAuthenticated, error} = useSelector((state) => state.user);
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };
  
  if(isAuthenticated === true){
    let from = location?.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  } 

  const addToCartWithLoginHandler = () => {
    // if(isAuthenticated === true ){
    //   dispatch(addItemsToCartWithLogin())
    // } 
    
  }

  return (
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="login_card">
          <div class="card-body">
            <h2 class="h4 mb-4">Sign in</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="form-group my-2">
                <label>Mobile</label>
                <input
                  {...register("phone", { required: true })}
                  required
                  class="login_input_form"
                  type="text"
                  name="phone"
                  placeholder="Enter mobile number"
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  {...register("password", { required: true })}
                  required
                  class="login_input_form"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                />
                <div id="invalid-feedback">{error}</div>
              </div>
              <div class="form-group d-flex flex-wrap justify-content-between py-2">
                <div class="form-group">
                  <input
                    type="checkbox"
                    class="mr-1"
                    name="remember"
                    id="remember"
                  />

                  <label class="ms-1" for="remember">
                    Remember me
                  </label>
                </div>
                <div class="forget_pass">
                  <Link to="/recover-password">Forgot password?</Link>
                </div>
              </div>
              <button onClick={() => addToCartWithLoginHandler()} class="signin_btn" type="submit">
                Sign in
              </button>
            </form>
          </div>
          <div class="login_card_footer">
            <div>
              <h6>No account ? Sign up now </h6>
            </div>
            <div className="sign_up_path">
              <Link to="/sign-up">
                <i class="fa fa-user-circle"></i> Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
