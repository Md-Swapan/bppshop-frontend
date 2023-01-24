import React from "react";
import "./Profile.css";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div className="profile_container">
        <div className="row">
          <div class="col-md-3 col-sm-12">
            <div class="profile_left_container">
              <div class="sidebar_left">
                <Link to="/profile">Profile info</Link>
              </div>
              <div class="sidebar_left">
                <Link to="/profile/my-order"> My order</Link>
              </div>
              <div class="sidebar_left">
                <a class="" href="https://bppshop.com.bd/track-order ">
                  Track your order
                </a>
              </div>
              <div class="sidebar_left">
                <a class="" href="https://bppshop.com.bd/account-address">
                  Address{" "}
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-9 col-sm-12">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
