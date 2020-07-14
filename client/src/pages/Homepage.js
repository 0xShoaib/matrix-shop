import React, { useState, useEffect } from "react";

import Card from "../components/Card";
import CardLoader from "../components/CardLoader";
import Footer from "../components/Footer";

export default function Homepage() {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetch("/allproducts")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.products);
        setCardData(result.products);
        setLoadingStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createCardGrid = () => {
    let CardComponent = cardData.map((item) => {
      return (
        <Card
          id={item._id}
          key={item._id}
          thumbnail={item.thumbnail}
          title={item.title}
          price={item.price}
          inStock={item.inStock}
        />
      );
    });
    return CardComponent;
  };

  return (
    <div>
      <div className="CardWrapper">
        {loadingStatus ? (
          <>
            <CardLoader /> <CardLoader /> <CardLoader />
          </>
        ) : (
          createCardGrid()
        )}
      </div>
      <Footer />
    </div>
  );
}
