import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import FormSetting from "@/components/fragments/forms/FormSetting";

const SettingEdit = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Edit Pengaturan", path: "/setting-edit" },
  ];
  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <FormSetting />
      </MainLayout>
    </>
  );
};

export default SettingEdit;
