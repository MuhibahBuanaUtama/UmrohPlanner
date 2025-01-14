import { useEffect } from "react";
import Alert from "@/components/ui/feedbacks/Alert";
import FormControl from "@/components/ui/forms/FormControl";
import Select from "@/components/ui/forms/Select";
import Input from "@/components/ui/forms/Input";
import Button from "@/components/ui/commons/Button";
import LaFormUtil from "@/utils/forms/LaFormUtil";
import useDetail from "@/utils/hooks/useDetail";
import ShowLaService from "@/services/las/ShowLaService";

export const useUpdate = () => {
  const { id_data, data } = useDetail(ShowLaService);
  return { id_data, data };
};

const FormLa = () => {
  const { data } = useUpdate();

  useEffect(() => {
    if (data.length !== 0) {
      handleChange({
        target: { name: "laPrice", value: data.laPrice || "" },
      });

      handleChangeCount(data.countLa);
    }
  }, [data]);

  const {
    laPrice,
    handleChangeCount,
    handleInvalid,
    handleChange,
    handleStore,
    handleUpdate,
  } = LaFormUtil();

  return (
    <>
      <form
        method={data.length === 0 ? "POST" : "PUT"}
        onSubmit={data.length === 0 ? handleStore : handleUpdate}
      >
        <div className="mt-4 grid grid-cols-1 gap-4 md:mt-0 md:grid-cols-2">
          <div className="col-span-1">
            <Alert icon children="Informasi Detail" />
            <FormControl childrenLabel="Jumlah" required>
              <Select
                name="countLa"
                onChange={handleChangeCount}
                placeholder={data ? data.countLa : "Buka menu pilihan ini..."}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </Select>
            </FormControl>
          </div>

          <div className="col-span-1">
            <Alert icon children="Biaya" />
            <FormControl childrenLabel="Biaya" required>
              <Input
                type="text"
                name="laPrice"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={laPrice}
                autoFocus
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

export default FormLa;
