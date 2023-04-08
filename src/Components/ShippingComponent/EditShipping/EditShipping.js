import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import MetaData from "../../../Pages/Layout/MetaData";
import { toast } from "react-hot-toast";

const EditShipping = () => {
  const token = localStorage.getItem("token");
  const [districtDataOptions, setDistrictDataOptions] = useState([]);
  const [thanaDataOptions, setThanaDataOptions] = useState([]);
  const [areaDataOptions, setAreaDataOptions] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [thanaId, setThanaId] = useState(null);
  const { editId } = useParams();
  const [editAddress, setEditAddress] = useState([]);

  // console.log(editAddress,'editAddress');

  //for view edit values
  useEffect(() => {
    axios
      .get(baseUrl + `/shipping-address/edit-address?id=${editId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEditAddress(res.data.address);
      });
  }, [editId, token]);

  //thana distric selections
  useEffect(() => {
    axios
      .get(baseUrl + "/location/districts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDistrictDataOptions(res.data.data);
      });
  }, [token]);

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
    setThanaId(e.target.value);
    axios
      .get(baseUrl + `/location/areas/${thanaId}`)
      .then((res) => setAreaDataOptions(res.data.data));
  };

  //update address and delevary charge set
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const district_id = districtId;
    const upazila_id = thanaId;
    const id = editId;
    const newData = { ...data, district_id, upazila_id, id };
    // console.log(newData);
    axios
      .post(baseUrl + `/shipping-address/update-address`, newData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          navigate("/shipping-address");
          // toaster
          toast.success(res?.data?.message, {
            duration: 5000,

            style: {
              width: "100%",
              height: "80px",
              padding: "0px 20px",
              background: "#86bc19",
              color: "#fff",
            },
          });
        } else {
          document.getElementById("error_msg").innerText = res?.data?.message;
        }
      });
  };
  return (
    <>
      <MetaData title="Edit-New-Delivery-Address - BPPShop" />
      <div className="shipping_Add_container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shipping_Add_content">
            <div className="shipping_Add_header">Update Delivery Address</div>
          </div>
          <hr className="shipping_Add_line" />

          <div className="shipping_address_input_container">
            <div className="form-group">
              <span>Contact person name </span>
              <input
                {...register("contact_person_name")}
                name="contact_person_name"
                className="shipping_address_input"
                type="text"
                defaultValue={editAddress.contact_person_name}
              />
            </div>
            <div className="form-group">
              <span>Phone </span>
              <input
                {...register("phone")}
                name="phone"
                className="shipping_address_input"
                type="text"
                defaultValue={editAddress.phone}
              />
            </div>
            <div className="form-group">
              <span>District/City</span>
              <select
                onChange={handleDistrictChange}
                name="district_id"
                className="shipping_address_input"
                aria-label="Default select example"
              >
                <option defaultValue={editAddress.district_id} selected>
                  {editAddress.city}
                </option>
                {districtDataOptions?.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <span>Upazila/Thana</span>
              <select
                onChange={handleThanaChange}
                name="upazila_id"
                className="shipping_address_input"
                aria-label="Default select example"
              >
                <option defaultValue={editAddress.upazila_id} selected>
                  {editAddress.thana}
                </option>
                {thanaDataOptions.map((thana) => (
                  <option key={thana.id} value={thana.id}>
                    {thana.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <span>Area</span>
              <select
                {...register("area_id")}
                name="area_id"
                className=" shipping_address_input"
                aria-label="Default select example"
              >
                <option defaultValue={editAddress.area_id} selected>
                  {editAddress.zip}
                </option>
                {areaDataOptions.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <span>Address </span>
              <input
                {...register("address")}
                name="address"
                className="shipping_address_input"
                type="text"
                placeholder="House no. / Building /Street /Area"
                defaultValue={editAddress.address}
              />
            </div>
            <div>
              <i id="error_msg" className="text-danger"></i>
            </div>
          </div>

          <div className="shipping_add_close_btn">
            <div>
              <Link to="/shipping-details">
                <input
                  className="shipping_close_btn"
                  type="button"
                  value="Close"
                />
              </Link>
            </div>
            <div>
              <input
                className="shipping_save_btn"
                type="submit"
                value="Update"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditShipping;
