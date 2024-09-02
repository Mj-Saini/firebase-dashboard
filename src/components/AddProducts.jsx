import React, { useEffect, useState } from "react";
import { areaOptions, categoryOption, discountOptions } from "./common/Helper";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "./firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useProvider } from "./ContextProvider";
import SearchDropdown from "./SearhDropdown";

const AddProducts = () => {
  const { id } = useParams();
  const initialFormData = {
    productName: "",
    shortDescription: "",
    description: "",
    isPublished: true,
    isHidden: false,
    freeDelivery: false,
    images: [],
    originalPrice: "",
    discountType: "Amount",
    discount: "",
    sku: "",
    totalStock: "",
    stockAlertCount: "",
    deliveryCharge: "",
    serviceCharge: "",
    salesManCommission: "",
    category: "",
    stockCount: "",
    date: "",
    unit: "",
    quantity: "",
    pinAreas: [{ pinCode: "", area: "" }],
    unitTypes: "Kilogram",
  };
  const navigate = useNavigate();
  const [uploadImg, setUploadImg] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState({
    date: new Date().toISOString().split("T")[0],
    quantity: "",
    unitType: "Kilogram",
    pricePerUnit: "",
  });

  const handlePopupChange = (e) => {
    const { name, value } = e.target;
    setPopupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const calculatedTotalStock = popupData.quantity * popupData.pricePerUnit;

    setFormData((prevData) => ({
      ...prevData,
      date: popupData.date,
      quantity: popupData.quantity,
      unitType: popupData.unitType,
      pricePerUnit: popupData.pricePerUnit,
      totalStock: calculatedTotalStock.toString(), // Ensure it's a string if using <input type="number" />
    }));

    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      isPublished: name === "isPublished" ? checked : false,
      isHidden: name === "isHidden" ? checked : false,
      freeDelivery: value === "yes" ? "yes" : "no",
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadImg(files); // Update image state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let urls = [];

    try {
      // If images were uploaded, handle their upload and get URLs
      if (uploadImg.length > 0) {
        const storage = getStorage();
        urls = await Promise.all(
          uploadImg.map(async (file) => {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            return getDownloadURL(storageRef);
          })
        );
      }

      const productData = {
        ...formData,
        images: urls.length ? urls : formData.images, // If no new images, retain existing ones
      };

      if (id) {
        // Update existing product
        await setDoc(doc(db, "products", id), productData);
      } else {
        // Add a new product
        await addDoc(collection(db, "products"), productData);
      }

      setFormData(initialFormData); // Reset to initial state
      setUploadImg([]); // Clear image state
      navigate("/catalogs/product-list");
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  const getUserDetails = async () => {
    const docRef = doc(db, "products", id);
    const docSpan = await getDoc(docRef);
    setFormData(docSpan.data());
  };
  useEffect(() => {
    if (id) {
      getUserDetails();
    }
  }, []);

  const handleAddPinArea = () => {
    setFormData((prevState) => ({
      ...prevState,
      pinAreas: [...prevState.pinAreas, { pinCode: "", area: "" }],
    }));
  };

  const handlePinAreaChange = (index, field, value) => {
    const updatedPinAreas = formData.pinAreas.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setFormData((prevState) => ({
      ...prevState,
      pinAreas: updatedPinAreas,
    }));
  };

  const handleRemovePinArea = (index) => {
    const updatedPinAreas = formData.pinAreas.filter((_, idx) => idx !== index);
    setFormData((prevState) => ({ ...prevState, pinAreas: updatedPinAreas }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">New Product</h1>
        <div>
          <button
            type="button"
            onClick={() => setFormData(initialFormData)} // Reset to initial state
            className="bg-red-100 text-red-500 px-4 py-2 rounded mr-2"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-8/12 lg:pe-3">
          {/* Basic Information Section */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="font-semibold text-lg mb-4">Basic Information</h2>
            <div>
              <label
                className="font-normal text-sm text-black pb-2 capitalize"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Enter product name"
                className="border border-gray-300 p-2 w-full rounded mb-4 outline-none"
                value={formData.productName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="font-normal text-sm text-black pb-2 capitalize"
                htmlFor="shortDescription"
              >
                short description
              </label>
              <input
                type="text"
                name="shortDescription"
                placeholder="Enter short description"
                className="border border-gray-300 p-2 w-full rounded mb-4 outline-none"
                value={formData.shortDescription}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="font-normal text-sm text-black pb-2 capitalize"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter more details"
                className="border border-gray-300 p-2 w-full rounded mb-4 outline-none resize-none"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          {/* Availability Section */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="font-semibold text-lg mb-2">Availability</h2>
            <p className="text-gray-500 mb-4">
              Choose the areas where the product will be shown
            </p>
            <div className="flex justify-end mb-4">
              {" "}
              <button
                type="button"
                onClick={handleAddPinArea}
                className="text-green-500 font-semibold"
              >
                + Add More
              </button>
            </div>
            {formData.pinAreas.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-end gap-4 mb-4"
              >
                <div>
                  <label htmlFor="pincode">Enter Pin Code</label>
                  <input
                    type="number"
                    name="pinCode"
                    placeholder="Enter Pin Code"
                    className="border border-gray-300 p-2 w-full rounded"
                    value={item.pinCode}
                    onChange={(e) =>
                      handlePinAreaChange(index, "pinCode", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="">Select Area</label>
                  <select
                    name={`area-${index}`}
                    value={item.area}
                    onChange={(e) =>
                      handlePinAreaChange(index, "area", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Area</option>
                    {areaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
          {/* Have More Variants */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="font-semibold text-lg mb-2">Have More Variants?</h2>
            <p className="text-gray-500 mb-4">Pricing</p>

            {formData.pinAreas.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-end gap-4 mb-4"
              >
                <div>
                  <label htmlFor="originalPrice">Original Price</label>
                  <input
                    type="number"
                    name="originalPrice"
                    id="originalPrice"
                    value={item.originalPrice}
                    placeholder="Original Price"
                    className="border border-gray-300 p-2 w-full rounded"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="">Discount Type</label>
                  <select
                    name={`area-${index}`}
                    value={item.discountType}
                    onChange={(e) =>
                      handlePinAreaChange(index, "discountType", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">discountType</option>
                    {discountOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="discount">Discount</label>
                  <input
                    type="text"
                    name="discount"
                    id="discount"
                    placeholder="Discount"
                    className="border border-gray-300 p-2 w-full rounded"
                    value={item.discount}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2> images</h2>

            <div className="flex mt-5 gap-5">
              {" "}
              {uploadImg.length > 0 && (
                <div className="w-[125px] h-[125px] relative">
                  <svg
                    onClick={() => {
                      setUploadImg([]);
                    }}
                    className="absolute top-0  right-0"
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="33" height="33" rx="16.5" fill="#FF0000" />
                    <path
                      d="M11 24C11 24.5304 11.2107 25.0391 11.5858 25.4142C11.9609 25.7893 12.4696 26 13 26H21C21.5304 26 22.0391 25.7893 22.4142 25.4142C22.7893 25.0391 23 24.5304 23 24V12H11V24ZM13 14H21V24H13V14ZM20.5 9L19.5 8H14.5L13.5 9H10V11H24V9H20.5Z"
                      fill="#F4F4F4"
                    />
                  </svg>

                  {uploadImg.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index}`}
                      className="w-full h-full object-cover"
                    />
                  ))}
                </div>
              )}
              <label
                htmlFor="img"
                className="font-normal text-lg text-black border border-[#50B848] bg-[#50B848]/10 w-[125px] h-[125px] flex items-center justify-center"
              >
                + Add Media
                <input
                  type="file"
                  multiple
                  hidden
                  id="img"
                  onChange={handleImageUpload}
                  className="mb-4"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 lg:ps-3">
          <div className="bg-white p-4 rounded shadow">
            <div className=" mb-6 border-b border-black/20 pb-5">
              <h2 className="font-semibold text-lg ">Status</h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Published
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isHidden"
                    checked={formData.isHidden}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Hidden
                </label>
              </div>
            </div>
            <div className="">
              <h2 className="font-semibold text-lg ">Free Delivery</h2>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="yes"
                    checked={formData.freeDelivery === "yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="no"
                    checked={formData.freeDelivery === "no"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              <div className="mt-5">
                <h2>Delivery Charge</h2>
                <input
                  type="number"
                  className="border border-black/50 py-2.5 px-3 mt-3 w-full"
                  placeholder="₹ 0.00"
                  id="deliveryCharge"
                  value={formData.deliveryCharge}
                  name="deliveryCharge"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5">
                <h2>Service charge</h2>
                <input
                  type="number"
                  className="border border-black/50 py-2.5 px-3 mt-3 w-full"
                  placeholder="Amount"
                  name="serviceCharge"
                  id="serviceCharge"
                  value={formData.serviceCharge}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5">
                <h2>Sales man Commission</h2>
                <input
                  type="number"
                  id="salesManCommission"
                  name="salesManCommission"
                  value={formData.salesManCommission}
                  onChange={handleChange}
                  className="border border-black/50 py-2.5 px-3 mt-3 w-full"
                  placeholder="₹ 0.00"
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow mt-5">
            <h2 className="font-semibold text-lg ">Inventory</h2>

            <div className="mt-5">
              <h2>SKU</h2>
              <input
                type="text"
                id="sku"
                name="sku"
                onChange={handleChange}
                value={formData.sku}
                className="border border-black/50 py-2.5 px-3 mt-3 w-full"
                placeholder="6HK3I5"
              />
            </div>
            <div className="mt-5">
              <h2>Total Stock ( Purchase Value : ₹ 8000.00 )</h2>
              <div className="border border-black/50 py-2.5 px-3 mt-3 flex justify-between">
                <input
                  className="w-full"
                  type="number"
                  id="totalStock"
                  name="totalStock"
                  onChange={handleChange}
                  value={formData.totalStock}
                  placeholder="50"
                  readOnly
                />
                <span
                  className="cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12ZM12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13 7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13V7Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </div>
              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                      onClick={() => setIsOpen(false)}
                    >
                      &times;
                    </button>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Date of Purchase
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={popupData.date}
                          onChange={handlePopupChange}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Total Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          value={popupData.quantity}
                          onChange={handlePopupChange}
                          placeholder="0.00"
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Unit Type
                          </label>
                          <select
                            name="unitType"
                            value={popupData.unitType}
                            onChange={handlePopupChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          >
                            <option value="Kilogram">Kilogram</option>
                            <option value="Liter">Liter</option>
                            <option value="Meter">Meter</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Price per unit
                          </label>
                          <input
                            name="pricePerUnit"
                            value={popupData.pricePerUnit}
                            onChange={handlePopupChange}
                            type="text"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                      </div>

                      <button
                        className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded mt-4"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-5">
              <h2>Stock Alert Count</h2>
              <input
                type="number"
                id="stockAlertCount"
                name="stockAlertCount"
                onChange={handleChange}
                value={formData.stockAlertCount}
                className="border border-black/50 py-2.5 px-3 mt-3 w-full"
                placeholder="2"
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow mt-5">
            <label
              className="font-semibold text-lg capitalize"
              htmlFor="category"
            >
              category
            </label>
            <SearchDropdown
              categoryOption={categoryOption}
              formData={formData}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProducts;
