import React, { useEffect } from "react";
import { ThreeDotsIcon } from "./common/Icon";
import { dashboardTeils, recentTranjections } from "./common/Helper";
import { BarChart } from "@mui/x-charts";
import { useProvider } from "./ContextProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const Dashboard = () => {
  const { productsData, setProductsData } = useProvider();

  const getProductsData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const allProducts = [];
    querySnapshot.forEach((doc) => {
      allProducts.push({ id: doc.id, ...doc.data() });
    });
    setProductsData(allProducts);
  };
  useEffect(() => {
    getProductsData();
  }, []);

  console.log(productsData, "desboard");

  return (
    <>
      <div className="px-5 bg-[#F5F7FA] h-full pb-5 z-[1] relative">
        <div className="flex justify-between items-center pt-5">
          {" "}
          <h2 className="font-medium text-[30px] text-black ">Dashboard</h2>
          <button className="px-4 py-3 rounded-[10px] bg-custom-gradient text-white font-normal text-base">
            Export
          </button>
        </div>
        <div className="flex flex-wrap justify-center -mx-3 xl:-mx-5">
          {dashboardTeils.map((items, index) => (
            <div
              key={index}
              className="px-3 xl:px-5 w-full sm:w-1/2 lg:w-1/3  mt-5"
            >
              <div className="flex flex-col items-center backdrop_shadow bg-white p-5 gap-5 rounded-[10px]">
                <div className="flex items-center justify-between w-full">
                  <p className="font-normal text-sm text-black/50">
                    {items.title}
                  </p>{" "}
                  <ThreeDotsIcon />
                </div>{" "}
                <div className="flex items-center justify-between w-full">
                  <p className="font-medium text-black text-2xl xl:text-[30px] ">
                    {items.earning}
                  </p>
                  <p className="font-normal text-[10px] text-black/50 text-end">
                    <span className="block text-[#54B435] font-normal text-sm">
                      {items.margin}
                    </span>
                    Compared to <br /> Last Month
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-5 lg:gap-0">
          <div className="w-full lg:w-1/3 xl:w-1/4 lg:pe-2.5">
            <div className="bg-white p-3 backdrop_shadow rounded-[10px]">
              <div className="flex justify-between items-center">
                <h2 className="font-normal text-base text-black">
                  Active Users
                </h2>
                <span className="cursor-pointer">
                  <ThreeDotsIcon />
                </span>
              </div>
              <div className="flex justify-center bg-[#EBEDF0] mt-2.5 py-2.5">
                <h2 className="font-medium text-black text-2xl xl:text-[30px] leading-[38px]">
                  34
                </h2>
              </div>
              <div className="flex justify-between items-center mt-2.5  px-2.5 py-1.5 border-b border-black/15">
                <h2 className="font-normal text-sm text-black/50">city</h2>
                <p className="font-normal text-sm text-black/50">Users</p>
              </div>
              {recentTranjections.map((items, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-2.5 py-1 border-b border-black/15"
                >
                  <h2 className="font-normal text-sm text-black capitalize">
                    {items.name}
                  </h2>
                  <p className="font-normal text-sm text-black">
                    {items.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-2/3 xl:w-3/4 lg:ps-2.5">
            <div className="bg-white pt-5 px-5 backdrop_shadow rounded-[10px] h-full">
              <div className="flex flex-col w-full">
                <h2 className="font-normal text-base text-black">
                  Comparison Graph Inversters SPIs
                </h2>
                <div className="relative !z-0">
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: [
                          "jan",
                          "feb",
                          "mar",
                          "apr",
                          "may",
                          "jun",
                          "jul",
                          "aug",
                          "sept",
                          "oct",
                          "nov",
                          "dec",
                        ],
                      },
                    ]}
                    // eslint-disable-next-line no-sparse-arrays
                    series={[
                      {
                        data: [43, 49, 70, 93, 49, 35, 79, 91, 50, 26, 50, 85],
                      },
                      ,
                      ,
                    ]}
                    // width={500}
                    height={290}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap backdrop_shadow p-5 bg-white">
          <div className="overflow-x-auto w-full">
            <h2 className="font-normal text-base text-black">Recent Orders</h2>

            <table className="w-full bg-white mt-5">
              <thead>
                <tr className="w-full font-normal text-base text-black border-b border-black/24">
                  <th className="py-4 px-4 text-left  font-normal text-base">
                    No.
                  </th>
                  <th className="py-4 px-4 text-left capitalize font-normal text-base">
                    Status
                  </th>
                  <th className="py-4 px-4 text-left capitalize font-normal text-base">
                    City
                  </th>
                  <th className="py-4 px-4 text-left capitalize font-normal text-base">
                    Customer
                  </th>
                  <th className="py-4 px-4 text-left capitalize font-normal text-base">
                    Date
                  </th>

                  <th className="py-4 px-4 text-left capitalize font-normal text-base">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((products, index) => (
                  <tr className="w-full even:bg-gray-100">
                    <td className="py-3.5 text-black/80 text-base font-normal px-4">
                      #{index}
                    </td>
                    <td className="py-3.5  ">
                      <span className="bg-[#D9ECFF] text-[#185DA5]  text-base font-normal px-4 py-1.5 rounded">
                        {products.isPublished
                          ? "Completed"
                          : products.isHidden
                          ? "Pending"
                          : ""}
                      </span>
                    </td>
                    {products.pinAreas.map((area, i) => (
                      <td className="py-3.5 text-black/80 text-base font-normal px-4">
                        {area.area}
                      </td>
                    ))}
                    <td className="py-3.5 text-black/80 text-base font-normal px-4">
                      {products.productName}
                    </td>
                    <td className="py-3.5 text-black/80 text-base font-normal px-4">
                      {new Date().toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 text-black/80 text-base font-normal px-4">
                      {eval(
                        products.salesManCommission +
                          products.serviceCharge +
                          products.serviceCharge
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
