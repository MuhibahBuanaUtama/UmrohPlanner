import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import FormAirline from "@/components/fragments/forms/FormAirline";

const AirlineNew = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Pesawat", path: "/airline" },
    { name: "Tambah Pesawat", path: "/airline-new" },
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

export default AirlineNew;
