import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../../BaseUrl/BaseUrl";
import "./Brands.css";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseUrl}/brands`)
    .then((res) => setBrands(res?.data.data));
    setLoading(false)
  }, []);
  return (
    <>
      <h4>Brands:</h4>
      <div className="brand_container mt-4">
        <SkeletonTheme baseColor="#DDDDDD" highlightColor="#e3e3e3">
          {loading ? (
            <>
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
            </>
          ) : (
            brands?.map((brand, index) => (
              <Link to={`/brand/${brand.name}/${brand.id}`}>
                <div className="brand_content">
                  <img
                    src={`https://backend.bppshop.com.bd/storage/brand/${brand?.image}`}
                    alt=""
                  />
                  <p>{brand?.name}</p>
                </div>
              </Link>
            ))
          )}
        </SkeletonTheme>
      </div>
    </>
  );
};

export default Brands;
