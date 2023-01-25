import React from "react";
import { Link } from "react-router-dom";
import "./AddressHome.css";

const AddressHome = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold">ADDRESSES</h4>
        </div>
        <div>
          <Link to="/profile/add-new-address">
            <button className="add_new_address_btn">Add new address</button>
          </Link>
        </div>
      </div>
      <div className="address_card_container">
        <div class="arrdess_card">
          <div className="address_card_header">
            <div className="address_card_header_pin">
              <i class="bi bi-pin-fill"></i>
            </div>
            <div className="home_shipping_address_title">
              <span> home Address (Shipping address) </span>
            </div>
            <div class="d-flex justify-content-between">
              <div className="address_card_header_edit mx-1">
                <i class="bi bi-pencil-square"></i>
              </div>
              <div className="address_card_header_delete mx-1">
                <i class="bi bi-trash3-fill"></i>
              </div>
            </div>
          </div>
          <div class="address_card_body">
            <h6>Md Shuvo Miah</h6>
            <p>
              <span>Phone :</span> Md-Shuvo-Miah
            </p>
            <p>
              <span>City :</span> Dhaka
            </p>
            <p>
              <span>Zip Code :</span> Basabo
            </p>
            <p>
              <span>Address :</span> 15
            </p>
          </div>
        </div>
        <div class="arrdess_card">
          <div className="address_card_header">
            <div className="address_card_header_pin">
              <i class="bi bi-pin-fill"></i>
            </div>
            <div className="home_shipping_address_title">
              <span> home Address (Shipping address) </span>
            </div>
            <div class="d-flex justify-content-between">
              <div className="address_card_header_edit mx-1">
                <i class="bi bi-pencil-square"></i>
              </div>
              <div className="address_card_header_delete mx-1">
                <i class="bi bi-trash3-fill"></i>
              </div>
            </div>
          </div>
          <div class="address_card_body">
            <h6>Md Shuvo Miah</h6>
            <p>
              <span>Phone :</span> Md-Shuvo-Miah
            </p>
            <p>
              <span>City :</span> Dhaka
            </p>
            <p>
              <span>Zip Code :</span> Basabo
            </p>
            <p>
              <span>Address :</span> 15
            </p>
          </div>
        </div>
        <div class="arrdess_card">
          <div className="address_card_header">
            <div className="address_card_header_pin">
              <i class="bi bi-pin-fill"></i>
            </div>
            <div className="home_shipping_address_title">
              <span> home Address (Shipping address) </span>
            </div>
            <div class="d-flex justify-content-between">
              <div className="address_card_header_edit mx-1">
                <i class="bi bi-pencil-square"></i>
              </div>
              <div className="address_card_header_delete mx-1">
                <i class="bi bi-trash3-fill"></i>
              </div>
            </div>
          </div>
          <div class="address_card_body">
            <h6>Md Shuvo Miah</h6>
            <p>
              <span>Phone :</span> Md-Shuvo-Miah
            </p>
            <p>
              <span>City :</span> Dhaka
            </p>
            <p>
              <span>Zip Code :</span> Basabo
            </p>
            <p>
              <span>Address :</span> 15
            </p>
          </div>
        </div>
        <div class="arrdess_card">
          <div className="address_card_header">
            <div className="address_card_header_pin">
              <i class="bi bi-pin-fill"></i>
            </div>
            <div className="home_shipping_address_title">
              <span> home Address (Shipping address) </span>
            </div>
            <div class="d-flex justify-content-between">
              <div className="address_card_header_edit mx-1">
                <i class="bi bi-pencil-square"></i>
              </div>
              <div className="address_card_header_delete mx-1">
                <i class="bi bi-trash3-fill"></i>
              </div>
            </div>
          </div>
          <div class="address_card_body">
            <h6>Md Shuvo Miah</h6>
            <p>
              <span>Phone :</span> Md-Shuvo-Miah
            </p>
            <p>
              <span>City :</span> Dhaka
            </p>
            <p>
              <span>Zip Code :</span> Basabo
            </p>
            <p>
              <span>Address :</span> 15
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressHome;
