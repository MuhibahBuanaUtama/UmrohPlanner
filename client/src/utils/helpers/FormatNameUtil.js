const FormatNameUtil = (name) => {
  const formattedName = name.replace(/_/g, " ");

  const capitalizedWords = formattedName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return capitalizedWords;
};

export default FormatNameUtil;
