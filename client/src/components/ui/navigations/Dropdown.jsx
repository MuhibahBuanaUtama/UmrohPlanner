import DropdownUtil from "@/utils/configs/navigations/DropdownUtil";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

const Dropdown = ({
  dropdownName,
  dropdownTitle,
  dropdownToggle = true,
  children,
}) => {
  const { openDropdown, dropdownRef, handleOpenDropdown } = DropdownUtil();

  return (
    <>
      <div
        className="relative"
        ref={(node) => (dropdownRef.current[dropdownName] = node)}
      >
        <div
          className="flex cursor-pointer items-center gap-1"
          onClick={() => handleOpenDropdown(dropdownName)}
        >
          {dropdownTitle}

          {dropdownToggle && (
            <span className="hidden md:inline">
              {openDropdown[dropdownName] ? (
                <FiChevronDown
                  size={12}
                  className="text-gray-900 dark:text-gray-200"
                />
              ) : (
                <FiChevronRight
                  size={12}
                  className="text-gray-900 dark:text-gray-200"
                />
              )}
            </span>
          )}
        </div>

        {openDropdown[dropdownName] && (
          <div className="absolute end-0 mt-1 w-max rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-zinc-900 dark:ring-zinc-700">
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
