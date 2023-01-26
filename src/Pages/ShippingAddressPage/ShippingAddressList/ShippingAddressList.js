import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ShippingAddressList.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadAllShippingAddress } from "../../../Redux/Actions/ShippingAddressAction";
import { setDefaultShippingAddress } from './../../../Redux/Actions/ShippingAddressAction';

const ShippingAddressList = () => {
  const { allShippingAddressInfo } = useSelector((state) => state.allShippingInfo);
  const {shippingAddressInfo} = useSelector((state) => state.shippingInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadAllShippingAddress());
  }, [dispatch]);

  

  const handleSetDefaultAddress = (address_id) => {
    const addressId = {
      address_id : address_id
    }

    dispatch(setDefaultShippingAddress(addressId))

    if(shippingAddressInfo?.status === "success"){
      navigate("/shipping-details");
    }
  };

  return (
    <div>
      <div className="shipping_container">
        <div className="shipping_content">
          <div className="shipping_header">Delivery Address</div>
        </div>
        <hr className="shipping_line" />
        <div className="address_content">
          <div className="row">
            {allShippingAddressInfo?.data?.map((shippingAddInfo) => (
              <div key={shippingAddInfo?.id} className="col-md-6">
                <div className="shipping_address_box">
                  <div className="shipped_person">
                    <div>
                      Delivery to :{" "}
                      {shippingAddInfo?.contact_person_name}
                    </div>
                    <div>
                      {shippingAddInfo?.is_billing === 1 ? (
                        <div className="default_btn">
                          <i class="bi bi-check-circle-fill"></i>
                        </div>
                      ) : (
                        <div
                          onClick={() =>
                            handleSetDefaultAddress(shippingAddInfo?.id)
                          }
                          className="set_default_btn"
                        >
                          <i class="bi bi-check"></i> Choose
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="shiped_address">
                    <span class="home_text">home</span> {shippingAddInfo?.phone}{" "}
                    | {shippingAddInfo?.data?.address}{" "}
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
