import React from "react";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import ProductCard from "./../../Components/Cards/ProductCard/ProductCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Search = () => {
  const { searchProducts, loading } = useSelector(
    (state) => state?.searchProducts
  );
  return (
    <>
      <MetaData title="Search:- BPPShop" />
      <div className="categoryView-container productView-container">
        {searchProducts?.length ? (
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
                </>
              ) : (
                searchProducts?.map((product) => (
                  <ProductCard key={product?.id} product={product} />
                ))
              )}
            </SkeletonTheme>
          </div>
        ) : (
          !loading && (
            <div className="d-flex justify-content-center align-items-center">
              <h2 className="text-danger mt-5">Product Not Found!</h2>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Search;
