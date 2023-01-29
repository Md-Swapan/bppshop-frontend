import React from "react";
import './HomeFilterBtnHeader.css';
import { useDispatch } from 'react-redux';
import { addItemsToCartWithLogin } from "../../Redux/Actions/CartAction";
import { getCartData } from './../../Redux/Actions/CartAction';


const HomeFilterBtnHeader = () => {
  const dispatch = useDispatch();
  const addToCartWithLoginHandler = () => {
    // if(isAuthenticated === true){
      dispatch(addItemsToCartWithLogin())
    // } 
    
  }
  const getCartHandler = () => {
    // if(isAuthenticated === true){
      dispatch(getCartData())
    // } 
    
  }
  return (
    <>
      <div className="homeFilterBtnHeader-container-section">
        <div className="header_btn">
          <div>
            <button onClick={() => addToCartWithLoginHandler()}>Brand</button>
          </div>
          <div>
            <button onClick={() => getCartHandler()}>Discounted Products</button>
          </div>
          
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="">Hot Items</span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  New Arrival
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Top Rated
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Best Selling
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="">Partner Zone</span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  Become a seller
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Seller Login
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Become a Agent
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Agent Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeFilterBtnHeader;
