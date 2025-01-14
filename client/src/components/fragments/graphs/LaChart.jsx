import { useEffect, useState } from "react";
import DashboardCard from "../displays/card/DashboardCard";
import ChartComponent from "@/components/ui/graphs/Chart";
import IndexLaService from "@/services/las/IndexLaService";

const LaChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const response = await IndexLaService();
        setData(response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      }
    };

    fetchDataWrapper();
  }, []);

  const transformData = () => {
    if (!Array.isArray(data)) return [];

    const transformedObject = data.map((item) => ({
      countLa: `${item.countLa} LA`,
      laPrice: item.laPrice,
    }));

    return transformedObject;
  };

  const result = transformData();

  const columns = [
    {
      key: "countLa",
      label: "Jumlah",
    },
    {
      key: "laPrice",
      label: "Biaya",
    },
  ];

  return (
    <>
      <DashboardCard
        className="col-span-1 overflow-auto"
        children={
          <>
            <ChartComponent
              type="bar"
              chartLabel="LA ($)"
              columns={columns}
              initialData={result}
            />
          </>
        }
      />
    </>
  );
};

export default LaChart;
