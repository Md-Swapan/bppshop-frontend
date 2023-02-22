import React from "react";
import { Link, useParams } from "react-router-dom";
import SubSubCategoryCard from "./../../../Components/Cards/SubSubCategoryCard/SubSubCategoryCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MetaData from './../../Layout/MetaData';

const SubSubCategory = ({ allCategory, loading }) => {
  const { slug, subSlug } = useParams();
  const subCategories = allCategory.find((item) => item.slug === slug);
  const subSubCategories = subCategories?.childes?.find(
    (item) => item.slug === subSlug
  );

  return (
    <>
      <div className="categoryView-section">
      <MetaData title={`${subSlug} - ${slug}`} />
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb my-4">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              <Link to={`/${slug}`}>{slug}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {subSlug}
            </li>
          </ol>
        </nav>

        <div className="categoryView-container">
          <div className="category_content">
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
                subSubCategories?.childes?.map((SubSubcategory) => (
                  <SubSubCategoryCard
                    key={SubSubcategory.id}
                    SubSubcategory={SubSubcategory}
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

export default SubSubCategory;
