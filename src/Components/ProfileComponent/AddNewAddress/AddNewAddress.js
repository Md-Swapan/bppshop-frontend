import React from "react";
import "./AddNewAddress.css";

const AddNewAddress = () => {
  return (
    <div>
      <h4>Add new address</h4>
      <form>
        <div class="row">
          <div class="col-md-6 d-flex">
            <ul class="donate-now">
              <li>
                <input
                  type="radio"
                  id="a25"
                  name="addressAs"
                  value="permanent"
                  data-gtm-form-interact-field-id="0"
                />
                <label for="a25" class="component">
                  Permanent
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="a50"
                  name="addressAs"
                  value="home"
                  data-gtm-form-interact-field-id="1"
                />
                <label for="a50" class="component">
                  Home
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="a75"
                  name="addressAs"
                  value="office"
                  checked="checked"
                  data-gtm-form-interact-field-id="2"
                />
                <label for="a75" class="component">
                  Office
                </label>
              </li>
            </ul>
          </div>

          <div class="col-md-6 d-flex">
            <ul class="donate-now">
              <li>
                <input
                  type="radio"
                  name="is_billing"
                  id="b25"
                  value="0"
                  data-gtm-form-interact-field-id="3"
                />
                <label for="b25" class="billing_component">
                  Shipping
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  name="is_billing"
                  id="b50"
                  value="1"
                  data-gtm-form-interact-field-id="4"
                />
                <label for="b50" class="billing_component">
                  Billing
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4">
          <div class="row">
            <div class="col-md-6">
              <label for="name">Contact person name</label>
              <input
                class="add_new_address_input"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="firstName">Phone</label>
              <input
                class="add_new_address_input"
                type="text"
                id="phone"
                name="phone"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label for="address-city">City</label>
              <input
                class="add_new_address_input"
                type="text"
                id="address-city"
                name="city"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="zip">Zip code</label>
              <input
                class="add_new_address_input"
                type="number"
                id="zip"
                name="zip"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label for="address">Address</label>

              <textarea
                class="add_new_address_input"
                id="address"
                type="text"
                name="address"
                required=""
              ></textarea>
            </div>
          </div>

          <div class="add_new_address_btn_section">
            <button
              type="button"
              class="add_new_address_close_btn"
            >
              Close
            </button>
            <button type="submit" class="add_new_address_submit_btn">
              Add Informations{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewAddress;
