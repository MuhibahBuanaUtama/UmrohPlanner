import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitlePageUtil = () => {
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titles = {
      // index
      "/": "Dashboard",
      // dashboards
      "/dashboard/admin": "Dashboard",
      // hotels
      "/hotel": "Hotel",
      "/hotel-new": "Tambah Hotel",
      "/hotel-edit": "Edit Hotel",
      // visas
      "/visa": "Visa",
      "/visa-new": "Tambah Visa",
      "/visa-edit": "Edit Visa",
      // las
      "/la": "LA",
      "/la-new": "Tambah LA",
      "/la-edit": "Edit LA",
      // airlines
      "/airline": "Pesawat",
      "/airline-new": "Tambah Pesawat",
      "/airline-edit": "Edit Pesawat",
      // calculates
      "/calculate": "Hitung",
      // settings
      "/setting": "Pengaturan",
      "/setting-edit": "Edit Pengaturan",
    };

    if (path.startsWith("/hotel-edit")) {
      setTitle("Edit Hotel");
    } else if (path.startsWith("/visa-edit")) {
      setTitle("Edit Visa");
    } else if (path.startsWith("/la-edit")) {
      setTitle("Edit LA");
    } else if (path.startsWith("/airline-edit")) {
      setTitle("Edit Pesawat");
    } else if (path.startsWith("/setting-edit")) {
      setTitle("Edit Pengaturan");
    } else if (titles[path]) {
      setTitle(titles[path]);
    } else {
      setTitle("");
    }
  }, [location]);

  return { title };
};

export default TitlePageUtil;
