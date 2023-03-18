import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl, imgThumbnailBaseUrl } from "./../../../BaseUrl/BaseUrl";
import { useParams } from "react-router-dom";
import "./BrandsProducts.css";
import ProductCard from "./../../../Components/Cards/ProductCard/ProductCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const BrandsProducts = () => {
  const { id, name } = useParams();
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/brands/products/${id}`)
      .then((res) => setBrandProducts(res?.data.data));
    setLoading(false);
  }, [id]);

  return (
    <>
      <h4>{name} Products :</h4>
      <div className="product-container mt-4">
        {/* <div className="product-content"> */}
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
            </>
          ) : (
            brandProducts.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))
          )}
        </SkeletonTheme>
        {/* </div> */}
      </div>
    </>
  );
};

export default BrandsProducts;
