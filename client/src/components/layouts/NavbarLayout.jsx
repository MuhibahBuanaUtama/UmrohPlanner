import NavbarNav from "../fragments/navigations/navbar/NavbarNav";

const NavbarLayout = ({ openDrawer, handleOpenDrawer }) => {
  return (
    <>
      <NavbarNav openDrawer={openDrawer} handleOpenDrawer={handleOpenDrawer} />
    </>
  );
};

export default NavbarLayout;
