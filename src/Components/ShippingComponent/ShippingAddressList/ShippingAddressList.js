import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ShippingAddressList.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadAllShippingAddress } from "../../../Redux/Actions/ShippingAddressAction";
import { setDefaultShippingAddress } from "./../../../Redux/Actions/ShippingAddressAction";
import { getDeliveryCharge } from "../../../Redux/Actions/DeliveryChargeAction";
import MetaData from "../../../Pages/Layout/MetaData";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import { toast } from "react-hot-toast";

const ShippingAddressList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadAllShippingAddress());
  }, [dispatch]);

  const { allShippingAddressInfo } = useSelector(
    (state) => state.allShippingInfo
  );
  // console.log(allShippingAddressInfo?.data);
  const { shippingAddressInfo } = useSelector((state) => state.shippingInfo);

  const handleSetDefaultAddress = (address_id) => {
    const addressId = {
      address_id: address_id,
    };

    dispatch(setDefaultShippingAddress(addressId));

    if (shippingAddressInfo?.status === "success") {
      navigate("/shipping-details");
    }
  };

  //address detele functionality
  const handleDeleteAddress = (shippingId, customerId) => {
    const token = localStorage.getItem("token");
    const deleteData = {
      customer_id: customerId,
      id: shippingId,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(`${baseUrl}/shipping-address/delete-address`, deleteData, config)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          dispatch(loadAllShippingAddress());
          toast.success(res.data.message, {
            duration: 5000,
      
            style: {
              width: "100%",
              height: "80px",
              padding: "0px 20px",
              background: "#86bc19",
              color: "#fff",
            },
          });
        }
      });
  };

  return (
    <>
      <MetaData title="Choose-Default-Delivery-Address - BPPShop" />
      <div>
        <div className="shipping_container">
          <div className="shipping_content">
            <div className="shipping_header">Choose Delivery Address or Add New Delivery Address</div>
          </div>
          <hr className="shipping_line" />
          <div className="address_content">
            <div className="row">
              {allShippingAddressInfo &&
                allShippingAddressInfo?.data?.map((shippingAddInfo) => (
                  <div key={shippingAddInfo?.id} className="col-md-6">
                    <div className="shipping_address_box">
                      <div className="shipped_person">
                        <div>
                          <h6>Delivery to : {shippingAddInfo?.contact_person_name}</h6>
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
                              <span
                                onClick={() =>
                                  dispatch(
                                    getDeliveryCharge(
                                      shippingAddInfo?.district_id
                                    )
                                  )
                                }
                              >
                                <i className="bi bi-check"></i> Choose
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="shiped_address">
                        <span className="home_text ">Home </span>{" "}
                        <span className="mx-2">{shippingAddInfo?.phone} | {shippingAddInfo?.address}{" "}</span>
                        <span className="change_text mx-2">
                          <i className="bi bi-pencil-fill"></i> Edit
                        </span>
                        <span
                          onClick={() =>
                            handleDeleteAddress(
                              shippingAddInfo.id,
                              shippingAddInfo.customer_id
                            )
                          }
                          className="change_text"
                        >
                          <i className="bi bi-trash3-fill"></i> Delete
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

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
