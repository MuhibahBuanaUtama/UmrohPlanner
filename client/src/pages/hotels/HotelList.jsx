import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import HotelsCard from "@/components/fragments/displays/card/HotelsCard";
import DialogDelete from "@/components/fragments/feedbacks/DialogDelete";
import useData from "@/utils/hooks/useData";
import IndexHotelService from "@/services/hotels/IndexHotelService";
import DeleteHotelService from "@/services/hotels/DeleteHotelService";
import { FiEdit, FiTrash } from "react-icons/fi";
import DialogUtil from "@/utils/configs/feedbacks/DialogUtil";

const HotelList = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Hotel", path: "/hotel" },
  ];

  const navigate = useNavigate();

  const { dialogOpen, handleOpenDialog, handleCloseDialog } = DialogUtil();
  const [idHotel, setIdHotel] = useState(null);

  const {
    loading,
    data,
    total,
    totalPages,
    current,
    handlePageChange,
    handleSizeChange,
    handleDelete,
  } = useData(IndexHotelService, DeleteHotelService);

  const generateColumns = (sampleItem) => {
    const dynamicColumns = [];

    Object.keys(sampleItem)
      .filter(
        (key) => key !== "id" && key !== "createdAt" && key !== "updatedAt",
      )
      .forEach((key) => {
        dynamicColumns.push({
          key: key,
          label:
            key === "provider"
              ? "Provider"
              : key === "name"
                ? "Nama"
                : key === "from"
                  ? "Dari"
                  : key === "to"
                    ? "Hingga"
                    : key === "periods"
                      ? "Periode"
                      : key === "city"
                        ? "Kota"
                        : key === "distance"
                          ? "Jarak"
                          : key === "address"
                            ? "Alamat"
                            : key === "rating"
                              ? "Bintang"
                              : key === "roomPrices"
                                ? "Harga"
                                : key.charAt(0).toUpperCase() +
                                  key.slice(1).replace(/_/g, " "),
        });
      });

    dynamicColumns.push({
      key: "actions",
      label: "Aksi",
      render: (rowData) => (
        <div className="flex gap-2" style={{ alignItems: "center" }}>
          <FiEdit
            size={16}
            className="cursor-pointer text-green-500"
            onClick={() => handleEdit(rowData)}
          />
          <FiTrash
            size={32}
            className="cursor-pointer text-red-500"
            onClick={() => {
              setIdHotel(rowData);
              handleOpenDialog();
            }}
          />
        </div>
      ),
    });

    return dynamicColumns;
  };

  const handleEdit = (rowData) => {
    navigate(`/hotel-edit/${rowData.id}`);
  };

  const handleConfirmDelete = async () => {
    if (idHotel) {
      await handleDelete(idHotel);

      handleCloseDialog();
      setIdHotel(null);
    }
  };

  const columns = generateColumns(data[0] || {});

  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <HotelsCard
          loading={loading}
          columns={columns}
          initialData={data}
          isSorted
          isSearched
          isPaginated
          isTotaled
          isPerPage
          current={current}
          total={total}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handleSizeChange={handleSizeChange}
          toButton="/hotel-new"
        />
      </MainLayout>

      <DialogDelete
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default HotelList;
