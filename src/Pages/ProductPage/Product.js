import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/Cards/ProductCard/ProductCard";
import "./Product.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import MetaData from "./../Layout/MetaData";

const Product = ({ allCategory, isLoading }) => {
  const { slug, subSlug, subSubSlug } = useParams();
  const navigate = useNavigate();
  const categories = allCategory.find((item) => item.slug === slug);
  const subCategories = categories?.childes?.find(
    (item) => item.slug === subSlug
  );
  const subSubCategories = subCategories?.childes?.find(
    (item) => item.slug === subSubSlug
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/categories/products/${subSubCategories?.id}`)
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      });
  }, [subSubCategories?.id]);


  

  useEffect(() => {
    if (!isLoading && !subSubCategories) {
      navigate("/404", { replace: true });
    }
  }, [subSubCategories, isLoading, navigate]);

  return (
    <div className="categoryView-section productView-section">
      <MetaData title={`${subSubSlug}-${subSlug}-${slug}`} />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-4">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/${slug}`}>{slug}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/${slug}/${subSlug}`}>{subSlug}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {subSubSlug}
          </li>
        </ol>
      </nav>

      <div className="categoryView-container productView-container">
        {/* {products.length ? ( */}
          <div className="category_content product-content">
            <SkeletonTheme baseColor="#DDDDDD" highlightColor="#e3e3e3">
              {loading ? (
                <>
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                </>
              ) : (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </SkeletonTheme>
          </div>
        {/* ) : (
          <div className="category_content product-content">
            <SkeletonTheme baseColor="#DDDDDD" highlightColor="#F5F5F5">
              {loading ? (
                <>
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                </>
              ) : (
                <div className="no_product_content">
                  <img src={noProductImg} alt="" srcSet="" />
                </div>
              )}
            </SkeletonTheme>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Product;
