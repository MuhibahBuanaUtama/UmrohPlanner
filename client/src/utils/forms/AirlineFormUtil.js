import { OnInvalidUtil } from "../props/invalid/OnInvalidUtil";
import useSelect from "../hooks/useSelect";
import OnChangeUtil from "../props/change/OnChangeUtil";
import SubmitAirlineUtil from "../props/submit/SubmitAirlineUtil";

const AirlineFormUtil = () => {
  const { flightClasses, handleChangeFlightClasses } = useSelect();
  const {
    airlineName,
    code,
    country,
    airlinePrice,
    airlinePriceIdr,
    setAirlinePriceIdr,
    handleChange,
  } = OnChangeUtil();
  const { handleStore, handleUpdate } = SubmitAirlineUtil();

  return {
    airlineName,
    code,
    country,
    flightClasses,
    airlinePrice,
    airlinePriceIdr,
    setAirlinePriceIdr,

    handleChangeFlightClasses,

    handleInvalid: OnInvalidUtil,
    handleChange,
    handleStore: (e) =>
      handleStore(e, airlineName, code, country, flightClasses, airlinePrice),
    handleUpdate: (e) =>
      handleUpdate(e, airlineName, code, country, flightClasses, airlinePrice),
  };
};

export default AirlineFormUtil;
