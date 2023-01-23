import React from "react";
import { useNavigate } from "react-router-dom";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";

const SubSubCategoryCard = ({ SubSubcategory }) => {
  const navigate = useNavigate();
  const { id, name, slug, img } = SubSubcategory;

  const handleProductView = (id, subSubSlug) => {
    if (id) {
      navigate(slug);
    }
  };

  return (
    <div
      onClick={() => handleProductView(id, slug)}
      className="category_card_content"
    >
      <div className="card">
        <div className="card-body">
          {img ? (
            <img src={img} className="card-img-top" alt="" />
          ) : (
            <img src={defaultProImg} className="card-img-top" alt="" />
          )}
        </div>
        <div className="card-footer">{name}</div>
      </div>
    </div>
  );
};

export default SubSubCategoryCard;
