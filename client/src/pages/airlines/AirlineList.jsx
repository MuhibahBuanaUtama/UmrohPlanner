import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import HotelsCard from "@/components/fragments/displays/card/HotelsCard";
import DialogDelete from "@/components/fragments/feedbacks/DialogDelete";
import useData from "@/utils/hooks/useData";
import IndexAirlineService from "@/services/airlines/IndexAirlineService";
import DeleteAirlineService from "@/services/airlines/DeleteAirlineService";
import DialogUtil from "@/utils/configs/feedbacks/DialogUtil";
import { FiEdit, FiTrash } from "react-icons/fi";

const AirlineList = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Pesawat", path: "/airline" },
  ];

  const navigate = useNavigate();

  const { dialogOpen, handleOpenDialog, handleCloseDialog } = DialogUtil();
  const [idAirline, setIdAirline] = useState(null);

  const {
    loading,
    data,
    total,
    totalPages,
    current,
    handlePageChange,
    handleSizeChange,
    handleDelete,
  } = useData(IndexAirlineService, DeleteAirlineService);

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
            key === "name"
              ? "Nama"
              : key === "code"
                ? "Kode"
                : key === "country"
                  ? "Negara"
                  : key === "flightClasses"
                    ? "Kelas"
                    : key === "airlinePrice"
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
              setIdAirline(rowData);
              handleOpenDialog();
            }}
          />
        </div>
      ),
    });

    return dynamicColumns;
  };

  const handleEdit = (rowData) => {
    navigate(`/airline-edit/${rowData.id}`);
  };

  const handleConfirmDelete = async () => {
    if (idAirline) {
      await handleDelete(idAirline);

      handleCloseDialog();
      setIdAirline(null);
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
          isPerPage
          isTotaled
          current={current}
          total={total}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handleSizeChange={handleSizeChange}
          toButton="/airline-new"
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

export default AirlineList;
