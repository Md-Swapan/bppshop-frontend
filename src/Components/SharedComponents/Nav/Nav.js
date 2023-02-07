import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import defaultAvatar from "../../../Assets/Images/default-avatar.jpg";
import bppShopsLogo from "../../../Assets/Images/bppshopslogo.png";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearCart,
  ClearCartGroupItems,
} from "./../../../Redux/Actions/CartAction";
import { clearShippingAddress } from "../../../Redux/Actions/ShippingAddressAction";
import axios from "axios";
import { baseUrl } from "./../../../BaseUrl/BaseUrl";

const Nav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios.get(`${baseUrl}/customer/logout`, config).then((res) => {
      if (res.data.status === "success") {
        localStorage.removeItem("token");
        localStorage.removeItem("message");
        window.location.reload();
        // dispatch(logout())
        dispatch(ClearCart());
        dispatch(clearShippingAddress());
        dispatch(ClearCartGroupItems());
      }
    });
  };

  return (
    <>
      <div className="navbar-section">
        <nav className="nav">
          <Sidebar />
          <div className="nav-content">
            <div className="logo">
              <Link to="/">
                <img className="bpshopsLogo" src={bppShopsLogo} alt="" />
              </Link>

              <img className="bpshopsIcon" src="img/bpp_icon.png" alt="" />
            </div>

            <div className="searchInput">
              <input
                type="text"
                name=""
                id="dynamic-placeholder"
                className="search"
                placeholder="Search by Product Category"
              />
              <span className="searchIcon">
                <i className="bi bi-search"></i>
              </span>
            </div>

            <div className="userProfileTab">
              <div
                className="user-profile "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* {agent.image ? (
                    <img
                      src={`https://agentapi.bppshop.com.bd/${agent.image}`}
                      alt="profile"
                    />
                  ) : ( */}
                <img src={defaultAvatar} alt="profile" />
                {/* )} */}
              </div>
              {user ? (
                <div className="dropdown-menu profile_dropdown">
                  <div
                    className="d-flex mx-3"
                    style={{
                      borderBottom: "1px solid gray",
                      padding: "10px ",
                      marginBottom: "10px",
                    }}
                  >
                    {/* {agent.image ? (
                    <img
                      width="30"
                      height="100%"
                      src={`https://agentapi.bppshop.com.bd/${agent.image}`}
                      alt="profile"
                    />
                  ) : ( */}
                    <img
                      width="30"
                      height="100%"
                      src={defaultAvatar}
                      alt="profile"
                    />
                    {/* )} */}

                    <h6 className="mx-2">{user?.name}</h6>
                  </div>
                  <Link to="/profile">
                    <li className="dropdown-item">View Profile</li>
                  </Link>
                  <li onClick={() => handleLogout()} className="dropdown-item">
                    Logout
                  </li>
                </div>
              ) : (
                <div className="dropdown-menu profile_dropdown">
                  <Link to="/login">
                    <li className="dropdown-item">Login</li>
                  </Link>
                  <Link to="/sign-up">
                    <li className="dropdown-item">Sign-Up</li>
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* </div> */}
        </nav>
      </div>
    </>
  );
};

export default Nav;
