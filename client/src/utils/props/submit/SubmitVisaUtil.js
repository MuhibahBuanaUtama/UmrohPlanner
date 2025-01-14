import { useParams } from "react-router-dom";
import {
  closeNotifyLoading,
  notifyError,
  notifyLoading,
  notifySuccess,
} from "@/components/ui/feedbacks/Toast";
import StoreVisaService from "@/services/visas/StoreVisaService";
import UpdateVisaService from "@/services/visas/UpdateVisaService";

const SubmitVisaUtil = () => {
  const { id } = useParams();

  const handleStore = async (e, countVisa, priceVisa) => {
    e.preventDefault();
    let loading;

    try {
      loading = notifyLoading();

      const response = await StoreVisaService(countVisa, priceVisa);

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

  const handleUpdate = async (e, countVisa, visaPrice) => {
    e.preventDefault();
    let loading;

    try {
      loading = notifyLoading();

      const response = await UpdateVisaService(id, countVisa, visaPrice);

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

export default SubmitVisaUtil;
