import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import Icon from "@/components/ui/commons/Icon";
import IndexHotelService from "@/services/hotels/IndexHotelService";
import { MdOutlineMosque } from "react-icons/md";

const MadinahCard = () => {
  const [madinahHotelCount, setMadinahHotelCount] = useState(0);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const response = await IndexHotelService();
        const makkahHotels = response.data.data.filter(
          (hotel) => hotel.city === "Madinah",
        );
        setMadinahHotelCount(makkahHotels.length);
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
                <h5>Hotel Madinah</h5>
                <div className="small">Total</div>
                {madinahHotelCount ? (
                  <h1 className="mt-4 text-6xl">{madinahHotelCount}</h1>
                ) : (
                  <div className="small">Loading...</div>
                )}
              </div>
              <div className="flex flex-col">
                <Icon
                  name={MdOutlineMosque}
                  size={62}
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

export default MadinahCard;
