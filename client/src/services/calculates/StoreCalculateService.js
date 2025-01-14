import axios from "axios";
import { notifyError } from "@/components/ui/feedbacks/Toast";

const StoreCalculateService = async (
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
  try {
    const apiUrl = process.env.REACT_APP_API_URL;

    const formData = {
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
    };

    const response = await axios.post(`${apiUrl}/calculates`, formData);

    return response;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;

      notifyError(data.message || "Terjadi kesalahan");
    } else if (error.message) {
      notifyError("Internal server error");
    } else {
      notifyError("Kesalahan saat menyiapkan permintaan");
    }
  }
};

export default StoreCalculateService;
