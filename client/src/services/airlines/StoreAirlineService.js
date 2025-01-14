import axios from "axios";
import { notifyError } from "@/components/ui/feedbacks/Toast";

const StoreAirlineService = async (
  name,
  code,
  country,
  flightClasses,
  airlinePrice,
) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;

    const formData = {
      name,
      code,
      country,
      flightClasses,
      airlinePrice,
    };

    const response = await axios.post(`${apiUrl}/airlines`, formData);

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

export default StoreAirlineService;
