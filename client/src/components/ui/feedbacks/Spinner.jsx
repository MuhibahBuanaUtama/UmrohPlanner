import { PiSpinner } from "react-icons/pi";

const Spinner = ({ size }) => {
  return (
    <>
      <PiSpinner
        className={`animate-spin text-gray-600 dark:text-gray-400 ${size === "md" ? "text-xl" : size === "lg" ? "text-lg" : "text-base"}`}
      />
    </>
  );
};

export default Spinner;
