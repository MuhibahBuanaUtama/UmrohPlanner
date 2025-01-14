import { useState, useEffect } from "react";
import DashboardCard from "./DashboardCard";
import Icon from "@/components/ui/commons/Icon";
import { LuPlane } from "react-icons/lu";
import IndexAirlineService from "@/services/airlines/IndexAirlineService";

const AirlineCard = () => {
  const [airlineCount, setAirlineCount] = useState(0);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const response = await IndexAirlineService();
        setAirlineCount(response.data.data.length);
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
                <h5>Pesawat</h5>
                <div className="small">Total</div>
                {airlineCount ? (
                  <h1 className="mt-4 text-6xl">{airlineCount}</h1>
                ) : (
                  <span className="small">Loading...</span>
                )}
              </div>
              <div className="flex flex-col">
                <Icon name={LuPlane} size={62} className="text-green-800" />
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default AirlineCard;
