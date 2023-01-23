import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <div className="profile_container">
        <div className="row">
          <h4 className="profile_heading"> Profile Info </h4>
          <div class="col-md-3 col-sm-12">
            <div class="profile_left_container">
              <div class="sidebar_left">
                <a class="" href="https://bppshop.com.bd/account-oder ">
                  My order
                </a>
              </div>
              <div class="sidebar_left">
                <a class="" href="https://bppshop.com.bd/track-order ">
                  Track your order
                </a>
              </div>
              <div class="sidebar_left">
                <a class="" href="https://bppshop.com.bd/wishlists">
                  {" "}
                  Wish list{" "}
                </a>
              </div>

              <div class="sidebar_left">
                <a class="" href="https://bppshop.com.bd/chat-with-seller">
                  Chat with seller
                </a>
              </div>

              <div class="sidebar_left">
                <a
                  class="active-menu"
                  href="https://bppshop.com.bd/user-account"
                >
                  Profile info
                </a>
              </div>
              <div class="sidebar_left">
                <a class="" href="https://bppshop.com.bd/account-address">
                  Address{" "}
                </a>
              </div>
              <div class="sidebar_left">
                <a class="" href="https://bppshop.com.bd/account-tickets">
                  Support ticket
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-9 col-sm-12">
            <div className="profile_right_container">
              <form>
                <div className="profile_img_section">
                  <div className="profile_img_box">
                    <img
                      className="profile_img"
                      src="https://bppshop.com.bd/assets/front-end/img/image-place-holder.png"
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div>
                    <div className="profile_name">Md-Shuvo-miah</div>
                    <div>
                      <label for="files" class="change_profile_header">
                        Change your profile
                      </label>
                      <span className="change_profile_ratio">
                        ( * Image ratio should be 1:1 )
                      </span>
                      <input
                        className="hidden_input_file"
                        id="files"
                        name="image"
                        type="file"
                      />
                    </div>
                  </div>
                </div>
                <div className="account_info_header">Account information</div>
                <div class="form-group col-md-12">
                  <label for="name">Your name </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    value="Md-Shuvo-miah"
                    required=""
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label for="phone">Mobile </label>
                      <small class="text-primary">
                        ( * Country code is must Like for BD 880 )
                      </small>
                      <input
                        type="text"
                        class="form-control"
                        id="phone"
                        name="phone"
                        pattern="^(?:\+?88)?01[13-9]\d{8}$"
                        value="01676667145"
                        disabled=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label for="inputEmail4">Email </label>
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="account-email"
                        autocomplete="off"
                        value=""
                        data-gtm-form-interact-field-id="0"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label for="si-password">New password</label>
                      <div class="password-toggle">
                        <input
                          class="form-control"
                          name="password"
                          type="password"
                          id="password"
                          data-gtm-form-interact-field-id="1"
                        />
                        <label class="password-toggle-btn">
                          <input class="custom-control-input" type="checkbox" />
                          <i
                            class="czi-eye password-toggle-indicator"
                            onchange="checkPasswordMatch()"
                          ></i>
                          {/* <span class="sr-only">Show Password </span> */}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label for="newPass">Confirm password </label>
                      <div class="password-toggle">
                        <input
                          class="form-control"
                          name="con_password"
                          type="password"
                          id="confirm_password"
                        />
                        <div>
                          <label class="password-toggle-btn">
                            <input
                              class="custom-control-input"
                              type="checkbox"
                            />
                            <i
                              class="czi-eye password-toggle-indicator"
                              onchange="checkPasswordMatch()"
                            ></i>
                            {/* <span class="sr-only">Show Password </span> */}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile_form_btn_section">
                  <div><button className="profile_delete_btn">Delete</button></div>
                  <div><button className="profile_update_btn">Update</button></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
