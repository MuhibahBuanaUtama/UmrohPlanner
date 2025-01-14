import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Toast from "@/components/ui/feedbacks/Toast";
import DarkModeUtil from "@/utils/configs/displays/DarkModeUtil";

// errors
const NotFound = lazy(() => import("@/pages/errors/NotFound"));
// dashboards
const DashboardAdmin = lazy(() => import("@/pages/dashboards/DashboardAdmin"));
// hotels
const HotelList = lazy(() => import("@/pages/hotels/HotelList"));
const HotelNew = lazy(() => import("@/pages/hotels/HotelNew"));
const HotelEdit = lazy(() => import("@/pages/hotels/HotelEdit"));
// visas
const VisaList = lazy(() => import("@/pages/visas/VisaList"));
const VisaNew = lazy(() => import("@/pages/visas/VisaNew"));
const VisaEdit = lazy(() => import("@/pages/visas/VisaEdit"));
// las
const LaList = lazy(() => import("@/pages/las/LaList"));
const LaNew = lazy(() => import("@/pages/las/LaNew"));
const LaEdit = lazy(() => import("@/pages/las/LaEdit"));
// airlines
const AirlineList = lazy(() => import("@/pages/airlines/AirlineList"));
const AirlineNew = lazy(() => import("@/pages/airlines/AirlineNew"));
const AirlineEdit = lazy(() => import("@/pages/airlines/AirlineEdit"));
// calculates
const CalculateNew = lazy(() => import("@/pages/calculates/CalculateNew"));
// settings
const SettingList = lazy(() => import("@/pages/settings/SettingList"));
const SettingEdit = lazy(() => import("@/pages/settings/SettingEdit"));

const RouterConfig = () => {
  const location = useLocation();
  DarkModeUtil();

  useEffect(() => {
    const path = location.pathname;
    const appName = process.env.REACT_APP_NAME;

    const titles = {
      // index
      "/": `Dashboard | ${appName}`,
      // dashboards
      "/dashboard/admin": `Dashboard | ${appName}`,
      // hotels
      "/hotel": `Daftar Hotel | ${appName}`,
      "/hotel-new": `Tambah Hotel | ${appName}`,
      // visas
      "/visa": `Daftar Visa | ${appName}`,
      "/visa-new": `Tambah Visa | ${appName}`,
      // las
      "/la": `Daftar LA | ${appName}`,
      "/la-new": `Tambah LA | ${appName}`,
      // airlines
      "/airline": `Daftar Pesawat | ${appName}`,
      "/airline-new": `Tambah Pesawat | ${appName}`,
      // calculates
      "/calculate": `Hitung | ${appName}`,
      // settings
      "/setting": `Daftar Pengaturan | ${appName}`,
    };

    if (path.startsWith("/hotel-edit/")) {
      document.title = `Edit Hotel | ${appName}`;
    } else if (path.startsWith("/visa-edit/")) {
      document.title = `Edit Visa | ${appName}`;
    } else if (path.startsWith("/la-edit/")) {
      document.title = `Edit LA | ${appName}`;
    } else if (path.startsWith("/airline-edit/")) {
      document.title = `Edit Pesawat | ${appName}`;
    } else if (path.startsWith("/setting-edit/")) {
      document.title = `Edit Pengaturan | ${appName}`;
    } else {
      document.title = titles[path] || "404: Halaman ini tidak ditemukan";
    }
  }, [location]);

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-zinc-950">
          <p className="text-gray-900 dark:text-white">Loading ...</p>
        </div>
      }
    >
      <Routes>
        {/* errors */}
        <Route path="*" element={<NotFound />} />
        {/* index */}
        <Route path="/" element={<DashboardAdmin />} />
        {/* dashboards */}
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        {/* hotels */}
        <Route path="/hotel" element={<HotelList />} />
        <Route path="/hotel-new" element={<HotelNew />} />
        <Route path="/hotel-edit/:id" element={<HotelEdit />} />
        {/* visas */}
        <Route path="/visa" element={<VisaList />} />
        <Route path="/visa-new" element={<VisaNew />} />
        <Route path="/visa-edit/:id" element={<VisaEdit />} />
        {/* las */}
        <Route path="/la" element={<LaList />} />
        <Route path="/la-new" element={<LaNew />} />
        <Route path="/la-edit/:id" element={<LaEdit />} />
        {/* airlines */}
        <Route path="/airline" element={<AirlineList />} />
        <Route path="/airline-new" element={<AirlineNew />} />
        <Route path="/airline-edit/:id" element={<AirlineEdit />} />
        {/* calculate */}
        <Route path="/calculate" element={<CalculateNew />} />
        {/* settings */}
        <Route path="/setting" element={<SettingList />} />
        <Route path="/setting-edit/:id" element={<SettingEdit />} />
      </Routes>

      <Toast />
    </Suspense>
  );
};

export default RouterConfig;
