import MainLayout from "@/components/layouts/MainLayout";
import Breadcumb from "@/components/ui/navigations/Breadcumb";
import Alert from "@/components/ui/feedbacks/Alert";
import MakkahCard from "@/components/fragments/displays/card/MakkahCard";
import MadinahCard from "@/components/fragments/displays/card/MadinahCard";
import { LuBadgeCheck } from "react-icons/lu";
import AirlineCard from "@/components/fragments/displays/card/AirlineCard";
import VisaChart from "@/components/fragments/graphs/VisaChart";
import LaChart from "@/components/fragments/graphs/LaChart";

const DashboardAdmin = () => {
  const breadCumbLinks = [{ name: "Dashboard", path: "/" }];

  return (
    <>
      <MainLayout>
        <Breadcumb links={breadCumbLinks} />
        <Alert
          type="success"
          closable
          icon={LuBadgeCheck}
          title="Selamat Datang"
          className="mt-4 md:mt-0"
          children="Temukan semua data dan analisis di sini"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <MakkahCard />
          <MadinahCard />
          <AirlineCard />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <VisaChart />
          <LaChart />
        </div>
      </MainLayout>
    </>
  );
};

export default DashboardAdmin;
