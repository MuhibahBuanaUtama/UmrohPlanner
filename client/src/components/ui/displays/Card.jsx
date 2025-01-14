const Card = ({ onClick, className, children }) => {
  return (
    <>
      <div
        className={`rounded-xl bg-gray-50 dark:bg-zinc-900 ${onClick && "cursor-pointer hover:bg-gray-100"} ${className}`}
        onClick={onClick}
      >
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default Card;
