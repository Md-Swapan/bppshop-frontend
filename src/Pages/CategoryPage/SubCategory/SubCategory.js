import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SubCategoryCard from "./../../../Components/Cards/SubCategoryCard/SubCategoryCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MetaData from "./../../Layout/MetaData";
import { useEffect } from "react";

const SubCategory = ({ allCategory, loading }) => {
  const { slug } = useParams();
  const subCategories = allCategory.find((item) => item.slug === slug);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !subCategories) {
      navigate("/404", { replace: true });
    }
  }, [subCategories, loading, navigate]);

  return (
    <>
      <div className="categoryView-section">
        {slug === "fashion" ? (
          <MetaData
            title="Online Fashion Store - Shopping for Women, Men, Kids"
            description="Buy clothing dresses Online in Bppshops at best price for men, woman & Kids. 
            Discover the latest fashion trends. T-shirts, Shirts, Saree, Three Pieces and many more"
          />
        ) : slug === "islamic" ? (
          <MetaData
            title="Buy Islamic Products Online at Low Price in Bangladesh"
            description="Largest online Islamic product Shop in Bangladesh. 
            We sell almost all Islamic products . 
            Buy biggest selection of Islamic product . Shop Now!"
          />
        ) : slug === "grocery-only-dhaka-city" ? (
          <MetaData
            title="Online Grocery Shopping at Low Price in Dhaka"
            description="Buy all kind of grocery items online at low price in dhaka.
            order grocery items from your home and get Fastest home delivery."
          />
        ) : slug === "baby-care" ? (
          <MetaData
            title="Buy Baby Care items Online in Bangladesh at Low price"
            description="Bpp Shop offering Large selection of baby care products at a low price. 
            Buy baby care products like diapers, food & feeders online."
          />
        ) : slug === "electronics" ? (
          <MetaData
            title="Buy Electronics Products Online in Bangladesh at Best Price"
            description="Buy Huge range of Branded and Original Electronics Products In BppShop. 
            Trusted online shop in Bangladesh. Fast Home delivery. Save Money, Save Time."
          />
        ) : slug === "cosmetics" ? (
          <MetaData
            title="Buy Authentic Beauty Products and Cosmetic Online in Bangladesh"
            description="Buy original cosmetics and beauty products at low prices. 
            shop original brand high quality cosmetics, beauty, skincare products from BppShop."
          />
        ) : slug === "furniture" ? (
          <MetaData
            title="Buy Furniture Online in Bangladesh at low price"
            description="Bpp Shop Largest Furniture Online shop in Bangladesh. Buy High-Quality unique & stylish furniture. 
            beds, sofa sets,dining tables, chair, dressing tables."
          />
        ) : slug === "shoe" ? (
          <MetaData
            title="Buy Shoes, Boots, Sandels online in Bd at low prices"
            description="Buy wide selection of high quality comfort shoe from Bpp Shop.
            Shop Sandals, Boots, Converse, Loafers, Ladies formal shoes, sports shoes, heels."
          />
        ) : slug === "personal-care" ? (
          <MetaData
            title="Buy Authentic Personal Care Products Online - Bpp Shop"
            description="A Great Collection of Personal Care Products Online. Shop latest personal care products  from top brands at best prices."
          />
        ) : slug === "pharmacy" ? (
          <MetaData
            title="Bpp Shop - Online Pharmacy and Medicine Store in Dhaka"
            description="Bpp Shop is the largest and most reliable online medicine shop in Bangladesh. Buy wide  range of medicines, vitamins, healthcare products, wellness products at the best price."
          />
        ): slug === "eye-care" ? (
          <MetaData
            title="Buy All Kinds Of Brand Eye Care Products Online - Bpp Shop"
            description="Buy From Huge Collection Of Authentic Eye Care Products Online with Best Prices. Cash on delivery all over Bangladesh. Visit at Bpp Shop to get the best deals for eye care products."
          />
        ) : slug === "sports" ? (
          <MetaData
            title="Buy Best Sports Products Online Store - Bpp Shop"
            description="Buy Sports Products Online at a affordable price. We provide best quality sports, accessories, gym equipment, jersey, sports equipment etc in Bangladesh."
          />
        ) : ""}

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
