import { OnInvalidUtil } from "../props/invalid/OnInvalidUtil";
import useSelect from "../hooks/useSelect";
import OnChangeUtil from "../props/change/OnChangeUtil";
import SubmitLaUtil from "../props/submit/SubmitLaUtil";

const LaFormUtil = () => {
  const { countLa, handleChangeCount } = useSelect();
  const { laPrice, handleChange } = OnChangeUtil();
  const { handleStore, handleUpdate } = SubmitLaUtil();

  return {
    countLa,
    laPrice,

    handleChangeCount,

    handleInvalid: OnInvalidUtil,
    handleChange,
    handleStore: (e) => handleStore(e, countLa, laPrice),
    handleUpdate: (e) => handleUpdate(e, countLa, laPrice),
  };
};

export default LaFormUtil;
