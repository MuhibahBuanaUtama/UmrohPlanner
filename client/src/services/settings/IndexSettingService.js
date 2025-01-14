import axios from "axios";
import { notifyError } from "@/components/ui/feedbacks/Toast";

const IndexSettingService = async () => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;

    const response = await axios.get(`${apiUrl}/settings`);

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

export default IndexSettingService;
