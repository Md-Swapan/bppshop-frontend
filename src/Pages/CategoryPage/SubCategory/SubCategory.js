import React from "react";
import { Link, useParams } from "react-router-dom";
import SubCategoryCard from "./../../../Components/Cards/SubCategoryCard/SubCategoryCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MetaData from './../../Layout/MetaData';

const SubCategory = ({ allCategory, loading }) => {
  const { slug } = useParams();
  const subCategories = allCategory.find((item) => item.slug === slug);

  return (
    <>
      <div className="categoryView-section">
      <MetaData title="BPPShop Sub Category" />
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb my-4">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {slug}
            </li>
          </ol>
        </nav>

        <div className="categoryView-container">
          <div className="category_content">
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
                subCategories?.childes?.map((subcategory) => (
                  <SubCategoryCard
                    key={subcategory.id}
                    subcategory={subcategory}
                  />
                ))
              )}
            </SkeletonTheme>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategory;
