import { useEffect } from "react";
import Button from "@/components/ui/commons/Button";
import Alert from "@/components/ui/feedbacks/Alert";
import FormControl from "@/components/ui/forms/FormControl";
import Input from "@/components/ui/forms/Input";
import Radio from "@/components/ui/forms/Radio";
import TextArea from "@/components/ui/forms/TextArea";
import HotelFormUtil from "@/utils/forms/HotelFormUtil";
import useDetail from "@/utils/hooks/useDetail";
import ShowHotelService from "@/services/hotels/ShowHotelService";
import DatePicker from "@/components/ui/forms/DatePicker";
import Select from "@/components/ui/forms/Select";

export const useUpdate = () => {
  const { id_data, data } = useDetail(ShowHotelService);
  return { id_data, data };
};

const FormHotel = () => {
  const { data } = useUpdate();

  useEffect(() => {
    if (data.length !== 0) {
      handleChange({
        target: { name: "hotelName", value: data.name || "" },
      });
      handleChange({
        target: { name: "address", value: data.address || "" },
      });
      data.roomPrices.forEach(({ roomType, price }) => {
        handleChangeRoomPrice(roomType, price);
      });
      handleChangeCity(data.city);
      handleChangeRating(data.rating);
    }
  }, [data]);

  const {
    provider,
    hotelName,
    from,
    to,
    city,
    address,
    rating,
    roomPrices,

    handleChangeProvider,
    handleChangeCity,
    handleChangeRating,
    handleChangeRoomPrice,
    handleChangeFromDate,
    handleChangeToDate,
    handleInvalid,
    handleChange,
    handleStore,
    handleUpdate,
  } = HotelFormUtil();

  return (
    <>
      <form
        method={data.length === 0 ? "POST" : "PUT"}
        onSubmit={data.length === 0 ? handleStore : handleUpdate}
      >
        <div className="mt-4 grid grid-cols-1 gap-4 md:mt-0 md:grid-cols-2">
          <div className="col-span-1">
            <Alert icon children="Validasi" />
            <FormControl htmlFor="provider" childrenLabel="Provider" required>
              <Select
                name="provider"
                placeholder={data ? data.provider : "Buka menu pilihan ini..."}
                onChange={handleChangeProvider}
              >
                <option value="Diyar">Diyar</option>
              </Select>
            </FormControl>
            <div className="gap-4 md:flex">
              <FormControl childrenLabel="Dari" required>
                <DatePicker selected={from} onChange={handleChangeFromDate} />
              </FormControl>
              <FormControl childrenLabel="Hingga" required>
                <DatePicker selected={to} onChange={handleChangeToDate} />
              </FormControl>
            </div>

            <Alert icon children="Informasi Detail" className="mt-4" />
            <FormControl
              htmlFor="hotelName"
              childrenLabel="Nama Hotel"
              required
            >
              <Input
                type="text"
                name="hotelName"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={hotelName}
                required
              />
            </FormControl>
            <FormControl htmlFor="city" childrenLabel="Kota" required>
              <div className="flex items-center gap-2">
                <Radio
                  name="city"
                  value="Makkah"
                  checked={city === "Makkah"}
                  onChange={handleChangeCity}
                >
                  Makkah
                </Radio>
                <Radio
                  name="city"
                  value="Madinah"
                  checked={city === "Madinah"}
                  onChange={handleChangeCity}
                >
                  Madinah
                </Radio>
              </div>
            </FormControl>
            <FormControl htmlFor="distance" childrenLabel="Jarak" required>
              <Input
                type="number"
                name="distance"
                onInvalid={handleInvalid}
                onChange={handleChange}
                // value={location}
                required
              />
            </FormControl>
            <FormControl htmlFor="address" childrenLabel="Alamat" required>
              <TextArea
                name="address"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={address}
              />
            </FormControl>
          </div>

          <div className="col-span-1">
            <Alert icon children="Layanan" />
            <FormControl htmlFor="rating" childrenLabel="Rating" required>
              <div className="mt-3 flex">
                {[1, 2, 3, 4, 5].map((value) => (
                  <svg
                    key={value}
                    onClick={() => handleChangeRating(value)}
                    className={`h-8 w-8 cursor-pointer ${
                      value <= rating
                        ? "text-yellow-500"
                        : "text-gray-200 dark:text-zinc-800"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                  </svg>
                ))}
              </div>
            </FormControl>

            <Alert icon children="Harga" className="mt-4" />
            <div className="flex flex-col md:flex-row md:gap-4">
              <FormControl
                htmlFor="quad"
                childrenLabel="Quad"
                children={
                  <Input
                    type="number"
                    name="quad"
                    onChange={(e) =>
                      handleChangeRoomPrice(`Quad`, Number(e.target.value))
                    }
                    value={
                      roomPrices.find((room) => room.roomType === "Quad")
                        ?.price || ""
                    }
                    required
                  />
                }
                required
              />
              <FormControl
                htmlFor="triple"
                childrenLabel="Triple"
                children={
                  <Input
                    type="number"
                    name="triple"
                    onChange={(e) =>
                      handleChangeRoomPrice(`Triple`, Number(e.target.value))
                    }
                    value={
                      roomPrices.find((room) => room.roomType === "Triple")
                        ?.price || ""
                    }
                    required
                  />
                }
                required
              />
              <FormControl
                htmlFor="double"
                childrenLabel="Double"
                children={
                  <Input
                    type="number"
                    name="double"
                    onChange={(e) =>
                      handleChangeRoomPrice(`Double`, Number(e.target.value))
                    }
                    value={
                      roomPrices.find((room) => room.roomType === "Double")
                        ?.price || ""
                    }
                    required
                  />
                }
                required
              />
            </div>

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

export default FormHotel;
