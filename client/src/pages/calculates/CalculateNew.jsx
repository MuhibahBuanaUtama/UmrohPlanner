import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import FormCalculate from "@/components/fragments/forms/FormCalculate";

const CalculateNew = () => {
  const breadCumbLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Hitung", path: "/calculate" },
  ];

  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <FormCalculate />
      </MainLayout>
    </>
  );
};

export default CalculateNew;
