import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ShippingAddressList.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadAllShippingAddress } from "../../../Redux/Actions/ShippingAddressAction";
import { setDefaultShippingAddress } from './../../../Redux/Actions/ShippingAddressAction';
import { getDeliveryCharge } from '../../../Redux/Actions/DeliveryChargeAction';
import MetaData from "../../../Pages/Layout/MetaData";

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
    <>
     <MetaData title="Choose-Default-Delivery-Address - BPPShop" />
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
                          <i className="bi bi-check-circle-fill"></i>
                        </div>
                      ) : (
                        <div
                          onClick={() =>
                            handleSetDefaultAddress(shippingAddInfo?.id)
                          }
                          className="set_default_btn"
                        >
                        <span onClick={()=> dispatch(getDeliveryCharge(shippingAddInfo?.district_id))}><i className="bi bi-check"></i> Choose</span>
                          
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="shiped_address">
                    <span className="home_text">home </span> { shippingAddInfo?.phone}{" "}
                    | {shippingAddInfo?.data?.address}{" "}
                    {/* <span className="change_text">
                      <i className="bi bi-pencil-fill"></i> Edit
                    </span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="add_more_address_btn">
            <Link to="/add-shipping-address">
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <i className="bi bi-plus"></i>
                </div>
                <div>Add Delivery Address </div>
              </div>
            </Link>
          </div> */}


          <Link to="/add-shipping-address">
            <button className="add_more_address_btn">
              <i className="bi bi-plus"></i> Add Delivery Address
            </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ShippingAddressList;
