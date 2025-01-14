import { useParams } from "react-router-dom";
import {
  closeNotifyLoading,
  notifyError,
  notifyLoading,
  notifySuccess,
} from "@/components/ui/feedbacks/Toast";
import StoreHotelService from "@/services/hotels/StoreHotelService";
import UpdateHotelService from "@/services/hotels/UpdateHotelService";

const SubmitHotelUtil = () => {
  const { id } = useParams();

  const handleStore = async (
    e,
    provider,
    from,
    to,
    hotelName,
    city,
    address,
    distance,
    rating,
    roomPrices,
  ) => {
    e.preventDefault();
    let loading;
    let name = hotelName;

    try {
      loading = notifyLoading();

      const response = await StoreHotelService(
        provider,
        from,
        to,
        name,
        city,
        address,
        distance,
        rating,
        roomPrices,
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
    provider,
    from,
    to,
    name,
    city,
    address,
    distance,
    rating,
    roomPrices,
  ) => {
    e.preventDefault();
    let loading;

    try {
      loading = notifyLoading();

      const response = await UpdateHotelService(
        id,
        provider,
        from,
        to,
        name,
        city,
        address,
        distance,
        rating,
        roomPrices,
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

export default SubmitHotelUtil;
