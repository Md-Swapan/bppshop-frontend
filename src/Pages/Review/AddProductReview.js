import React, { useState } from "react";
import "./AddProductReview.css";
import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RatingStar } from "rating-star";

const AddProductReview = () => {
  const token = localStorage.getItem("token");
  const { pid } = useParams();
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/products/details/${pid}`).then((res) => {
      setProductDetail(res?.data?.data);
    });
  }, [pid]);

  const getProductsReviewDetails = () => {
    axios.get(`${baseUrl}/products/details/${pid}`).then((res) => {
      setProductDetail(res?.data?.data);
    });
  };
  const reversedReviews = productDetail?.reviews?.map((_, index, arr) => arr[arr.length - 1 - index]);

  //rating functionality
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };
  // Optinal callback functions
  const onSubmit = (data) => {
    const newData = {
      product_id: pid,
      comment: data.comment,
      rating: rating,
    };
    axios
      .post(baseUrl + `/products/reviews/submit`, newData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          reset();
          setRating(rating);
          getProductsReviewDetails();
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
          document.getElementById("errorMsg").innerText = res?.data?.message;
        }
      });
  };

  return (
    <div>
      <div className="comments-container">
        <h2>Rating and Comment</h2>
        <b>{productDetail.name}</b>
        <div
          style={{
            direction: "ltr",
            fontFamily: "sans-serif",
            touchAction: "none",
          }}
        >
          <Rating onClick={handleRating} allowFraction transition />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("comment", { required: true })}
            name="comment"
            placeholder="Enter Your Comment"
            id="textarea"
            cols="30"
            rows="3"
          ></textarea>

          <div>
            <i id="errorMsg" className="text-danger"></i>
          </div>

          <input
            className="border-0 px-4 py-2 rounded-2 text-light bg-warning"
            type="submit"
            value="Post Comment"
          />
          {/* <button type="button" onClick={() => reset()}>Reset</button> */}
        </form>
        <div>
          {reversedReviews &&
            reversedReviews.map((review) => (
              <div key={review.id} className="review-cart">
                <div className="user-img">
                  <img src="/img/userimg (1).webp" alt="" />
                </div>
                <div className="users-content">
                  <div className="user-qa-header">
                    <p>
                      <i className="bi bi-person"></i> {review?.customer?.name}
                    </p>
                    <p className="mx-2">
                      <i className="bi bi-clock"></i>{" "}
                      {review?.created_at.slice(0, 10)}
                    </p>
                    <RatingStar id={review?.id} rating={review?.rating} />
                    {/* <p className="rating-star">
                      {(() => {
                        let userRating = [];
                        for (let i = 1; i <= review.rating; i++) {
                          userRating.push(<i className="bi bi-star-fill"></i>);
                        }
                        let remaining = 5 - review.rating;
                        for (let i = 1; i <= remaining; i++) {
                          userRating.push(
                            <i className="bi bi-star-fill last"></i>
                          );
                        }
                        return userRating;
                      })()}
                    </p> */}
                  </div>
                  <small>{review?.comment}</small>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddProductReview;
