import React from 'react';
import './SellerStoreProduct.css';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SellerStoreProductsCard from '../SellerStoreProductsCard';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../BaseUrl/BaseUrl';

const SellerStoreProduct = () => {
  const { sellersStoreName, sellerId } = useParams();
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/brands/products/${sellerId}`)
      .then((res) => setBrandProducts(res?.data.data));
    setLoading(false);
  }, [sellerId]);

  return (
      <>
      <h4>{sellersStoreName} Products :</h4>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-4">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/sellers-store">Seller Store </Link>
          </li>
         
          <li className="breadcrumb-item active" aria-current="page">
          {sellersStoreName}
          </li>
        </ol>
      </nav>
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
              <SellerStoreProductsCard key={product?.id} product={product}/>
            ))
          )}
        </SkeletonTheme>
        {/* </div> */}
      </div>
    </>
  );
};

export default SellerStoreProduct;