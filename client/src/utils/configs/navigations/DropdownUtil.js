import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ActiveUtil = () => {
  const location = useLocation();
  const path = location.pathname;

  const actives = {
    // index
    "/": "dashboard-admin",
    // dashboards
    "/dashboard/admin": "dashboard-admin",
    // hotels
    "/hotel": "hotel",
    "/hotel-new": "hotel-new",
    "/hotel-edit": "hotel-edit",
    // visas
    "/visa": "visa",
    "/visa-new": "visa-new",
    "/visa-edit": "visa-edit",
    // las
    "/la": "la",
    "/la-new": "la-new",
    "/la-edit": "la-edit",
    // airlines
    "/airline": "airline",
    "/airline-new": "airline-new",
    "/airline-edit": "airline-edit",

    // calculates
    "/calculate": "calculate",
    // settings
    "/setting": "setting",
    "/setting-edit": "setting-edit",
  };

  let active;

  if (path.startsWith("/hotel-edit/")) {
    active = "hotel-edit";
  } else if (path.startsWith("/visa-edit/")) {
    active = "visa-edit";
  } else if (path.startsWith("/la-edit/")) {
    active = "la-edit";
  } else if (path.startsWith("/airline-edit/")) {
    active = actives[path];
  } else if (path.startsWith("/setting-edit/")) {
    active = actives[path];
  } else {
    active = actives[path];
  }

  return { active };
};

const DropdownUtil = () => {
  const { active } = ActiveUtil();

  const [openDropdown, setOpenDropdown] = useState({
    hotel: (active === "hotel") | (active === "hotel-new") ? true : false,
    visa: (active === "visa") | (active === "visa-new") ? true : false,
    la: (active === "la") | (active === "la-new") ? true : false,
    airline: (active === "airline") | (active === "airline-new") ? true : false,
    setting: active === "setting" ? true : false,
    profile: active === "profile" ? true : false,
    more: false,
  });

  const dropdownRef = useRef({
    hotel: null,
    visa: null,
    la: null,
    airline: null,
    setting: null,
    profile: null,
    more: null,
  });

  const handleOpenDropdown = (dropdownName) => {
    setOpenDropdown((prevOpenDropdown) => ({
      ...prevOpenDropdown,
      [dropdownName]: !prevOpenDropdown[dropdownName],
    }));
  };

  const handleClickOutside = (e, dropdownName) => {
    Object.values(dropdownRef.current).forEach((ref) => {
      if (ref && !ref.contains(e.target)) {
        setOpenDropdown((prevOpenDropdown) => ({
          ...prevOpenDropdown,
          [dropdownName]: false,
        }));
      }
    });
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      handleClickOutside(e, "hotel");
      handleClickOutside(e, "visa");
      handleClickOutside(e, "la");
      handleClickOutside(e, "airline");
      handleClickOutside(e, "setting");
      handleClickOutside(e, "profile");
      handleClickOutside(e, "more");
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return { openDropdown, dropdownRef, handleOpenDropdown, active };
};

export default DropdownUtil;
