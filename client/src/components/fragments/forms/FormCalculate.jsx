import { useEffect, useState } from "react";
import Alert from "@/components/ui/feedbacks/Alert";
import FormControl from "@/components/ui/forms/FormControl";
import Select from "@/components/ui/forms/Select";
import Input from "@/components/ui/forms/Input";
import Button from "@/components/ui/commons/Button";
import Checkbox from "@/components/ui/forms/Checkbox";
import useData from "@/utils/hooks/useData";
import IndexHotelService from "@/services/hotels/IndexHotelService";
import IndexAirlineService from "@/services/airlines/IndexAirlineService";
import IndexVisaService from "@/services/visas/IndexVisaService";
import IndexLaService from "@/services/las/IndexLaService";
import IndexSettingService from "@/services/settings/IndexSettingService";
import CalculateFormUtil from "@/utils/forms/CalculateFormUtil";
import { FormatToRupiahUtil } from "@/utils/helpers/FormatToRupiahUtil";
import ResultCard from "@/components/fragments/displays/card/ResultCard";

const FormCalculate = () => {
  const { data: hotelData } = useData(IndexHotelService);
  const [makkahHotels, setMakkahHotels] = useState([]);
  const [madinahHotels, setMadinahHotels] = useState([]);
  const [localOfficeData, setLocalOffice] = useState([]);
  const [b2bData, setB2b] = useState([]);
  const [b2cData, setB2c] = useState([]);
  const { data: airlineData } = useData(IndexAirlineService);
  const { data: visaData } = useData(IndexVisaService);
  const { data: laData } = useData(IndexLaService);
  const { data: settingData } = useData(IndexSettingService);
  const [isTlChecked, setIsTlChecked] = useState(true);

  useEffect(() => {
    if (hotelData && hotelData.length > 0) {
      const makkahHotel = hotelData.filter((hotel) => hotel.city === "Makkah");
      setMakkahHotels(makkahHotel);
      const madinahHotel = hotelData.filter(
        (hotel) => hotel.city === "Madinah",
      );
      setMadinahHotels(madinahHotel);
    } else {
      setMakkahHotels([]);
      setMadinahHotels([]);
    }

    if (settingData && settingData.length > 0) {
      setLocalOffice(FormatToRupiahUtil(settingData[0].localOffice));
      setB2b(FormatToRupiahUtil(settingData[0].b2b));
      setB2c(FormatToRupiahUtil(settingData[0].b2c));
    }
  }, [hotelData, settingData]);

  const {
    idHotelMakkah,
    nightInMakkah,
    idHotelMadinah,
    nightInMadinah,
    countVisa,
    visaPriceSelect,
    visaPrice,
    countLa,
    laPriceSelect,
    laPrice,
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

    handleInvalid,
    handleChange,
    handleStore,
  } = CalculateFormUtil();

  const handleChangeTourLeader = (e) => {
    setIsTlChecked(e.target.checked);
    setFocTl(e.target.checked ? "" : 0);
  };

  return (
    <>
      <form method="POST" onSubmit={handleStore}>
        <div className="mt-4 grid grid-cols-1 gap-4 md:mt-0 md:grid-cols-2">
          <div className="order-2 col-span-1 md:order-first">
            <Alert children="Makkah" />
            <FormControl childrenLabel="Hotel Makkah" required>
              <Select
                name="idHotelMakkah"
                placeholder="Buka menu pilihan ini..."
                onChange={handleChangeHotelMakkah}
              >
                {makkahHotels.map((hotel) => (
                  <option key={hotel.id} value={`${hotel.id}|${hotel.name}`}>
                    {hotel.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl htmlFor="nightInMakkah" childrenLabel="Malam" required>
              <Input
                type="number"
                name="nightInMakkah"
                onInvalid={handleInvalid}
                onChange={handleChange}
                required
              />
            </FormControl>

            <Alert children="Madinah" className="mt-5" />
            <FormControl childrenLabel="Hotel Madinah" required>
              <Select
                name="idHotelMadinah"
                placeholder="Buka menu pilihan ini..."
                onChange={handleChangeHotelMadinah}
              >
                {madinahHotels.map((hotel) => (
                  <option key={hotel.id} value={`${hotel.id}`}>
                    {hotel.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl
              htmlFor="nightInMadinah"
              childrenLabel="Malam"
              required
            >
              <Input
                type="number"
                name="nightInMadinah"
                onInvalid={handleInvalid}
                onChange={handleChange}
                required
              />
            </FormControl>

            <Alert children="Pesawat" className="mt-5" />
            <FormControl childrenLabel="Pesawat" required>
              <Select
                name="idAirline"
                placeholder="Buka menu pilihan ini..."
                onChange={handleChangeAirline}
              >
                {airlineData.map((airline) => (
                  <option
                    key={airline.id}
                    value={`${airline.id}|${airline.airlinePrice}`}
                  >
                    {airline.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl htmlFor="airlinePrice" childrenLabel="Harga" required>
              <Input
                type="text"
                name="airlinePrice"
                value={airlinePrice}
                disabled
              />
            </FormControl>

            <Alert children="Visa & LA" className="mt-5" />
            <FormControl childrenLabel="Jumlah Visa" required>
              <Select
                name="countVisa"
                placeholder="Buka menu pilihan ini..."
                onChange={handleChangeCountSplit}
              >
                {visaData.map((visa) => {
                  const associatedLa = laData.find(
                    (la) => la.countLa === visa.countVisa,
                  );

                  return (
                    <option
                      key={visa.id}
                      value={`${visa.countVisa}|${visa.visaPrice}|${associatedLa ? associatedLa.laPrice : 0}`}
                    >
                      {visa.countVisa}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl htmlFor="visaPrice" childrenLabel="Biaya">
              <Input
                type="number"
                name="visaPrice"
                value={visaPrice > 0 ? visaPrice : visaPriceSelect}
                onInvalid={handleInvalid}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl childrenLabel="Jumlah LA" required>
              <Input
                type="number"
                name="countLa"
                value={countLa}
                onInvalid={handleInvalid}
                onChange={handleChange}
                disabled
              />
            </FormControl>
            <FormControl htmlFor="laPrice" childrenLabel="Biaya">
              <Input
                type="number"
                name="laPrice"
                value={laPrice > 0 ? laPrice : laPriceSelect}
                onInvalid={handleInvalid}
                onChange={handleChange}
                disabled
              />
            </FormControl>

            <Alert children="Lain-lain" className="mt-5" />
            <FormControl childrenLabel="Konfigurasi">
              <Checkbox
                name="tourLeader"
                checked={isTlChecked}
                onChange={handleChangeTourLeader}
                children="Tour Leader"
              />
            </FormControl>
            <FormControl htmlFor="localOffice" childrenLabel="Lokal Kantor">
              <Input
                type="text"
                name="localOffice"
                value={localOffice > 0 ? localOfficeIdr : localOfficeData}
                onInvalid={handleInvalid}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl htmlFor="b2b" childrenLabel="Fee B2B">
              <Input
                type="text"
                name="b2b"
                value={b2b > 0 ? b2bIdr : b2bData}
                onInvalid={handleInvalid}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl htmlFor="b2c" childrenLabel="Fee B2C">
              <Input
                type="text"
                name="b2c"
                value={b2c > 0 ? b2cIdr : b2cData}
                onInvalid={handleInvalid}
                onChange={handleChange}
              />
            </FormControl>

            <Button
              type="submit"
              children="Simpan"
              className="float-end mt-12 w-full md:w-fit"
            />
          </div>

          <div className="order-first col-span-1 md:order-2">
            <Alert type="success" children="Hasil" className="mb-3" />
            <ResultCard />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormCalculate;
