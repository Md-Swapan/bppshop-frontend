import React from "react";
import "./Profile.css";
import { Link, Outlet } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const Profile = () => {
  return (
    <>
    <MetaData title="Your Profile - BPPShop" />
      <div className="profile_container">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <div className="profile_left_container m-2">
              <Link to="/profile">
                <div className="sidebar_left">Profile info</div>
              </Link>
              <Link to="/profile/orders">
                <div className="sidebar_left">My order</div>
              </Link>
              {/* <div className="sidebar_left">
                <Link to="/profile/track-order"> Track your order</Link>
              </div> */}
              <Link to="/profile/account-address">
                <div className="sidebar_left">Address</div>
              </Link>
            </div>
          </div>
          <div className="col-md-9 col-sm-12">
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
