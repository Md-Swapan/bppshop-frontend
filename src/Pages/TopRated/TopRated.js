import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { baseUrl } from './../../BaseUrl/BaseUrl';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductCard from './../../Components/Cards/ProductCard/ProductCard';


const TopRated = () => {
  const [topRatedProduct, setTopRatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/top-rated`, { params: { limit: 200, offset: 1 } })
      .then((res) => setTopRatedProduct(res?.data?.products));
    setLoading(false);
  }, []);
  return (
    <>
    <div className="newArrival_container">
      <h4>Top Rated Products:</h4>
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
            topRatedProduct?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))
          )}
        </SkeletonTheme>
        {/* </div> */}
      </div>
    </div>
  </>
  );
};

export default TopRated;