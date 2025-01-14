import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import VisaCard from "@/components/fragments/displays/card/VisaCard";
import DialogDelete from "@/components/fragments/feedbacks/DialogDelete";
import useData from "@/utils/hooks/useData";
import IndexVisaService from "@/services/visas/IndexVisaService";
import DeleteVisaService from "@/services/visas/DeleteVisaService";
import { FiEdit, FiTrash } from "react-icons/fi";
import DialogUtil from "@/utils/configs/feedbacks/DialogUtil";

const VisaList = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Visa", path: "/visa" },
  ];

  const navigate = useNavigate();

  const { dialogOpen, handleOpenDialog, handleCloseDialog } = DialogUtil();
  const [idVisa, setIdVisa] = useState(null);

  const {
    loading,
    data,
    total,
    totalPages,
    current,
    handlePageChange,
    handleSizeChange,
    handleDelete,
  } = useData(IndexVisaService, DeleteVisaService);

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
            key === "countVisa"
              ? "Jumlah"
              : key === "visaPrice"
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
              setIdVisa(rowData);
              handleOpenDialog();
            }}
          />
        </div>
      ),
    });

    return dynamicColumns;
  };

  const handleEdit = (rowData) => {
    navigate(`/visa-edit/${rowData.id}`);
  };

  const handleConfirmDelete = async () => {
    if (idVisa) {
      await handleDelete(idVisa);

      handleCloseDialog();
      setIdVisa(null);
    }
  };

  const columns = generateColumns(data[0] || {});

  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <VisaCard
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
          toButton="/visa-new"
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

export default VisaList;
