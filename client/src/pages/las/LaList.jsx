import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import LaCard from "@/components/fragments/displays/card/LaCard";
import DialogDelete from "@/components/fragments/feedbacks/DialogDelete";
import useData from "@/utils/hooks/useData";
import IndexLaService from "@/services/las/IndexLaService";
import DeleteLaService from "@/services/las/DeleteLaService";
import { FiEdit, FiTrash } from "react-icons/fi";
import DialogUtil from "@/utils/configs/feedbacks/DialogUtil";

const LaList = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "LA", path: "/la" },
  ];

  const navigate = useNavigate();

  const { dialogOpen, handleOpenDialog, handleCloseDialog } = DialogUtil();
  const [idLa, setIdLa] = useState(null);

  const {
    loading,
    data,
    total,
    totalPages,
    current,
    handlePageChange,
    handleSizeChange,
    handleDelete,
  } = useData(IndexLaService, DeleteLaService);

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
            key === "countLa"
              ? "Jumlah"
              : key === "laPrice"
                ? "Biaya"
                : key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
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
              setIdLa(rowData);
              handleOpenDialog();
            }}
          />
        </div>
      ),
    });

    return dynamicColumns;
  };

  const handleEdit = (rowData) => {
    navigate(`/la-edit/${rowData.id}`);
  };

  const handleConfirmDelete = async () => {
    if (idLa) {
      await handleDelete(idLa);

      handleCloseDialog();
      setIdLa(null);
    }
  };

  const columns = generateColumns(data[0] || {});

  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <LaCard
          loading={loading}
          columns={columns}
          initialData={data}
          isSorted
          isSearched
          isPaginated
          isTotaled
          current={current}
          total={total}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handleSizeChange={handleSizeChange}
          toButton="/la-new"
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

export default LaList;
