import React, { useEffect, useState } from "react";
import "./Shipping.css";
import delivery from "../../Assets/Images/shiping-icons/delivery.png";
import money from "../../Assets/Images/shiping-icons/money.png";
import Genuine from "../../Assets/Images/shiping-icons/Genuine.png";
import Payment from "../../Assets/Images/shiping-icons/Payment.png";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import ShippingModal from "../../Components/ShippingModal/ShippingModal";
import axios from "axios";
import { baseUrl } from "../../BaseUrl/BaseUrl";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    paddingBottom: "20px",
  },
};

const Shipping = () => {
  const token = localStorage.getItem("token");
  const [shippingAdd, setShippingAdd] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const defaultShippingAddress = shippingAdd.find(
    (item) => item.is_billing === 1
  );

  useEffect(() => {
    axios
      .get(baseUrl + "/shipping-address", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setShippingAdd(res.data.data);
      });
  }, []);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="shiping-view-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="shiping-heading">
                Delivery ADDRESS
              </div>
              <hr className="shippin_billing_header_line" />
              <div class="progress_container">
                <div
                  class="progress_content"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="shiping_container">
                <div className="shiping-address-heading">
                  Choose Delivery address
                </div>
                {defaultShippingAddress?.is_billing === 1 ? (
                  <div className="shiping_address_box">
                    <div className="shiped_name">
                      Delivery to :{" "}
                      {defaultShippingAddress?.contact_person_name}
                    </div>
                    <div className="shiped_address">
                      <span className="home_text"> home </span>
                      {defaultShippingAddress?.phone} |{" "}
                      {defaultShippingAddress?.address}{" "}
                      <Link to="/add-shipping-address">
                        <span className="change_text">
                          <i class="bi bi-pencil-fill"></i> Change
                        </span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div onClick={openModal} class="add_shipping_address_btn">
                    <div>
                      <i class="bi bi-plus"></i>
                    </div>
                    <div>Add Shipping Address</div>
                  </div>
                )}
              </div>
              <div className="shop_payment_btn_content">
                <div className="shop_payment_btn">
                  <div className="shop_cart_btn">
                    <i class="bi bi-chevron-left"></i> Shop cart
                  </div>
                  <div className="proceed_payment_btn">
                    Proceed payment <i class="bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shiping_amount_container">
                <div className="shiping_amount_content">
                  <div>Sub Total</div>
                  <div className="amount_text">৳945.00</div>
                </div>
                <div className="shiping_amount_content">
                  <div>Tax</div>
                  <div className="amount_text">৳0.00</div>
                </div>
                <div className="shiping_amount_content">
                  <div>Shiping</div>
                  <div className="amount_text">৳120.00</div>
                </div>
                <div className="shiping_amount_content">
                  <div>Discount on product</div>
                  <div className="amount_text">-৳45.00</div>
                </div>
                <div>
                  <input
                    className="coupon_input"
                    type="text"
                    placeholder="Coupon code"
                  />
                </div>
                <div>
                  <button className="coupon_btn">Apply code</button>
                </div>
                <hr />
                <div className="shiping_amount_content">
                  <div>Total</div>
                  <div className="amount_text">৳1,020.00</div>
                </div>
                <div class="container mt-4">
                  <div class="row">
                    <div class="col-md-3 p-0 text-center ">
                      <img
                        class="order-summery-footer-image"
                        src={delivery}
                        alt=""
                      />
                      <div class="deal-title">3 Days free delivery </div>
                    </div>

                    <div class="col-md-3 p-0 text-center">
                      <img
                        class="order-summery-footer-image"
                        src={money}
                        alt=""
                      />
                      <div class="deal-title">Money back guarantee</div>
                    </div>
                    <div class="col-md-3 p-0 text-center">
                      <img
                        class="order-summery-footer-image"
                        src={Genuine}
                        alt=""
                      />
                      <div class="deal-title">100% Genuine Product</div>
                    </div>
                    <div class="col-md-3 p-0 text-center">
                      <img
                        class="order-summery-footer-image"
                        src={Payment}
                        alt=""
                      />
                      <div class="deal-title">Authentic payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ShippingModal
          closeModal={closeModal}
          setShippingAdd={setShippingAdd}
        ></ShippingModal>
      </Modal>
    </>
  );
};

export default Shipping;
