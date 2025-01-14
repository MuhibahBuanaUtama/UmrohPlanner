import axios from "axios";
import { notifyError } from "@/components/ui/feedbacks/Toast";

const ShowSettingService = async (id) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;

    const response = await axios.get(`${apiUrl}/settings/${id}`);

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

export default ShowSettingService;
