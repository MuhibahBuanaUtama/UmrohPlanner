import { useEffect } from "react";
import Alert from "@/components/ui/feedbacks/Alert";
import FormControl from "@/components/ui/forms/FormControl";
import Input from "@/components/ui/forms/Input";
import Button from "@/components/ui/commons/Button";
import SettingFormUtil from "@/utils/forms/SettingFormUtil";
import useDetail from "@/utils/hooks/useDetail";
import ShowSettingService from "@/services/settings/ShowSettingService";

export const useUpdate = () => {
  const { id_data, data } = useDetail(ShowSettingService);
  return { id_data, data };
};

const FormSetting = () => {
  const { data } = useUpdate();

  useEffect(() => {
    if (data.length !== 0) {
      handleChange({
        target: { name: "usdToSar", value: data.usdToSar || "" },
      });
      handleChange({
        target: { name: "usdToRupiah", value: data.usdToRupiah || "" },
      });
      handleChange({
        target: { name: "localOffice", value: data.localOffice || "" },
      });
      handleChange({
        target: { name: "b2b", value: data.b2b || "" },
      });
      handleChange({
        target: { name: "b2c", value: data.b2c || "" },
      });
    }
  }, [data]);

  const {
    usdToSar,
    usdToRupiah,
    usdToIdr,
    localOffice,
    localOfficeIdr,
    b2b,
    b2bIdr,
    b2c,
    b2cIdr,
    handleInvalid,
    handleChange,
    handleUpdate,
  } = SettingFormUtil();

  return (
    <>
      <form method="PUT" onSubmit={handleUpdate}>
        <div className="mt-4 grid grid-cols-1 gap-4 md:mt-0 md:grid-cols-2">
          <div className="col-span-1">
            <Alert icon children="Konversi Mata Uang" />
            <FormControl htmlFor="usdToSar" childrenLabel="USD to SAR" required>
              <Input
                type="number"
                name="usdToSar"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={usdToSar}
                required
              />
            </FormControl>
            <FormControl
              htmlFor="usdToRupiah"
              childrenLabel="USD to IDR"
              required
            >
              <Input
                type="text"
                name="usdToRupiah"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={usdToIdr}
                required
              />
            </FormControl>
          </div>

          <div className="col-span-1">
            <Alert icon children="Lain-lain" />
            <FormControl
              htmlFor="localOffice"
              childrenLabel="Lokal Kantor"
              required
            >
              <Input
                type="text"
                name="localOffice"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={localOfficeIdr}
                required
              />
            </FormControl>
            <FormControl htmlFor="b2b" childrenLabel="Fee B2B" required>
              <Input
                type="text"
                name="b2b"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={b2bIdr}
                required
              />
            </FormControl>
            <FormControl htmlFor="b2c" childrenLabel="Fee B2C" required>
              <Input
                type="text"
                name="b2c"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={b2cIdr}
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

export default FormSetting;
