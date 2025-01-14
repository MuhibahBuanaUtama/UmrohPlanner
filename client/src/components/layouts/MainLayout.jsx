import SidebarLayout from "./SidebarLayout";
import NavbarLayout from "./NavbarLayout";
import DrawerUtil from "@/utils/configs/feedbacks/DrawerUtil";

const MainLayout = ({ children }) => {
  const { openDrawer, drawerRef, handleOpenDrawer } = DrawerUtil();

  return (
    <>
      <div className="flex">
        <SidebarLayout
          openDrawer={openDrawer}
          drawerRef={drawerRef}
          handleOpenDrawer={handleOpenDrawer}
          className={
            openDrawer
              ? "absolute start-0 top-0 md:relative"
              : "hidden md:block md:w-20"
          }
        />

        <div className="min-h-screen w-full overflow-hidden p-4 dark:bg-zinc-950 md:py-4 md:pe-8 md:ps-4">
          <NavbarLayout
            openDrawer={openDrawer}
            handleOpenDrawer={handleOpenDrawer}
          />

          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
