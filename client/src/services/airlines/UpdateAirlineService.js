import axios from "axios";
import { notifyError } from "@/components/ui/feedbacks/Toast";

const UpdateAirlineService = async (
  id,
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

    const response = await axios.put(`${apiUrl}/airlines/${id}`, formData);

    return response;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 404) {
        notifyError("Data tidak ditemukan");
      } else {
        notifyError(data.message || "Terjadi kesalahan");
      }
    } else if (error.message) {
      notifyError("Internal server error");
    } else {
      notifyError("Kesalahan saat menyiapkan permintaan");
    }
  }
};

export default UpdateAirlineService;
