const Tag = ({ type, dot, icon: Icon, className, onClick, children }) => {
  return (
    <>
      <div
        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
          type === "info"
            ? "info"
            : type === "success"
              ? "success"
              : type === "warning"
                ? "warning"
                : type === "danger"
                  ? "danger"
                  : type === "quaternary"
                    ? "quaternary"
                    : "basic"
        } ${onClick && "cursor-pointer"} ${className}`}
        onClick={onClick}
      >
        <div className="flex items-center gap-1">
          {dot && (
            <span
              className={`size-2 rounded-full ${
                type === "info"
                  ? "bg-blue-500 dark:bg-blue-50"
                  : type === "success"
                    ? "bg-green-500 dark:bg-green-50"
                    : type === "warning"
                      ? "bg-yellow-50- dark:bg-yellow-50"
                      : type === "danger"
                        ? "bg-red-500 dark:bg-red-50"
                        : "bg-gray-600 dark:bg-gray-400"
              }`}
            ></span>
          )}
          {Icon && <Icon size={12} />}
          {children}
        </div>
      </div>
    </>
  );
};

export default Tag;
