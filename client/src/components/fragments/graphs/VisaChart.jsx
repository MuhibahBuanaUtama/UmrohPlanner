import { useEffect, useState } from "react";
import DashboardCard from "../displays/card/DashboardCard";
import ChartComponent from "@/components/ui/graphs/Chart";
import IndexVisaService from "@/services/visas/IndexVisaService";

const VisaChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const response = await IndexVisaService();
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
      countVisa: `${item.countVisa} Visa`,
      visaPrice: item.visaPrice,
    }));

    return transformedObject;
  };

  const result = transformData();

  const columns = [
    {
      key: "countVisa",
      label: "Jumlah",
    },
    {
      key: "visaPrice",
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
              chartLabel="Visa ($)"
              columns={columns}
              initialData={result}
            />
          </>
        }
      />
    </>
  );
};

export default VisaChart;
