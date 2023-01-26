import React from "react";
import "./Profile.css";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div className="profile_container">
        <div className="row">
          <div class="col-md-3 col-sm-12">
            <div class="profile_left_container m-2">
              <div class="sidebar_left">
                <Link to="/profile">Profile info</Link>
              </div>
              <div class="sidebar_left">
                <Link to="/profile/orders"> My order</Link>
              </div>
              {/* <div class="sidebar_left">
                <Link to="/profile/track-order"> Track your order</Link>
              </div> */}
              <div class="sidebar_left">
                <Link to="/profile/account-address"> Address</Link>
              </div>
            </div>
          </div>
          <div class="col-md-9 col-sm-12">
          <div className="profile_right_container m-2">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Profile;
