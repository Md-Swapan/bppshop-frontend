import React, { useState } from "react";
import "./CheckoutPayment.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import {
  ClearCart,
  ClearCartGroupItems,
} from "../../../Redux/Actions/CartAction";
import MetaData from "../../../Pages/Layout/MetaData";
import cashOnDeliveryImg from "../../../Assets/Images/bankLogo/cash-on-delivery.jpg";
import codDoneImg from "../../../Assets/Images/bankLogo/done.jpg";
import OptionImg from "../../../Assets/Images/bankLogo/visa-logo-800x450.jpg";
import OptionImg1 from "../../../Assets/Images/bankLogo/Bkash-logo.png";
import OptionImg2 from "../../../Assets/Images/bankLogo/Nagad-Logo.wine.png";
import OptionImg3 from "../../../Assets/Images/bankLogo/rocket (1).png";
import OptionImg22 from "../../../Assets/Images/bankLogo/download (1).png";

const CheckoutPayment = () => {
  const { shippingAddressInfo } = useSelector((state) => state?.shippingInfo);
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleCheckoutConfirm = (id) => {
    const address_id = {
      address_id: id,
    };
    axios.post(`${baseUrl}/cart/checkout`, address_id, config).then((res) => {
      if (res.data.status === "success") {
        dispatch(ClearCart());
        // dispatch(clearShippingAddress());
        dispatch(ClearCartGroupItems());
        navigate("/checkout-complete");
      }
    });
  };

  const [paymentType, setPaymentType] = useState("");
  const isRadioSelected = (value) => paymentType === value;
  const handleRadioClick = (event) => setPaymentType(event.target.value);

  const cashOnDeliveryHandler = () => {
    const codBtn = document.querySelector(".cashOnDelivery_content");
    const paymentOptionWayContent = document.querySelector(
      ".payment-option-way"
    );
    const bankPaymentOptionWay = document.querySelector(
      ".bankPayment-option-way"
    );
    const cashOnDeliveryNextBtn = document.querySelector(
      "#cashOnDeliveryNextBtn"
    );
    codBtn.style.display = "block";
    paymentOptionWayContent.style.display = "none";
    bankPaymentOptionWay.style.display = "none";
    cashOnDeliveryNextBtn.style.display = "block";
  };

  const MobilePaymentOptionHandler = () => {
    const paymentOptionWayContent = document.querySelector(
      ".payment-option-way"
    );
    const bankPaymentOptionWay = document.querySelector(
      ".bankPayment-option-way"
    );
    const cashOnDeliveryNextBtn = document.querySelector(
      "#cashOnDeliveryNextBtn"
    );
    const codBtn = document.querySelector(".cashOnDelivery_content");
    paymentOptionWayContent.style.display = "block";
    codBtn.style.display = "none";
    bankPaymentOptionWay.style.display = "none";
    cashOnDeliveryNextBtn.style.display = "none";
  };

  const BankPaymentOptionHandler = () => {
    const bankPaymentOptionWay = document.querySelector(
      ".bankPayment-option-way"
    );
    const codBtn = document.querySelector(".cashOnDelivery_content");
    const paymentOptionWayContent = document.querySelector(
      ".payment-option-way"
    );
    const cashOnDeliveryNextBtn = document.querySelector(
      "#cashOnDeliveryNextBtn"
    );
    bankPaymentOptionWay.style.display = "block";
    codBtn.style.display = "none";
    paymentOptionWayContent.style.display = "none";
    cashOnDeliveryNextBtn.style.display = "none";
  };

  const AgentWalletPaymentHandler = () => {
    const bankPaymentOptionWay = document.querySelector(
      ".bankPayment-option-way"
    );
    const codBtn = document.querySelector(".cashOnDelivery_content");
    const paymentOptionWayContent = document.querySelector(
      ".payment-option-way"
    );
    const cashOnDeliveryNextBtn = document.querySelector(
      "#cashOnDeliveryNextBtn"
    );
    bankPaymentOptionWay.style.display = "none";
    codBtn.style.display = "none";
    paymentOptionWayContent.style.display = "none";
    cashOnDeliveryNextBtn.style.display = "none";
  };

  return (
    <>
      <MetaData title="Payment-Method - BPPShop" />

      <div className="payment_method_container">
        <h3 className="mb-2">Payment Method</h3>
        <hr />

        <div className="payment-way-container">
          {/* <h4>Payment by : </h4> */}
          <h4>Choose Payment Method: </h4>

          <div className="payment-way">
            <div className="cashOnDeliVery">
              <div>
                <input
                  type="radio"
                  name="selectedRadioBtn"
                  value="cashOnDelivery"
                  checked={isRadioSelected("cashOnDelivery")}
                  onChange={handleRadioClick}
                  onClick={cashOnDeliveryHandler}
                />
                <label htmlFor="cashOnDelivery">Cash On Delivery</label>
              </div>

              <div className="cashOnDelivery_content">
                <div className="d-flex">
                  <div className="COD_Btn">
                    <img alt="" src={cashOnDeliveryImg} />
                  </div>
                  <div className="m-2 px-2">
                    <img width={40} alt="" src={codDoneImg} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile_payment">
              <div>
                <input
                  type="radio"
                  name="selectedRadioBtn"
                  value="mobilePayment"
                  checked={isRadioSelected("mobilePayment")}
                  onChange={handleRadioClick}
                  onClick={MobilePaymentOptionHandler}
                />
                <label htmlFor="mobilePayment">Mobile Payment</label>
              </div>
              <div className="payment-option-way">
                <div className="payment-option">
                  <div>
                    <img width={100} src={OptionImg1} alt="" />
                  </div>
                  <div>
                    <img width={100} src={OptionImg2} alt="" />
                  </div>
                  <div>
                    <img width={119} src={OptionImg3} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bank_payment">
              <div>
                <input
                  type="radio"
                  name="selectedRadioBtn"
                  value="bankPayment"
                  checked={isRadioSelected("bankPayment")}
                  onChange={handleRadioClick}
                  onClick={BankPaymentOptionHandler}
                />
                <label htmlFor="bankPayment">Bank Payment</label>
              </div>
              <div className="bankPayment-option-way">
                <div className="bankPayment-option">
                  <div>
                    <img width={109} src={OptionImg} alt="" />
                  </div>
                  <div>
                    <img width={102} src={OptionImg22} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="agent_Wallet_payment">
              <div>
                <input
                  type="radio"
                  name="selectedRadioBtn"
                  value="agentWalletPayment"
                  checked={isRadioSelected("agentWalletPayment")}
                  onChange={handleRadioClick}
                  onClick={AgentWalletPaymentHandler}
                />
                <label htmlFor="agentWalletPayment">Agent Wallet</label>
              </div>
              <div className="payment-option-way"></div>
            </div>
          </div>
        </div>

        <div className="payment_bottom_Btn">
          <div className="d-flex">
            <Link to="/shipping-details">
              <button className="back_to_shipping">Back to Shipping</button>
            </Link>

            <button
              onClick={() =>
                handleCheckoutConfirm(shippingAddressInfo?.data?.id)
              }
              type=""
              id="cashOnDeliveryNextBtn"
            >
            {/* Next */}
              {/* {paymentType === "cashOnDelivery" ? "Confirm": "Next"} */}
              {paymentType === "mobilePayment" || paymentType === "bankPayment" || paymentType === "agentWalletPayment" ? "Next": "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPayment;
