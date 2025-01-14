import Card from "@/components/ui/displays/Card";

const DashboardCard = ({ className, children }) => {
  return (
    <>
      <div className={`flex ${className}`}>
        <Card className="w-full flex-1 overflow-auto">{children}</Card>
      </div>
    </>
  );
};

export default DashboardCard;
