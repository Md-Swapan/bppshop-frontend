import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadUserOrders } from "../../../Redux/Actions/UserOrderAction";
import "./AddressHome.css";
import store from './../../../Redux/Store';

const AddressHome = () => {
  
  useEffect(() => {
    store.dispatch(loadUserOrders())
  }, [])

  const userOrders = useSelector((state) => {
    return state?.userOrders?.userOrders;
  });

  const shipping_address_data = userOrders?.map(order => order.shipping_address_data);
  console.log(shipping_address_data);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="">ADDRESSES</h4>
        </div>
        <div>
          <Link to="/profile/add-new-address">
            <button className="add_new_address_btn">Add new address</button>
          </Link>
        </div>
      </div>
      <div className="address_card_container">
        {shipping_address_data?.map((sippingAdd) => (
          <div key={sippingAdd?.id} className="arrdess_card">
            <div className="address_card_header">
              <div className="address_card_header_pin">
                <i className="bi bi-pin-fill"></i>
              </div>
              <div className="home_shipping_address_title">
                <span> {sippingAdd.address_type} Address ({sippingAdd.address})</span>
              </div>
              <div className="d-flex justify-content-between">
                <div className="address_card_header_edit mx-1">
                  <i className="bi bi-pencil-square"></i>
                </div>
                <div className="address_card_header_delete mx-1">
                  <i className="bi bi-trash3-fill"></i>
                </div>
              </div>
            </div>
            <div className="address_card_body">
              <h6>{sippingAdd.contact_person_name}</h6>
              <p>
                <span>Phone :</span> {sippingAdd.phone}
              </p>
              <p>
                <span>City :</span> {sippingAdd.city}
              </p>
              <p>
                <span>Zip Code :</span> {sippingAdd.zip}
              </p>
              <p>
                <span>Address :</span> {sippingAdd.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressHome;
