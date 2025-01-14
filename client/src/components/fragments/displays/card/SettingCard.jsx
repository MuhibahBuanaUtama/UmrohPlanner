import DashboardCard from "./DashboardCard";
import Table from "@/components/ui/displays/Table";
import Alert from "@/components/ui/feedbacks/Alert";
import Spinner from "@/components/ui/feedbacks/Spinner";

const SettingCard = ({ loading, columns, initialData }) => {
  return (
    <>
      <DashboardCard
        className="col-span-1 mt-4 md:col-span-2 md:mt-0"
        children={
          loading ? (
            <Alert type="basic" className="mt-6">
              <span className="flex items-center gap-2">
                <Spinner />
                Loading...
              </span>
            </Alert>
          ) : initialData.length > 0 ? (
            <Table columns={columns} initialData={initialData} />
          ) : (
            <Alert type="info" className="mt-6">
              Tidak ada data
            </Alert>
          )
        }
      />
    </>
  );
};

export default SettingCard;
