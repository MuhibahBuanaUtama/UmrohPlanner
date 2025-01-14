import { useState } from "react";
import { FormatToRupiahUtil } from "../helpers/FormatToRupiahUtil";

const useSelect = () => {
  const [provider, setProvider] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(0);
  const [flightClasses, setFlightClasses] = useState("");
  const [idHotelMakkah, setIdHotelMakkah] = useState("");
  const [nameHotelMakkah, setNameHotelMakkah] = useState("");
  const [idHotelMadinah, setIdHotelMadinah] = useState("");
  const [nameHotelMadinah, setNameHotelMadinah] = useState("");
  const [idAirline, setIdAirline] = useState("");
  const [airlinePrice, setAirlinePrice] = useState(0);
  const [countVisa, setCountVisa] = useState(0);
  const [visaPriceSelect, setVisaPriceSelect] = useState(0);
  const [countLa, setCountLa] = useState(0);
  const [laPriceSelect, setLaPriceSelect] = useState(0);
  const [countFocUstad, setCountFocUstad] = useState(0);
  const [countFocTl, setCountFocTl] = useState(0);

  const handleChangeProvider = (value) => {
    setProvider(value.value);
  };

  const handleChangeCity = (value) => {
    setCity(value);
  };

  const handleChangeRating = (value) => {
    setRating(value);
  };

  const handleChangeFlightClasses = (value) => {
    setFlightClasses(value.value);
  };

  const handleChangeHotelMakkah = (selectedOption) => {
    const [id, name] = selectedOption.value
      .split("|")
      .map((item) => item.trim());
    setIdHotelMakkah(id);
    setNameHotelMakkah(name);
  };

  const handleChangeHotelMadinah = (selectedOption) => {
    const [id, name] = selectedOption.value
      .split("|")
      .map((item) => item.trim());
    setIdHotelMadinah(id);
    setNameHotelMadinah(name);
  };

  const handleChangeAirline = (selectedOption) => {
    const [id, airlinePrice] = selectedOption.value
      .split("|")
      .map((item) => item.trim());
    setIdAirline(id);
    setAirlinePrice(FormatToRupiahUtil(airlinePrice));
  };

  const handleChangeCountSplit = (selectedOption) => {
    const [countVisa, visaPrice, laPrice] = selectedOption.value
      .split("|")
      .map((item) => item.trim());

    setCountVisa(countVisa);
    setVisaPriceSelect(visaPrice);
    setCountLa(countVisa);
    setLaPriceSelect(laPrice);
    setCountFocUstad(countVisa);
    setCountFocTl(countVisa);
  };

  const handleChangeCount = (value) => {
    setCountVisa(value.value);
    setCountLa(value.value);
    setCountFocUstad(value.value);
    setCountFocTl(value.value);
  };

  return {
    provider,
    city,
    rating,
    flightClasses,
    idHotelMakkah,
    nameHotelMakkah,
    idHotelMadinah,
    nameHotelMadinah,
    idAirline,
    airlinePrice,
    countVisa,
    visaPriceSelect,
    countLa,
    laPriceSelect,
    countFocUstad,
    countFocTl,

    setProvider,
    setCity,
    setRating,
    setFlightClasses,

    handleChangeProvider,
    handleChangeCity,
    handleChangeRating,
    handleChangeFlightClasses,
    handleChangeHotelMakkah,
    handleChangeHotelMadinah,
    handleChangeAirline,
    handleChangeCountSplit,
    handleChangeCount,
  };
};

export default useSelect;
