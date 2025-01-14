const Badge = ({ dot, variant, children }) => {
  return (
    <>
      {dot ? (
        <div
          className={`${
            variant === "info"
              ? "badge-info"
              : variant === "success"
                ? "badge-success"
                : variant === "warning"
                  ? "badge-warning"
                  : variant === "danger"
                    ? "badge-danger"
                    : "badge-basic"
          } inline-block size-2 rounded-full`}
        ></div>
      ) : (
        <div
          className={`${
            variant === "info"
              ? "badge-info"
              : variant === "success"
                ? "badge-success"
                : variant === "warning"
                  ? "badge-warning"
                  : variant === "danger"
                    ? "badge-danger"
                    : "badge-basic"
          } inline-block rounded-full px-2 py-1 text-xs`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Badge;
