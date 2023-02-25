import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import defaultAvatar from "../../../Assets/Images/default-avatar.jpg";
import bppShopsLogo from "../../../Assets/Images/bpp shop logo 01.png";
import bppShopshortLogo from "../../../Assets/Images/bpp shop logo 02-01-01.png";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearCart,
  ClearCartGroupItems,
} from "./../../../Redux/Actions/CartAction";
import { clearShippingAddress } from "../../../Redux/Actions/ShippingAddressAction";
import axios from "axios";
import { baseUrl } from "./../../../BaseUrl/BaseUrl";
import { ClearDeliveryCharge } from "../../../Redux/Actions/DeliveryChargeAction";
import toast from "react-hot-toast";
import { logout } from "./../../../Redux/Actions/UserAction";

const Nav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //Logout functionality
  const handleLogout = () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios.get(`${baseUrl}/customer/logout`, config).then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        navigate("/");
        localStorage.removeItem("token");
        window.location.reload();
        dispatch(logout());
        dispatch(ClearCart());
        dispatch(clearShippingAddress());
        dispatch(ClearCartGroupItems());
        dispatch(ClearDeliveryCharge());
        // toaster
        toast.success(`Logout Successfull`, {
          duration: 3000,
          style: {
            width: "100%",
            height: "80px",
            padding: "0px 20px",
          },
        });
      }
    });
  };

  //search functionality
  let offset = 1;
  let limit = 10;
  const url = baseUrl + "/products/search";

  const handleSearch = (e) => {
    e.preventDefault();
    e.target.value && navigate("/search");
    const data = {
      name: `${e.target.value}`,
      limit: `${limit}`,
      offset: `${offset}`,
    };
    axios({ method: "post", url, data }).then((res) => console.log(res));
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
                <img
                  className="bppshopShortLogo"
                  src={bppShopshortLogo}
                  alt=""
                />
              </Link>

              <img className="bpshopsIcon" src="img/bpp_icon.png" alt="" />
            </div>

            <div className="searchInput">
              <input
                onKeyUp={handleSearch}
                type="text"
                name=""
                id="dynamic-placeholder"
                className="search"
                placeholder="Search Product..."
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
                {/* {user.image ? (
                    <img
                      src={`https://backend.bppshop.com.bd/storage/${user.image}`}
                      alt="profile"
                    />
                  ) : ( */}
                <img src={defaultAvatar} alt="profile" />
                {/* )}  */}
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
