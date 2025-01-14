import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import FormVisa from "@/components/fragments/forms/FormVisa";

const VisaNew = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Visa", path: "/visa" },
    { name: "Tambah Visa", path: "/visa-new" },
  ];

  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <FormVisa />
      </MainLayout>
    </>
  );
};

export default VisaNew;
