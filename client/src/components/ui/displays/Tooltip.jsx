import { useState } from "react";

const Tooltip = ({ className, children, text }) => {
  const [showToolTip, setShowToolTip] = useState(false);

  const handleMouseEnter = () => {
    setShowToolTip(true);
  };

  const handleMouseLeave = () => {
    setShowToolTip(false);
  };

  return (
    <>
      <div
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}

        {showToolTip && (
          <div
            className={`${className ? className : "-start-6"} absolute top-8 min-w-28 rounded-xl bg-gray-50 p-2 text-center shadow-sm dark:bg-zinc-900`}
          >
            {text}

            <div className="absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 border-b-[5px] border-l-[5px] border-r-[5px] border-transparent border-b-gray-50 dark:border-b-zinc-900"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tooltip;
