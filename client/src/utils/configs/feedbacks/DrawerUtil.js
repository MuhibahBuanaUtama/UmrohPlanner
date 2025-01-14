import { useState, useRef, useEffect } from "react";

const DrawerUtil = () => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const drawerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobile &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target)
      ) {
        setOpenDrawer(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setOpenDrawer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMobile]);

  useEffect(() => {
    setOpenDrawer(!isMobile);
  }, [isMobile]);

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return { openDrawer, drawerRef, handleOpenDrawer };
};

export default DrawerUtil;
