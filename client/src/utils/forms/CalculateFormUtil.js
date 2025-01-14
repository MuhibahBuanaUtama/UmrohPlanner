import { OnInvalidUtil } from "../props/invalid/OnInvalidUtil";
import useSelect from "../hooks/useSelect";
import OnChangeUtil from "../props/change/OnChangeUtil";
import SubmitCalculateUtil from "../props/submit/SubmitCalculateUtil";

const CalculateFormUtil = () => {
  const {
    idHotelMakkah,
    idHotelMadinah,
    countVisa,
    visaPriceSelect,
    countLa,
    laPriceSelect,
    idAirline,
    airlinePrice,
    countFocUstad,
    countFocTl,

    handleChangeHotelMakkah,
    handleChangeHotelMadinah,
    handleChangeCountSplit,
    handleChangeAirline,
  } = useSelect();
  const {
    nightInMakkah,
    nightInMadinah,
    visaPrice,
    laPrice,
    localOffice,
    localOfficeIdr,
    focTl,
    b2b,
    b2bIdr,
    b2c,
    b2cIdr,
    setFocTl,
    handleChange,
  } = OnChangeUtil();
  const { handleStore } = SubmitCalculateUtil();

  return {
    idHotelMakkah,
    nightInMakkah,
    idHotelMadinah,
    nightInMadinah,
    countVisa,
    visaPriceSelect,
    visaPrice,
    countLa,
    laPrice,
    laPriceSelect,
    idAirline,
    airlinePrice,
    countFocUstad,
    countFocTl,
    localOffice,
    localOfficeIdr,
    focTl,
    b2b,
    b2bIdr,
    b2c,
    b2cIdr,

    setFocTl,

    handleChangeHotelMakkah,
    handleChangeHotelMadinah,
    handleChangeCountSplit,
    handleChangeAirline,

    handleInvalid: OnInvalidUtil,
    handleChange,
    handleStore: (e) =>
      handleStore(
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
      ),
  };
};

export default CalculateFormUtil;
