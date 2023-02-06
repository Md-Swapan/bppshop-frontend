import React from "react";
import "./ForgetPassword.css";

const ForgetPassWord = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-md-10">
        <h2 className="h3 mb-4">Forgot your password?</h2>
        <p className="font-size-md">
          Change your password in three easy steps. This helps to keep your new
          password secure .
        </p>
        <ol>
          <li>Fill in your phone number below.</li>
          <li>We will send you a OTP.</li>
          <li>Use the OTP to reset your password on our secure website.</li>
        </ol>

        <form>
          <div className="recover_pass_card">
            <div className="recover_pass_card_body needs-validation">
              <label htmlFor="recover-email">Enter your phone number</label>
              <input
                className="recover_pass_input"
                type="text"
                name="identity"
                required
              />
              <button className="recover_pass_btn" type="submit">
                Get new password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassWord;
