import { useState } from "react";

const useDate = () => {
  const [from, setForm] = useState(null);
  const [to, setTo] = useState(null);

  const handleChangeFromDate = (date) => {
    setForm(date);
  };

  const handleChangeToDate = (date) => {
    setTo(date);
  };

  return {
    from,
    to,
    handleChangeFromDate,
    handleChangeToDate,
  };
};

export default useDate;
