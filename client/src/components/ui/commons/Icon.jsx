const Icon = ({ name: Icon, size = 16, className }) => {
  return (
    <>
      <Icon
        size={size}
        className={`${className} text-gray-600 dark:text-gray-400`}
      />
    </>
  );
};

export default Icon;
