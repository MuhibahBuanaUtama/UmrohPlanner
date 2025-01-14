import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import FormVisa from "@/components/fragments/forms/FormVisa";

const VisaEdit = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Visa", path: "/visa" },
    { name: "Edit Visa", path: "/visa-edit" },
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

export default VisaEdit;
