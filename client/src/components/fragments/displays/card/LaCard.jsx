import DashboardCard from "./DashboardCard";
import Table from "@/components/ui/displays/Table";
import Alert from "@/components/ui/feedbacks/Alert";
import Spinner from "@/components/ui/feedbacks/Spinner";

const LaCard = ({
  loading,
  columns,
  initialData,
  isSorted,
  isSearched,
  isPaginated,
  isTotaled,
  isPerPage,
  current,
  total,
  totalPages,
  handlePageChange,
  handleSizeChange,
  toButton,
}) => {
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
            <Table
              columns={columns}
              initialData={initialData}
              isSorted={isSorted}
              isSearched={isSearched}
              isPaginated={isPaginated}
              isTotaled={isTotaled}
              isPerPage={isPerPage}
              current={current}
              total={total}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              handleSizeChange={handleSizeChange}
              toButton={toButton}
            />
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

export default LaCard;
