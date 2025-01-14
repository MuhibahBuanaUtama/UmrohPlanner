import { useState, useEffect } from "react";
import DashboardCard from "./DashboardCard";
import Icon from "@/components/ui/commons/Icon";
import { LiaKaabaSolid } from "react-icons/lia";
import IndexHotelService from "@/services/hotels/IndexHotelService";

const MakkahCard = () => {
  const [makkahHotelCount, setMakkahHotelCount] = useState(0);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const response = await IndexHotelService();
        const makkahHotels = response.data.data.filter(
          (hotel) => hotel.city === "Makkah",
        );
        setMakkahHotelCount(makkahHotels.length);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      }
    };

    fetchDataWrapper();
  });

  return (
    <>
      <DashboardCard
        className="col-span-1"
        children={
          <>
            <div className="flex items-end justify-between">
              <div className="block">
                <h5>Hotel Makkah</h5>
                <div className="small">Total</div>
                {makkahHotelCount ? (
                  <h1 className="mt-4 text-6xl">{makkahHotelCount}</h1>
                ) : (
                  <div className="small">Loading...</div>
                )}
              </div>
              <div className="flex flex-col">
                <Icon
                  name={LiaKaabaSolid}
                  size={76}
                  className="text-green-800"
                />
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default MakkahCard;
