import { useEffect } from "react";
import Alert from "@/components/ui/feedbacks/Alert";
import FormControl from "@/components/ui/forms/FormControl";
import Input from "@/components/ui/forms/Input";
import Select from "@/components/ui/forms/Select";
import Button from "@/components/ui/commons/Button";
import AirlineFormUtil from "@/utils/forms/AirlineFormUtil";
import useDetail from "@/utils/hooks/useDetail";
import ShowAirlineService from "@/services/airlines/ShowAirlineService";
import { FormatToRupiahUtil } from "@/utils/helpers/FormatToRupiahUtil";

export const useUpdate = () => {
  const { id_data, data } = useDetail(ShowAirlineService);
  return { id_data, data };
};

const FormAirline = () => {
  const { data } = useUpdate();

  useEffect(() => {
    if (data.length !== 0) {
      handleChange({
        target: { name: "airlineName", value: data.name || "" },
      });
      handleChange({
        target: { name: "code", value: data.code || "" },
      });
      handleChange({
        target: { name: "country", value: data.country || "" },
      });
      handleChange({
        target: { name: "airlinePrice", value: data.airlinePrice || "" },
      });

      handleChangeFlightClasses(data.flightClasses);
      setAirlinePriceIdr(FormatToRupiahUtil(data.airlinePrice));
    }
  }, [data]);

  const {
    airlineName,
    code,
    country,
    flightClasses,
    airlinePrice,
    airlinePriceIdr,

    setAirlinePriceIdr,
    handleChangeFlightClasses,

    handleInvalid,
    handleChange,
    handleStore,
    handleUpdate,
  } = AirlineFormUtil();

  return (
    <>
      <form
        method={data.length === 0 ? "POST" : "PUT"}
        onSubmit={data.length === 0 ? handleStore : handleUpdate}
      >
        <div className="mt-4 grid grid-cols-1 gap-4 md:mt-0 md:grid-cols-2">
          <div className="col-span-1">
            <Alert icon children="Informasi Detail" />
            <FormControl htmlFor="name" childrenLabel="Nama Pesawat" required>
              <Input
                type="text"
                name="airlineName"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={airlineName}
                autoFocus
                required
              />
            </FormControl>
            <FormControl htmlFor="code" childrenLabel="Kode" required>
              <Input
                type="text"
                name="code"
                className="uppercase"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={code}
                required
              />
            </FormControl>
            <FormControl htmlFor="country" childrenLabel="Negara">
              <Input
                type="text"
                name="country"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={country}
              />
            </FormControl>
          </div>
          <div className="col-span-1">
            <Alert icon children="Layanan" />
            <FormControl childrenLabel="Kelas" required>
              <Select
                name="flightClasses"
                onChange={handleChangeFlightClasses}
                placeholder={
                  data ? data.flightClasses : "Buka menu pilihan ini..."
                }
              >
                <option value="Economy">Economy</option>
              </Select>
            </FormControl>

            <Alert icon children="Harga" className="mt-4" />
            <FormControl htmlFor="airlinePrice" childrenLabel="Harga">
              <Input
                type="text"
                name="airlinePrice"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={airlinePriceIdr}
                required
              />
            </FormControl>

            <Button
              type="submit"
              children="Simpan"
              className="float-end mt-12 w-full md:w-fit"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormAirline;
