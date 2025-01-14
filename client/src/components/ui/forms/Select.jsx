import React, { useState, useEffect, Children } from "react";
import ReactSelect from "react-select";

const isMobile = () => window.innerWidth < 768;

const Select = ({
  name,
  defaultValue,
  value,
  onChange,
  className,
  placeholder = "Buka menu pilihan ini...",
  children,
  disabled,
  isOptions,
  isMulti,
  ...props
}) => {
  const theme = localStorage.getItem("dark");

  const [mobileState, setMobileState] = useState(isMobile());
  const [darkState, setDarkState] = useState(false);
  const dark = darkState === "true";

  useEffect(() => {
    const handleResize = () => setMobileState(isMobile());
    const handleStorageChange = () => setDarkState(theme);

    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [theme]);

  useEffect(() => {
    setDarkState(theme);
  }, [theme]);

  const style = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      borderRadius: "12px",
      padding: mobileState ? "10px" : "6px",
      backgroundColor: dark
        ? "transparent"
        : disabled
          ? "rgb(249 250 251)"
          : "transparent",
      border: dark ? "1px solid rgb(63 63 70)" : "1px solid rgb(229 231 235)",
      boxShadow: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      "&:hover": {
        border: "1px solid  rgb(22 101 52)",
      },
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "rgb(229 231 235)",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: dark ? "rgb(63 63 70)" : "rgb(229 231 235)",
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      color: dark ? "rgb(63 63 70)" : "rgb(229 231 235)",
    }),

    menu: (provided) => ({
      ...provided,
      borderRadius: "12px",
      padding: mobileState ? "10px" : "7px",
      border: "0px",
      boxShadow: "none",
      backgroundColor: dark ? "rgb(39 39 39)" : "rgb(249 250 251)",
    }),

    option: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      backgroundColor: state.isSelected ? "rgb(22 101 52)" : "transparent",
      color: state.isSelected ? "#ffffff" : dark ? "#ffffff" : "rgb(75 85 99)",
      cursor: "pointer",
      "&:active": {
        backgroundColor: dark ? " rgb(63 63 70)" : "rgb(229 231 235)",
        color: dark ? "rgb(156 163 175)" : "",
      },
    }),

    input: (provided) => ({
      ...provided,
      color: dark ? "rgb(156 163 175)" : "rgb(75 85 99)",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: dark ? "rgb(156 163 175)" : "rgb(75 85 99)",
    }),
  };

  const options = Children.map(children, (child) => ({
    label: child.props.children,
    value: child.props.value,
  }));

  // const handleSelectChange = (selectedOption) => {
  //   onChange(selectedOption.value);
  // };

  return (
    <>
      <ReactSelect
        id={name}
        defaultValue={defaultValue}
        value={value}
        styles={style}
        onChange={onChange}
        className={className ? className : "mt-3"}
        {...props}
        options={options || isOptions}
        isMulti={isMulti}
        placeholder={placeholder}
        isDisabled={disabled}
      />
    </>
  );
};

export default Select;
