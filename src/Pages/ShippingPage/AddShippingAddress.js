import React, { useEffect, useState } from "react";
import "./AddShippingAddress.css";
import Modal from "react-modal";
// import ShippingModal from "../../Components/ShippingModal/ShippingModal";
import axios from "axios";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import { useNavigate } from "react-router-dom";
import ShippingModal from "../../Components/ShippingModal/ShippingModal";
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

const AddShippingAddress = () => {
  const token = localStorage.getItem("token");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [shippingAddressList, setShippingAddressList] = useState([]);
  // console.log(shippingAddress);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseUrl + "/shipping-address", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setShippingAddressList(res.data.data);
        
      });
  }, []);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleDefaultAddress = (address_id) => {
    axios
      .post(baseUrl + "/shipping-address/set-default", address_id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/shipping-details");
        }
      });
  };


  return (
    <>
      <div className="shipping_container">
        <div className="shipping_content">
          <div className="shipping_header">Delivery Address</div>
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
                    <span class="change_text">
                      <i class="bi bi-pencil-fill"></i> Edit
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div onClick={openModal} className="row">
            <div class="add_more_address_btn">
              <div>
                <i class="bi bi-plus"></i>
              </div>
              <div>Add More</div>
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
        <ShippingModal closeModal={closeModal} setShippingAddressList={setShippingAddressList}/>
        {/* <div className="shipping_modal_container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shipping_modal_content">
              <div className="shipping_modal_header">Add New Address</div>
            </div>
            <hr className="shipping_modal_line" />

            <div className="shipping_address_input_container">
              <div className="form-group">
                <span>Contact person name *</span>
                <input
                  {...register("contact_person_name", { required: true })}
                  name="contact_person_name"
                  className="shipping_address_input"
                  type="text"
                  placeholder="Md-Shuvo-miah"
                />
              </div>
              <div className="form-group">
                <span>Phone *</span>
                <input
                  {...register("phone", { required: true })}
                  name="phone"
                  className="shipping_address_input"
                  type="text"
                  placeholder="01676667145"
                />
              </div>
              <div className="form-group">
                <span>Area*</span>
                <select
                  {...register("area_id", { required: true })}
                  name="area_id"
                  class=" shipping_address_input"
                  aria-label="Default select example"
                >
                  <option selected>------Select Area------</option>
                  <option value="1">Dhaka</option>
                  <option value="2">Khulna</option>
                  <option value="3">Borishal</option>
                </select>
              </div>
              <div className="form-group">
                <span>District/City*</span>
                <select
                  {...register("district_id", { required: true })}
                  name="district_id"
                  class="shipping_address_input"
                  aria-label="Default select example"
                >
                  <option selected>------Select District/City------</option>
                  <option value="1">Tangail</option>
                  <option value="2">Mymenshing</option>
                  <option value="3">Gazipur</option>
                </select>
              </div>
              <div className="form-group">
                <span>Upazila/Thana*</span>
                <select
                  {...register("upazila_id", { required: true })}
                  name="upazila_id"
                  class="shipping_address_input"
                  aria-label="Default select example"
                >
                  <option selected>------Select Upazila/Thana------</option>
                  <option value="1">Tangail</option>
                  <option value="2">Basail</option>
                  <option value="3">Modhupur</option>
                </select>
              </div>
              <div className="form-group">
                <span>Address *</span>
                <input
                  {...register("address", { required: true })}
                  name="address"
                  className="shipping_address_input"
                  type="text"
                  placeholder="House no. / Building /Street /Area"
                />
              </div>
            </div>

            <div className="shipping_modal_close">
              <div className="shipping_modal_close">
              <div onClick={closeModal}>
                <input
                  className="shipping_modal_close_btn"
                  type="button"
                  value="close"
                />
              </div>
              <div>
                <input
                  className="shipping_modal_save_btn"
                  type="submit"
                  value="save"
                />
              </div>
            </div>
            </div>
          </form>
        </div> */}
      </Modal>
    </>
  );
};

export default AddShippingAddress;
