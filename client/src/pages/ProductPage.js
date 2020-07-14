import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import Product from "../components/Product";
import ProductLoader from "../components/ProductLoader";
import Footer from "../components/Footer";

export default function ProductPage() {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [productData, setProductData] = useState([]);
  let params = useParams();

  useEffect(() => {
    let id = params.id;
    fetch(`/product/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProductData(result.product);
        setLoadingStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return (
    <div>
      {loadingStatus ? (
        <ProductLoader />
      ) : (
        <Product
          id={productData._id}
          title={productData.title}
          thumbnail={productData.thumbnail}
          price={productData.price}
          description={productData.description}
          inStock={productData.inStock}
        />
      )}
      <Footer />
    </div>
  );
}
