import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import "./ShippingAddressList.css";

const ShippingAddressList = ({ shippingAddressList }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleDefaultAddress = (address_id) => {
    axios
      .post(baseUrl + "/shipping-address/set-default", address_id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/shipping-details");
        }
      });
  };
  return (
    <div>
      <div className="shipping_container">
        <div className="shipping_content">
          <div className="shipping_header">Shipping Address</div>
        </div>
        <hr className="shipping_line" />
        <div className="address_content">
          <div className="row">
            {shippingAddressList?.map((address) => (
              <div key={address.id} className="col-md-6">
                <div className="shipping_address_box">
                  <div className="shipped_person">
                    <div>
                      Delivery to :{address?.is_billing}{" "}
                      {address?.contact_person_name}
                    </div>
                    <div>
                      {address?.is_billing === 1 ? (
                        <div className="default_btn">
                          <i class="bi bi-check-circle-fill"></i>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleDefaultAddress(address?.id)}
                          className="set_default_btn"
                        >
                          <i class="bi bi-check"></i> Set default
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="shiped_address">
                    <span class="home_text">home</span> {address?.phone} |{" "}
                    {address?.address}{" "}
                    {/* <span class="change_text">
                      <i class="bi bi-pencil-fill"></i> Edit
                    </span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="add_more_address_btn">
            <Link to="/add-shipping-address">
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <i class="bi bi-plus"></i>
                </div>
                <div>Add More </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressList;
