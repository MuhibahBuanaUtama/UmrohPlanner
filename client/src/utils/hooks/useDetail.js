import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { notifyError } from "@/components/ui/feedbacks/Toast";

const useDetail = (fetchData, _id) => {
  const [data, setData] = useState([]);
  const id = useParams();
  const id_data = id.id;

  useEffect(() => {
    if (id_data) {
      const fetchDataWrapper = async () => {
        try {
          const response = await fetchData(id_data ? id_data : _id);

          setData(response.data.data);
        } catch (error) {
          notifyError("Terjadi kesalahan saat mengambil data:", error);
        }
      };

      fetchDataWrapper();
    }
  }, []);

  return { id_data, data };
};

export default useDetail;
