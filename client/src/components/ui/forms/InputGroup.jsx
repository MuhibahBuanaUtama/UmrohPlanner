import Label from "./Label";

const InputGroup = ({
  htmlFor,
  className,
  childrenLabel,
  children,
  childrenGroup,
}) => {
  return (
    <>
      <div className={`${className} mt-3`}>
        <Label htmlFor={htmlFor} children={childrenLabel} />

        <div className="relative">
          {children}

          <div className="absolute inset-y-3 end-4 top-6 flex w-fit items-center md:end-3">
            {childrenGroup}
          </div>
        </div>
      </div>
    </>
  );
};

export default InputGroup;
