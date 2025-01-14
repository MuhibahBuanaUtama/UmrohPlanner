import { OnInvalidUtil } from "../props/invalid/OnInvalidUtil";
import useSelect from "../hooks/useSelect";
import useDate from "../hooks/useDate";
import OnChangeUtil from "../props/change/OnChangeUtil";
import SubmitHotelUtil from "../props/submit/SubmitHotelUtil";

const HotelFormUtil = () => {
  const {
    provider,
    city,
    rating,
    handleChangeProvider,
    handleChangeCity,
    handleChangeRating,
  } = useSelect();
  const { from, to, handleChangeFromDate, handleChangeToDate } = useDate();
  const {
    hotelName,
    distance,
    address,
    roomPrices,
    handleChange,
    handleChangeRoomPrice,
  } = OnChangeUtil();
  const { handleStore, handleUpdate } = SubmitHotelUtil();

  return {
    provider,
    from,
    to,
    hotelName,
    city,
    distance,
    address,
    rating,
    roomPrices,

    handleChangeProvider,
    handleChangeCity,
    handleChangeRating,
    handleChangeRoomPrice,
    handleChangeFromDate,
    handleChangeToDate,

    handleInvalid: OnInvalidUtil,
    handleChange,
    handleStore: (e) =>
      handleStore(
        e,
        provider,
        from,
        to,
        hotelName,
        city,
        address,
        distance,
        rating,
        roomPrices,
      ),
    handleUpdate: (e) =>
      handleUpdate(
        e,
        provider,
        from,
        to,
        hotelName,
        city,
        address,
        distance,
        rating,
        roomPrices,
      ),
  };
};

export default HotelFormUtil;
