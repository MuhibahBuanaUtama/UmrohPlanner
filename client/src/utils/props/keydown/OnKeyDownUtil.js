const OnKeyDownUtil = () => {
  const handleNumberKey = (e) => {
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      !(e.key === "a" && e.ctrlKey === true)
    ) {
      e.preventDefault();
    }
  };

  return { handleNumberKey };
};

export default OnKeyDownUtil;
