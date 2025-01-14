import React from "react";

const Radio = ({ name, value, checked, disabled, onChange, children }) => {
  return (
    <div
      onClick={() => !disabled && onChange(value)}
      className={`mt-3 cursor-pointer rounded-xl p-3 ${
        checked
          ? "bg-green-100 dark:bg-green-800"
          : "bg-gray-50 dark:bg-zinc-900"
      } `}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => {}}
        className="hidden"
      />
      <p className="flex items-center peer-disabled:text-gray-200 peer-disabled:dark:text-zinc-700">
        {children}
      </p>
    </div>
  );
};

export default Radio;
