import { notifyWarning } from "@/components/ui/feedbacks/Toast";
import FormatNameUtil from "@/utils/helpers/FormatNameUtil";

export const OnInvalidUtil = (e) => {
  e.preventDefault();

  const { name } = e.target;
  const value = e.target.value;
  const minLength = e.target.minLength;
  const maxLength = e.target.maxLength;

  if (
    (name === "hotelName") |
    (name === "description") |
    (name === "location") |
    (name === "address") |
    (name === "airlineName") |
    (name === "airlinePrice") |
    (name === "nightInMakkah") |
    (name === "nightInMadinah") |
    (name === "usdToSar") |
    (name === "usdToRupiah") |
    (name === "localOffice") |
    (name === "b2b") |
    (name === "b2c")
  ) {
    if (!value) {
      notifyWarning(
        `Silahkan isi kolom ${FormatNameUtil(name)} terlebih dahulu`,
      );
    }
  } else if (name === "code") {
    if (!value) {
      notifyWarning(
        `Silahkan isi kolom ${FormatNameUtil(name)} terlebih dahulu`,
      );
    } else if (value && value.length < minLength) {
      notifyWarning(`Kolom harus terdiri dari minimal ${minLength} karakter`);
    } else if (value && value.length > maxLength) {
      notifyWarning(`Kolom harus terdiri dari maksimal ${maxLength} karakter`);
    }
  }
};
