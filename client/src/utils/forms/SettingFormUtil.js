import { OnInvalidUtil } from "../props/invalid/OnInvalidUtil";
import OnChangeUtil from "../props/change/OnChangeUtil";
import SubmitSettingUtil from "../props/submit/SubmitSettingUtil";

const SettingFormUtil = () => {
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
    handleChange,
  } = OnChangeUtil();
  const { handleUpdate } = SubmitSettingUtil();

  return {
    usdToSar,
    usdToRupiah,
    usdToIdr,
    localOffice,
    localOfficeIdr,
    b2b,
    b2bIdr,
    b2c,
    b2cIdr,

    handleInvalid: OnInvalidUtil,
    handleChange,
    handleUpdate: (e) =>
      handleUpdate(e, usdToSar, usdToRupiah, localOffice, b2b, b2c),
  };
};

export default SettingFormUtil;
