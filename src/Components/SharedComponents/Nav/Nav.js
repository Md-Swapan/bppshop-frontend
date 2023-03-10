import React, { useEffect } from "react";
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
import { searchProduct } from "../../../Redux/Actions/SearchAction";
import { useState } from "react";

const Nav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [allCategory, setAllCategory] = useState([]);
  const [SuggestedCategory, setSuggestedCategory] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/categories`).then((res) => {
      setAllCategory(res.data.data);
    });
  }, [token]);

  let categoryList = [];

  function keepAllCategroryInAList(data)
  { 
    if(data.hasOwnProperty('childes'))
    {
      data.childes.forEach(element => {
        keepAllCategroryInAList(element);
      });
    }
    else{
      categoryList.push(data);
    }

  }
  allCategory.forEach(function(element)
  {
    keepAllCategroryInAList(element);
  });

  console.log(categoryList,'after keep all List');

  //Logout functionality
  const handleLogout = () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios.get(`${baseUrl}/customer/logout`, config).then((res) => {
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
  // const [loading,setloading]=useState(true)
  let offset = 1;
  let limit = 10;
  // const url = baseUrl + "/products/search";

  const handleSearchByKeyUp = (e) => {
    e.preventDefault();
    const suggestedItemContainer = document.querySelector(
      ".suggested_item_container"
    );

    setSuggestedCategory(
      categoryList.filter((i) => i.name.toLowerCase().includes(e.target.value))
    );

    if (SuggestedCategory.length > 0) {
      suggestedItemContainer.style.display = "block";
    }

    const searchData = {
      name: `${e.target.value}`,
      // limit: `${limit}`,
      // offset: `${offset}`,
    };
    dispatch(searchProduct(searchData));

    // axios({ method: "post", url, data }).then((res) => {
    //   dispatch(searchProduct(res.data.products));
    e.target.value && navigate("/search");
    // });
  };

  console.log(SuggestedCategory);

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
              {/* <form onChange={handleSearch}> */}
              <input
                onKeyUp={handleSearchByKeyUp}
                type="text"
                name="search"
                id="dynamic-placeholder"
                className="search"
                placeholder="Search Product..."
              />
              <span className="searchIcon">
                <button
                  // onClick={handleSearchByClick}
                  type="submit"
                  style={{ border: "none", background: "none" }}
                >
                  <i className="bi bi-search"></i>
                </button>
              </span>
              {/* </form> */}

              {SuggestedCategory && (
                <div className="suggested_item_container">
                  {SuggestedCategory?.map((suggestItem) => (
                    <div>
                      <p><i className="bi bi-search"></i> {suggestItem?.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* <div className="suggested_item_container">
              {SuggestedCategory.map((suggestItem) => (
                <div>
                  <p>{suggestItem.name}</p>
                </div>
              ))}
            </div> */}

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
