import axios from "axios";
import { notifyError } from "@/components/ui/feedbacks/Toast";

const UpdateLaService = async (id, countLa, laPrice) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;

    const formData = {
      countLa,
      laPrice,
    };

    const response = await axios.put(`${apiUrl}/las/${id}`, formData);

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

export default UpdateLaService;
