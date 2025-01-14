import {
  closeNotifyLoading,
  notifyError,
  notifyLoading,
  notifySuccess,
} from "@/components/ui/feedbacks/Toast";
import StoreCalculateService from "@/services/calculates/StoreCalculateService";
import { useCalculateContext } from "@/utils/configs/displays/CalculateContext";

const SubmitCalculateUtil = () => {
  const { setData } = useCalculateContext();

  const handleStore = async (
    e,
    idHotelMakkah,
    nightInMakkah,
    idHotelMadinah,
    nightInMadinah,
    countVisa,
    visaPrice,
    idAirline,
    localOffice,
    focTl,
    b2b,
    b2c,
  ) => {
    e.preventDefault();
    let loading;

    try {
      loading = notifyLoading();

      const response = await StoreCalculateService(
        idHotelMakkah,
        nightInMakkah,
        idHotelMadinah,
        nightInMadinah,
        countVisa,
        visaPrice,
        idAirline,
        localOffice,
        focTl,
        b2b,
        b2c,
      );

      if (response && response.status === 201) {
        closeNotifyLoading(loading);
        setData(response.data.data);

        notifySuccess("Data berhasil dihitung");
      }

      return response;
    } catch (error) {
      closeNotifyLoading(loading);

      notifyError(error.message);
    }
  };

  return { handleStore };
};

export default SubmitCalculateUtil;
