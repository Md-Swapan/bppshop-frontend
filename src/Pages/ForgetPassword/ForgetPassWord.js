import React from "react";
import "./ForgetPassword.css";

const ForgetPassWord = () => {
  return (
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <h2 class="h3 mb-4">Forgot your password?</h2>
        <p class="font-size-md">
          Change your password in three easy steps. This helps to keep your new
          password secure .
        </p>
        <ol>
          <li>Fill in your phone number below.</li>
          <li>We will send you a OTP.</li>
          <li>Use the OTP to reset your password on our secure website.</li>
        </ol>

        <form>
          <div class="recover_pass_card">
            <div class="recover_pass_card_body needs-validation">
              <label for="recover-email">Enter your phone number</label>
              <input
                class="recover_pass_input"
                type="text"
                name="identity"
                required
              />
              <button class="recover_pass_btn" type="submit">
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
