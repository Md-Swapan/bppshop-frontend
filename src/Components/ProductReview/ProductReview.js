import React from "react";
import "./ProductReview.css";

const ProductReview = () => {
  return (
    <>
      {/* <div className="review-section"> */}
        <div className="container-fluid reviewSection">
          <div className="row">
            <div className="col-md-6">
              <div className="customer-qa">
                <h2>Customers Q & A</h2>
                <div>
                  <div className="review-cart">
                    <div className="user-img">
                      <img src="/img/userimg (1).webp" alt="" />
                    </div>
                    <div className="users-content">
                      <div className="user-qa-header">
                        <p>
                          <i className="bi bi-person"></i> User Name
                        </p>
                        <p>
                          <i className="bi bi-clock"></i> Feb 2, 2023
                        </p>
                        <p className="rating-star">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </p>
                        <button>
                          <i className="bi bi-arrow-90deg-left"></i> Replay
                        </button>
                      </div>
                      <small>
                      খুবিই ভালো যেমনটা চেয়েছিলাম তেমনটাই পেলাম, এবং খুব দ্রুত ডেলিভারি পেয়েছি। ধন্যবাদ ❤️❤️❤️
                      </small>
                    </div>
                    
                  </div>
                </div>

                <div className="comments-container">
                  <h2>Leave a Comment</h2>
                  <form action="">
                    <div className="input-container">
                      <div className="input-container-content">
                        <label htmlFor="">Name</label>
                        <br />
                        <input type="text" />
                      </div>
                      <div className="input-container-content">
                        <label htmlFor="">Email</label>
                        <br />
                        <input type="email" />
                      </div>
                    </div>
                    <br />
                    <textarea
                      name=""
                      id="textarea"
                      cols="30"
                      rows="3"
                    ></textarea>

                    <button type="submit">Post Comment</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="customer-reviews">
                <h2>Customers Review</h2>

                <div className="averageRating-container">
                  <h1>4.5</h1>
                  <div>
                    <h2>Average Ratings</h2>
                    <p className="rating-star">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill last"></i>
                    </p>
                  </div>
                </div>
                <div className="star-progress-container">
                  <div className="star-progress">
                    <p>5 Star </p>
                    <div className="progressbar">
                      <div className="progress" id="value5">
                        <span className="value">85%</span>
                      </div>
                    </div>
                  </div>
                  <div className="star-progress">
                    <p>4 Star </p>
                    <div className="progressbar">
                      <div className="progress" id="value4">
                        <span className="value">75%</span>
                      </div>
                    </div>
                  </div>
                  <div className="star-progress">
                    <p>3 Star </p>
                    <div className="progressbar">
                      <div className="progress" id="value3">
                        <span className="value">65%</span>
                      </div>
                    </div>
                  </div>
                  <div className="star-progress">
                    <p>2 Star </p>
                    <div className="progressbar">
                      <div className="progress" id="value2">
                        <span className="value">45%</span>
                      </div>
                    </div>
                  </div>
                  <div className="star-progress">
                    <p>1 Star </p>
                    <div className="progressbar">
                      <div className="progress" id="value1">
                        <span className="value">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default ProductReview;
