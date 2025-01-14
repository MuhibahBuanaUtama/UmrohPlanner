import axios from "axios";
import { notifyError } from "@/components/ui/feedbacks/Toast";

const StoreHotelService = async (
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
  try {
    const apiUrl = process.env.REACT_APP_API_URL;

    const formData = {
      provider,
      from,
      to,
      name,
      city,
      address,
      distance,
      rating,
      roomPrices,
    };

    const response = await axios.post(`${apiUrl}/hotels`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

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

export default StoreHotelService;
