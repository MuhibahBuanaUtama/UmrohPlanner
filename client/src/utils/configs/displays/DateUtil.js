const DateUtil = () => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString(`id-ID`, options);

  const dayOfWeek = currentDate.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const dateType = isWeekend ? "danger" : "basic";
  const dateText = isWeekend ? "Libur" : date;

  return { dateType, dateText };
};

export default DateUtil;
