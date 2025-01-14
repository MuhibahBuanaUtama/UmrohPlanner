import { OnInvalidUtil } from "../props/invalid/OnInvalidUtil";
import useSelect from "../hooks/useSelect";
import OnChangeUtil from "../props/change/OnChangeUtil";
import SubmitVisaUtil from "../props/submit/SubmitVisaUtil";

const VisaFormUtil = () => {
  const { countVisa, handleChangeCount } = useSelect();
  const { visaPrice, handleChange } = OnChangeUtil();
  const { handleStore, handleUpdate } = SubmitVisaUtil();

  return {
    countVisa,
    visaPrice,

    handleChangeCount,

    handleInvalid: OnInvalidUtil,
    handleChange,
    handleStore: (e) => handleStore(e, countVisa, visaPrice),
    handleUpdate: (e) => handleUpdate(e, countVisa, visaPrice),
  };
};

export default VisaFormUtil;
