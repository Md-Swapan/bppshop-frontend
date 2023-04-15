import React from "react";
import { useParams } from "react-router-dom";
import "./AddProductReview.css";
import { useSelector } from "react-redux";

const AddProductReview = () => {
  const { pid } = useParams();
const { userOrderDetails } = useSelector((state) => state?.userOrderDetails);
// console.log(pid);
// console.log(userOrderDetails);
const reviewProductDetails = userOrderDetails.find((i) => i?.product_id === parseInt(pid));
// console.log(reviewProductDetails?.product_details?.name);


  return (
    <div>
      <div className="comments-container">
        <h2>Leave a Comment</h2>
        <p>{reviewProductDetails?.product_details?.name}</p>
 
        <form action="">
          <div className="input-container">
            {/* <div className="input-container-content">
              <label htmlFor="">Name</label>
              <br />
              <input type="text" />
            </div>
            <div className="input-container-content">
              <label htmlFor="">Email</label>
              <br />
              <input type="email" />
            </div> */}
          </div>
          <br />
          <textarea name="" id="textarea" cols="30" rows="3"></textarea>
          

          <button type="submit">Post Comment</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductReview;
