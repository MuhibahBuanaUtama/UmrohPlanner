import { useParams } from "react-router-dom";
import {
  closeNotifyLoading,
  notifyError,
  notifyLoading,
  notifySuccess,
} from "@/components/ui/feedbacks/Toast";
import StoreLaService from "@/services/las/StoreLaService";
import UpdateLaService from "@/services/las/UpdateLaService";

const SubmitLaUtil = () => {
  const { id } = useParams();

  const handleStore = async (e, countLa, laPrice) => {
    e.preventDefault();
    let loading;

    try {
      loading = notifyLoading();

      const response = await StoreLaService(countLa, laPrice);

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

  const handleUpdate = async (e, countLa, laPrice) => {
    e.preventDefault();
    let loading;

    try {
      loading = notifyLoading();

      const response = await UpdateLaService(id, countLa, laPrice);

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

  return { handleStore, handleUpdate };
};

export default SubmitLaUtil;
