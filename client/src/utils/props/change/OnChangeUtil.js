import { useState } from "react";
import CapitalizeUtil from "@/utils/helpers/CapitalizeUtil";
import UpperCaseUtil from "@/utils/helpers/UpperCaseUtil";
import { FormatToNumberUtil } from "@/utils/helpers/FormatToNumberUtil";
import { FormatToRupiahUtil } from "@/utils/helpers/FormatToRupiahUtil";

const OnChangeUtil = () => {
  const [hotelName, setHotelName] = useState("");
  const [distance, setDistance] = useState(0);
  const [address, setAddress] = useState("");
  const [roomPrices, setRoomPrices] = useState([
    { roomType: "Quad", price: 0 },
    { roomType: "Triple", price: 0 },
    { roomType: "Double", price: 0 },
  ]);
  const [airlineName, setAirlineName] = useState("");
  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");
  const [airlinePrice, setAirlinePrice] = useState(0);
  const [airlinePriceIdr, setAirlinePriceIdr] = useState(0);
  const [nightInMakkah, setNightInMakkah] = useState(0);
  const [nightInMadinah, setNightInMadinah] = useState(0);
  const [visaPrice, setVisaPrice] = useState(0);
  const [laPrice, setLaPrice] = useState(0);
  const [usdToSar, setUsdToSar] = useState(0);
  const [usdToRupiah, setUsdToRupiah] = useState(0);
  const [usdToIdr, setUsdToIdr] = useState(0);
  const [localOffice, setLocalOffice] = useState(0);
  const [localOfficeIdr, setLocalOfficeIdr] = useState(0);
  const [focTl, setFocTl] = useState();
  const [b2b, setB2b] = useState(0);
  const [b2bIdr, setB2bIdr] = useState(0);
  const [b2c, setB2c] = useState(0);
  const [b2cIdr, setB2cIdr] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let numericValue;

    if (name === "hotelName") {
      setHotelName(CapitalizeUtil(value));
    } else if (name === "distance") {
      setDistance(value);
    } else if (name === "address") {
      setAddress(CapitalizeUtil(value));
    } else if (name === "airlineName") {
      setAirlineName(CapitalizeUtil(value));
    } else if (name === "code") {
      setCode(UpperCaseUtil(value));
    } else if (name === "country") {
      setCountry(CapitalizeUtil(value));
    } else if (name === "nightInMakkah") {
      setNightInMakkah(value);
    } else if (name === "nightInMadinah") {
      setNightInMadinah(value);
    } else if (name === "visaPrice") {
      setVisaPrice(value);
    } else if (name === "laPrice") {
      setLaPrice(value);
    } else if (name === "usdToSar") {
      setUsdToSar(value);
    } else if (name === "focTl") {
      setFocTl(value);
    }

    if (typeof value === "string") {
      numericValue = value.replace(/\D/g, "");
    } else {
      numericValue = String(value);
    }

    const isNumeric =
      !isNaN(parseFloat(numericValue)) && isFinite(parseFloat(numericValue));

    if (name === "airlinePrice") {
      if (isNumeric) {
        const formattedPrice = FormatToNumberUtil(numericValue);
        setAirlinePrice(formattedPrice);
        setAirlinePriceIdr(FormatToRupiahUtil(numericValue));
      } else {
        setAirlinePrice("");
        setAirlinePriceIdr("");
      }
    } else if (name === "usdToRupiah") {
      if (isNumeric) {
        const formattedPrice = FormatToNumberUtil(numericValue);
        setUsdToRupiah(formattedPrice);
        setUsdToIdr(FormatToRupiahUtil(numericValue));
      } else {
        setUsdToRupiah("");
        setUsdToRupiah("");
      }
    } else if (name === "localOffice") {
      if (isNumeric) {
        const formattedPrice = FormatToNumberUtil(numericValue);
        setLocalOffice(formattedPrice);
        setLocalOfficeIdr(FormatToRupiahUtil(numericValue));
      } else {
        setLocalOffice("");
        setLocalOfficeIdr("");
      }
    } else if (name === "b2b") {
      if (isNumeric) {
        const formattedPrice = FormatToNumberUtil(numericValue);
        setB2b(formattedPrice);
        setB2bIdr(FormatToRupiahUtil(numericValue));
      } else {
        setB2b("");
        setB2bIdr("");
      }
    } else if (name === "b2c") {
      if (isNumeric) {
        const formattedPrice = FormatToNumberUtil(numericValue);
        setB2c(formattedPrice);
        setB2cIdr(FormatToRupiahUtil(numericValue));
      } else {
        setB2c("");
        setB2cIdr("");
      }
    }
  };

  const handleChangeRoomPrice = (roomType, newPrice) => {
    setRoomPrices((prevPrices) =>
      prevPrices.map((room) =>
        room.roomType === roomType ? { ...room, price: newPrice } : room,
      ),
    );
  };

  return {
    hotelName,
    distance,
    address,
    roomPrices,
    airlineName,
    code,
    country,
    airlinePrice,
    airlinePriceIdr,
    nightInMakkah,
    nightInMadinah,
    visaPrice,
    laPrice,
    usdToSar,
    usdToRupiah,
    usdToIdr,
    localOffice,
    localOfficeIdr,
    focTl,
    b2b,
    b2bIdr,
    b2c,
    b2cIdr,

    setFocTl,
    setAirlinePriceIdr,

    handleChange,
    handleChangeRoomPrice,
  };
};

export default OnChangeUtil;
