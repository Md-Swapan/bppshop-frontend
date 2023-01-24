import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useDispatch } from 'react-redux';
import { userRegister } from "../../../Redux/Actions/UserAction";
import { useSelector } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [signUpError, setSignUpError] = useState("");
  const { isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    dispatch(userRegister(data));
    
    // axios.post(baseUrl + "/auth/register", data).then((res) => {
    //   if (res?.data?.token) {
    //     alert(res?.data?.message);
    //     navigate("/");
    //   } else {
    //     setSignUpError(res?.data?.message);
    //     document.getElementById("invalid-feedback").style.display = "block";
    //   }
    // });
  };

  if(isAuthenticated === true){
    let from = location?.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  } 

  return (
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="signup_card">
          <div>
            <h2 class="h4 mb-1">Create Account</h2>
            <p class="font-size-sm text-muted mb-4">
              Register control your order .
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="row">
                <div class=" col-md-6">
                  <div className="my-1">
                    <label>Your name</label>
                    <input
                      {...register("name", { required: true })}
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
                <div class=" col-md-6">
                  <div className="my-1">
                    <label>
                      Mobile
                      <small class="text-primary">
                        ( * Country code is must Like for BD 880 )
                      </small>
                    </label>
                    <input
                      {...register("phone", { required: true })}
                      class="form-control"
                      type="text"
                      name="phone"
                      placeholder="+880"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div class=" col-md-6">
                  <div className="my-1">
                    <label>Password</label>
                    <input
                      {...register("password", { required: true })}
                      class="form-control"
                      type="password"
                      name="password"
                      placeholder="Minimum 8 characters long"
                      required
                    />
                  </div>
                </div>
                <div class=" col-md-6">
                  <div className="my-1">
                    <label>Confirm password</label>
                    <input
                      {...register("con_password", { required: true })}
                      class="form-control"
                      type="password"
                      name="con_password"
                      placeholder="Minimum 8 characters long"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-group d-flex flex-wrap justify-content-between">
                <div class="form-group my-3">
                  <strong>
                    <input
                      type="checkbox"
                      class="mr-1"
                      name="remember"
                      id="inputCheckd"
                    />
                  </strong>
                  <label class="ms-1" for="remember">
                    I agree to Your Terms and condition
                  </label>
                </div>
                <div id="invalid-feedback">{signUpError}</div>
              </div>
              
              <div class="row">
                <div className="signup_card_footer">
                  <div className="sign_up_btn">
                    <button type="submit">Submit</button>
                  </div>
                  <div className="sign_in_path">
                    <Link to="/login"> Sign in</Link>
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
