import { useParams } from "react-router-dom";
import {
  closeNotifyLoading,
  notifyError,
  notifyLoading,
  notifySuccess,
} from "@/components/ui/feedbacks/Toast";
import UpdateSettingService from "@/services/settings/UpdateSettingService";

const SubmitSettingUtil = () => {
  const { id } = useParams();

  const handleUpdate = async (
    e,
    usdToSar,
    usdToRupiah,
    localOffice,
    b2b,
    b2c,
  ) => {
    e.preventDefault();
    let loading;

    try {
      loading = notifyLoading();

      const response = await UpdateSettingService(
        id,
        usdToSar,
        usdToRupiah,
        localOffice,
        b2b,
        b2c,
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

  return { handleUpdate };
};

export default SubmitSettingUtil;
