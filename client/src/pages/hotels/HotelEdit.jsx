import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import FormHotel from "@/components/fragments/forms/FormHotel";

const HotelEdit = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Hotel", path: "/hotel" },
    { name: "Edit Hotel", path: "/hotel-edit" },
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

export default HotelEdit;
