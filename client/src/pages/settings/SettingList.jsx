import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import SettingCard from "@/components/fragments/displays/card/SettingCard";
import useData from "@/utils/hooks/useData";
import IndexSettingService from "@/services/settings/IndexSettingService";
import { FiEdit } from "react-icons/fi";

const SettingList = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Pengaturan", path: "/setting" },
  ];

  const navigate = useNavigate();

  const { loading, data } = useData(IndexSettingService);

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
            key === "usdToSar"
              ? "USD to SAR"
              : key === "usdToRupiah"
                ? "USD to IDR"
                : key === "localOffice"
                  ? "Lokal Kantor"
                  : key === "b2b"
                    ? "Fee B2B"
                    : key === "b2c"
                      ? "Fee B2C"
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
            size={32}
            className="cursor-pointer text-green-500"
            onClick={() => handleEdit(rowData)}
          />
        </div>
      ),
    });

    return dynamicColumns;
  };

  const handleEdit = (rowData) => {
    navigate(`/setting-edit/${rowData.id}`);
  };

  const columns = generateColumns(data[0] || {});

  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <SettingCard loading={loading} columns={columns} initialData={data} />
      </MainLayout>
    </>
  );
};

export default SettingList;
