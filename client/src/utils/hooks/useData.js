import { useState, useEffect } from "react";
import { notifyError, notifySuccess } from "@/components/ui/feedbacks/Toast";

const useData = (fetchData, deleteData) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        setLoading(true);

        const response = await fetchData(size, current);

        if (response && response.data) {
          setData(response.data.data);
          setTotal(response.data.page.total);
          setTotalPages(response.data.page.totalPages);
        }

        setLoading(false);
      } catch (error) {
        notifyError("Terjadi kesalahan saat mengambil data:", error);

        setDataChanged(false);
        setLoading(false);
      }
    };

    fetchDataWrapper();
  }, [current, size, dataChanged, fetchData]);

  const handlePageChange = (page) => {
    setCurrent(page);
  };

  const handleSizeChange = (size) => {
    setSize(size);
    setCurrent(1);
  };

  const handleDelete = async (rowData) => {
    const id = rowData.id;

    try {
      await deleteData(id);

      setData(data.filter((data) => data.id !== id));
      setDataChanged(true);

      notifySuccess("Data berhasil dihapus");
    } catch (error) {
      notifyError("Terjadi kesalahan saat menghapus data:", error);
    }
  };

  return {
    loading,
    data,
    total,
    totalPages,
    current,
    handlePageChange,
    handleSizeChange,
    handleDelete,
  };
};

export default useData;
