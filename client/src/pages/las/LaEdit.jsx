import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import FormLa from "@/components/fragments/forms/FormLa";

const LaEdit = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "LA", path: "/la" },
    { name: "Edit LA", path: "/la-new" },
  ];

  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <FormLa />
      </MainLayout>
    </>
  );
};

export default LaEdit;
