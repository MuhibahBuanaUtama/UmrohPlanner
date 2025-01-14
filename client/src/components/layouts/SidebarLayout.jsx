import Drawer from "../ui/feedbacks/Drawer";
import SidebarBrand from "../fragments/navigations/sidebar/SidebarBrand";
import SidebarNav from "../fragments/navigations/sidebar/SidebarNav";

const SidebarLayout = ({
  drawerRef,
  openDrawer,
  handleOpenDrawer,
  className,
}) => {
  return (
    <>
      <Drawer drawerRef={drawerRef} className={className}>
        <div
          className={`h-full rounded-xl bg-zinc-950 dark:bg-zinc-900 ${openDrawer ? "p-4" : "p-2"}`}
        >
          <SidebarBrand
            openDrawer={openDrawer}
            handleOpenDrawer={handleOpenDrawer}
          />
          <SidebarNav openDrawer={openDrawer} />
        </div>
      </Drawer>
    </>
  );
};

export default SidebarLayout;
