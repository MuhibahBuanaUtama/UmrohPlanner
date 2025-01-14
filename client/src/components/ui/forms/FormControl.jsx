import Label from "./Label";

const FormControl = ({
  htmlFor,
  childrenLabel,
  className,
  required,
  children,
}) => {
  return (
    <>
      <div className={`mt-3 ${className}`}>
        <Label htmlFor={htmlFor} children={childrenLabel} required={required} />

        {children}
      </div>
    </>
  );
};

export default FormControl;
