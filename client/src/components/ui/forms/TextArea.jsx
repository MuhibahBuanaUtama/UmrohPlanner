const TextArea = ({
  name,
  value,
  onInvalid,
  onChange,
  onInput,
  placeholder,
  cols = 10,
  rows = 2,
  readOnly,
  required,
}) => {
  return (
    <>
      <textarea
        name={name.toString()}
        id={name.toString()}
        value={value}
        onInvalid={onInvalid}
        onChange={onChange}
        onInput={onInput}
        className="input"
        placeholder={placeholder}
        cols={cols}
        rows={rows}
        readOnly={readOnly}
        required={readOnly}
      />
    </>
  );
};

export default TextArea;
