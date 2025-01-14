const Checkbox = ({ name, checked, disabled, onChange, children }) => {
  return (
    <>
      <div className="flex items-center gap-2 mt-3">
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="peer"
        />

        <p
          className={`${checked ? "" : "line-through"} peer-disabled:text-gray-200 peer-disabled:dark:text-zinc-700`}
        >
          {children}
        </p>
      </div>
    </>
  );
};

export default Checkbox;
