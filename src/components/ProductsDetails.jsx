import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { useParams } from "react-router-dom";

const ProductsDetails = () => {
  const { id } = useParams();

  const [viewDetails, setViewDetails] = useState();
  const getDetails = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    setViewDetails(docSnap.data());
  };
  useEffect(() => {
    getDetails();
  }, []);

  console.log(viewDetails);

  return (
    <>
      {viewDetails && (
        <div>
          <h2>{viewDetails.productName}</h2> <h2>{viewDetails.description}</h2>{" "}
          <h2>{viewDetails.category}</h2> <h2>{viewDetails.discountType}</h2>{" "}
          <h2>{viewDetails.productName}</h2> <h2>{viewDetails.productName}</h2>{" "}
          <img
            className="w-[300px]"
            src={viewDetails.images && viewDetails.images}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default ProductsDetails;
