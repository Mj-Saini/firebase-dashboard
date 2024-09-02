import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AddIcon, FilterIcon } from "./common/Icon";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useProvider } from "./ContextProvider";
import ActionPopup from "./common/ActionPopup";

const ProductList = () => {
  const location = useLocation();
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [mainChecked, setMainChecked] = useState(false);
  const [openPopupId, setOpenPopupId] = useState(null);
  const { productsData, setProductsData } = useProvider();
  const [productCount, setProductCount] = useState(0);
  const getProductsData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const allProducts = [];
    querySnapshot.forEach((doc) => {
      allProducts.push({ id: doc.id, ...doc.data() });
    });
    setProductsData(allProducts);
    setProductCount(allProducts.length);
  };
  useEffect(() => {
    getProductsData();
  }, []);

  const handlePopupToggle = (id) => {
    setOpenPopupId(openPopupId === id ? null : id);
  };

  const handleRemove = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProductsData((prevData) =>
        prevData.filter((product) => product.id !== id)
      );
      setProductCount((prevCount) => prevCount - 1);
      setOpenPopupId(null);
      console.log(`Product with ID ${id} has been removed.`);
    } catch (error) {
      console.error("Error removing product: ", error);
    }
  };
  const handleMainChange = (event) => {
    const isChecked = event.target.checked;
    setMainChecked(isChecked);
    setSelectedProducts(
      isChecked ? new Set(productsData.map((product) => product.id)) : new Set()
    );
  };

  const handleSubChange = (id) => (e) => {
    const isChecked = e.target.checked;
    const updatedSelectedProducts = new Set(selectedProducts);

    if (isChecked) {
      updatedSelectedProducts.add(id);
    } else {
      updatedSelectedProducts.delete(id);
    }

    setSelectedProducts(updatedSelectedProducts);
    setMainChecked(
      productsData.every((product) => updatedSelectedProducts.has(product.id))
    );
  };

  const handleDeleteSelected = async () => {
    try {
      const promises = Array.from(selectedProducts).map((id) =>
        deleteDoc(doc(db, "products", id))
      );
      await Promise.all(promises);
      setProductsData((prevData) =>
        prevData.filter((product) => !selectedProducts.has(product.id))
      );
      setProductCount((prevCount) => prevCount - selectedProducts.size);
      setSelectedProducts(new Set());
      setMainChecked(false);
    } catch (error) {
      console.error("Error deleting selected products: ", error);
    }
  };

  const showProductList = location.pathname === "/catalogs/product-list";
  const anySelected = selectedProducts.size > 0;
  return (
    <>
      {showProductList && (
        <div>
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-[30px] text-black pt-5">
              Products
            </h2>
            <div className="flex items-center gap-5">
              {" "}
              <Link
                to="new-users"
                className="text-black text-base font-normal py-3 px-2.5 border border-[#B5B5B5] rounded-[10px] flex gap-2 bg-[#B5B5B5] hover:bg-transparent duration-300"
              >
                <FilterIcon />
                filter
              </Link>
              <Link
                to="new-products"
                className="text-black text-base font-normal py-3 px-2.5 border border-[#FFAE00] rounded-[10px] flex gap-2 bg-[#FFAE00] hover:bg-transparent duration-300"
              >
                <AddIcon />
                Add New product
              </Link>
            </div>
          </div>
          {anySelected && (
            <div className="flex items-center gap-5 mt-6">
              <button className="py-2.5 px-4 border border-[#B5B5B5] rounded-[10px] flex gap-2 text-black text-base font-normal bg-[#B5B5B5] hover:bg-transparent duration-300">
                Change To Draft
              </button>
              <button className="py-2.5 px-4 border border-[#54B435] rounded-[10px] flex gap-2 text-black text-base font-normal bg-[#54B435] hover:bg-transparent duration-300">
                Change To live
              </button>
              <button
                onClick={handleDeleteSelected}
                className="py-2.5 px-4 border border-[#DD0000] rounded-[10px] flex gap-2 text-white text-base font-normal bg-[#DD0000] hover:bg-transparent hover:text-black duration-300"
              >
                Delete Area
              </button>
            </div>
          )}
          <div className="flex gap-5">
            <div className="flex flex-col gap-2.5 bg-white shadow-lg p-5 mt-5 rounded-lg w-[290px]">
              <h2 className="font-bold text-2xl text-[#F27121]">
                Total Products
              </h2>
              <p className="font-normal text-base text-black">
                Total ({productCount} items)
              </p>
            </div>
            <div className="flex flex-col gap-2.5 bg-white shadow-lg p-5 mt-5 rounded-lg w-[290px]">
              <h2 className="font-bold text-2xl text-[#BD011A]">
                Low In Stock
              </h2>
              <p className="font-normal text-base text-black">
                Total ({productCount} items)
              </p>
            </div>
          </div>
          <table className="w-full bg-white mt-5">
            <thead>
              <tr className="w-full font-normal text-base text-black border-b border-black/24">
                <th className="py-4 px-4 text-left  font-normal text-base">
                  <input
                    className="flex w-5 h-5"
                    onChange={handleMainChange}
                    checked={mainChecked}
                    type="checkbox"
                    name="subCheckbox"
                    id="subCheckbox"
                  />
                </th>
                <th className="py-4 px-4 text-left  font-normal text-base">
                  Product
                </th>
                <th className="py-4 px-4 text-left capitalize font-normal text-base">
                  Short Discription
                </th>
                <th className="py-4 px-4 text-left capitalize font-normal text-base">
                  Category
                </th>
                <th className="py-4 px-4 text-left capitalize font-normal text-base">
                  Stock
                </th>
                <th className="py-4 px-4 text-left capitalize font-normal text-base">
                  Status
                </th>

                <th className="py-4 px-4 text-left capitalize font-normal text-base">
                  Price
                </th>
                <th className="py-4 px-4 text-left capitalize font-normal text-base">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((products, index) => (
                <tr key={index} className="w-full even:bg-gray-100">
                  <td className="py-4 px-4 text-left  font-normal text-base">
                    {" "}
                    <input
                      className="flex w-5 h-5"
                      onChange={handleSubChange(products.id)}
                      checked={selectedProducts.has(products.id)}
                      type="checkbox"
                      name="subCheckbox"
                      id={`subCheckbox-${products.id}`}
                    />
                  </td>
                  <td className="py-3.5 text-black/80 text-base font-normal px-4 flex gap-2">
                    <span>
                      <img
                        className="w-10 h-10"
                        src={products.images && products.images}
                        alt="images"
                      />
                    </span>
                    <div>
                      {" "}
                      <h2 className="font-normal text-black text-base">
                        {products.productName}
                      </h2>
                      <h2 className="font-normal text-black/50 text-xsm">
                        {products.id} |<span>{products.sku}</span>
                      </h2>
                    </div>
                  </td>
                  <td className="py-3.5 text-black/80 text-base font-normal px-4">
                    <h2 className="font-normal text-sm text-black">
                      {products.shortDescription}
                    </h2>
                  </td>
                  <td className="py-3.5 text-black/80 text-base font-normal px-4">
                    <h2 className="font-normal text-sm text-black">
                      {" "}
                      {products.category}
                    </h2>
                  </td>
                  <td className="py-3.5 text-black/80 text-base font-normal px-4">
                    {products.totalStock}
                  </td>
                  <td className="py-3.5 text-black/80 text-base font-normal px-4">
                    {products.isPublished
                      ? "Published"
                      : products.isHidden
                      ? "Draft"
                      : ""}
                  </td>
                  <td className="py-3.5 text-black/80 text-base font-normal px-4">
                    {products.category}
                  </td>
                  <td className="py-3.5 text-black/80 text-base font-normal px-4">
                    {products.category}
                  </td>
                  <td className="py-3.5 text-black/80 text-base font-normal px-4">
                    <svg
                      className="cursor-pointer"
                      onClick={() => handlePopupToggle(products.id)}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                        fill="black"
                      />
                    </svg>

                    {openPopupId === products.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                        <ActionPopup
                          index={products.id}
                          handleRemove={handleRemove}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default ProductList;
