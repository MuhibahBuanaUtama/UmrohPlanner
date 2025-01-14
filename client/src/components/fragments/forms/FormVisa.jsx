import { useEffect } from "react";
import Alert from "@/components/ui/feedbacks/Alert";
import FormControl from "@/components/ui/forms/FormControl";
import Select from "@/components/ui/forms/Select";
import Input from "@/components/ui/forms/Input";
import Button from "@/components/ui/commons/Button";
import VisaFormUtil from "@/utils/forms/VisaFormUtil";
import useDetail from "@/utils/hooks/useDetail";
import ShowVisaService from "@/services/visas/ShowVisaService";

export const useUpdate = () => {
  const { id_data, data } = useDetail(ShowVisaService);
  return { id_data, data };
};

const FormVisa = () => {
  const { data } = useUpdate();

  useEffect(() => {
    if (data.length !== 0) {
      handleChange({
        target: { name: "visaPrice", value: data.visaPrice || "" },
      });

      handleChangeCount(data.countVisa);
    }
  }, [data]);

  const {
    visaPrice,
    handleChangeCount,
    handleInvalid,
    handleChange,
    handleStore,
    handleUpdate,
  } = VisaFormUtil();

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
                name="countVisa"
                onChange={handleChangeCount}
                placeholder={data ? data.countVisa : "Buka menu pilihan ini..."}
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
                name="visaPrice"
                onInvalid={handleInvalid}
                onChange={handleChange}
                value={visaPrice}
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

export default FormVisa;
