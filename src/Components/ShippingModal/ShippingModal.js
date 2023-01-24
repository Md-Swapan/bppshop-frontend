import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseUrl} from "../../BaseUrl/BaseUrl";
import "./ShippingModal.css";
import { useNavigate } from "react-router-dom";

const ShippingModal = ({
  closeModal,
  setShippingAdd,
  setShippingAddressList,
}) => {
  const token = localStorage.getItem("token");
  const { register, handleSubmit } = useForm();

  const [districtDataOptions, setDistrictDataOptions] = useState([]);
  const [thanaDataOptions, setThanaDataOptions] = useState([]);
  const [areaDataOptions, setAreaDataOptions] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [thanaId, setThanatId] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(baseUrl + "/location/districts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDistrictDataOptions(res.data.data);
      });
  }, []);

  const handleDistrictChange = (e) => {
    e.preventDefault();
    const districtId = e.target.value;
    setDistrictId(e.target.value);
    axios
      .get(baseUrl + `/location/thanas/${districtId}`)
      .then((res) => setThanaDataOptions(res.data.data));
  };
  const handleThanaChange = (e) => {
    e.preventDefault();
    const thanaId = e.target.value;
    setThanatId(e.target.value);
    axios
      .get(baseUrl + `/location/areas/${thanaId}`)
      .then((res) => setAreaDataOptions(res.data.data));
  };

  const onSubmit = (data) => {
    const district_id = districtId;
    const upazila_id = thanaId;
    const newData = { ...data, district_id, upazila_id };
    axios
      .post(baseUrl + "/shipping-address/add", newData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          setShippingAdd(res.data.data);
          setShippingAddressList(res.data.data);
          
          // navigate("/shipping-details");
        }
      });
  };
  return (
    <>
      <div className="shipping_modal_container">
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
              <span>District/City*</span>
              <select
                // {...register("district_id", { required: true })}
                onChange={handleDistrictChange}
                required
                name="district_id"
                class="shipping_address_input"
                aria-label="Default select example"
              >
                <option value={null} selected>
                  ------Select District/City------
                </option>
                {districtDataOptions?.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <span>Upazila/Thana*</span>
              <select
                // {...register("upazila_id", { required: true })}
                onChange={handleThanaChange}
                required
                name="upazila_id"
                class="shipping_address_input"
                aria-label="Default select example"
              >
                <option value={null} selected>
                  ------Select Upazila/Thana------
                </option>
                {thanaDataOptions.map((thana) => (
                  <option key={thana.id} value={thana.id}>
                    {thana.name}
                  </option>
                ))}
              </select>
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
                {areaDataOptions.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
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
            <div onClick={closeModal}>
              <input
                className="shipping_modal_close_btn"
                type="button"
                value="close"
              />
            </div>
            <div>
              <input onClick={closeModal}
                className="shipping_modal_save_btn"
                type="submit"
                value="save"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingModal;
