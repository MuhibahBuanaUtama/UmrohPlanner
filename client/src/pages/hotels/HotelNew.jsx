import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import FormHotel from "@/components/fragments/forms/FormHotel";

const HotelNew = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Hotel", path: "/hotel" },
    { name: "Tambah Hotel", path: "/hotel-new" },
  ];

  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <FormHotel />
      </MainLayout>
    </>
  );
};

export default HotelNew;
