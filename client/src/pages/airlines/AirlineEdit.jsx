import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import FormAirline from "@/components/fragments/forms/FormAirline";

const AirlineEdit = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Pesawat", path: "/airline" },
    { name: "Edit Pesawat", path: "/airline-edit" },
  ];

  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <FormAirline />
      </MainLayout>
    </>
  );
};

export default AirlineEdit;
