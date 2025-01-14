import { useParams } from "react-router-dom";
import {
  closeNotifyLoading,
  notifyError,
  notifyLoading,
  notifySuccess,
} from "@/components/ui/feedbacks/Toast";
import StoreAirlineService from "@/services/airlines/StoreAirlineService";
import UpdateAirlineService from "@/services/airlines/UpdateAirlineService";

const SubmitAirlineUtil = () => {
  const { id } = useParams();

  const handleStore = async (
    e,
    name,
    code,
    country,
    flightClasses,
    airlinePrice,
  ) => {
    e.preventDefault();
    let loading;

    try {
      loading = notifyLoading();

      const response = await StoreAirlineService(
        name,
        code,
        country,
        flightClasses,
        airlinePrice,
      );

      if (response && response.status === 201) {
        closeNotifyLoading(loading);

        notifySuccess("Data berhasil ditambahkan", () => {
          window.location.reload();
        });
      }
    } catch (error) {
      closeNotifyLoading(loading);

      notifyError(error.message);
    }
  };

  const handleUpdate = async (
    e,
    name,
    code,
    country,
    flightClasses,
    airlinePrice,
  ) => {
    e.preventDefault();
    let loading;

    try {
      loading = notifyLoading();

      const response = await UpdateAirlineService(
        id,
        name,
        code,
        country,
        flightClasses,
        airlinePrice,
      );

      if (response && response.status === 201) {
        closeNotifyLoading(loading);

        notifySuccess("Data berhasil diupdate", () => {
          window.location.reload();
        });
      }
    } catch (error) {
      closeNotifyLoading(loading);

      notifyError(error.message);
    }
  };

  return {
    handleStore,
    handleUpdate,
  };
};

export default SubmitAirlineUtil;
