const Label = ({ htmlFor, required, children }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-gray-900 dark:text-gray-200"
      >
        {children}
        {required && (
          <span className="ms-[2px] text-red-500 dark:text-red-800">*</span>
        )}
      </label>
    </>
  );
};

export default Label;
