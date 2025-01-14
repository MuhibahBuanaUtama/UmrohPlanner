import { Link } from "react-router-dom";
import DropdownUtil from "@/utils/configs/navigations/DropdownUtil";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const Menu = ({ children }) => {
  return <>{children}</>;
};

export const MenuItem = ({
  collapsable,
  dropdownName,
  dropdownTitle,
  icon: Icon,
  to,
  onClick,
  active,
  openDrawer,
  children,
}) => {
  const { openDropdown, dropdownRef, handleOpenDropdown } = DropdownUtil();

  return (
    <>
      {collapsable ? (
        <div
          className="relative"
          ref={(node) => (dropdownRef.current[dropdownName] = node)}
        >
          <div
            className="mb-1 flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl"
            onClick={() => handleOpenDropdown(dropdownName)}
          >
            <div
              className={`flex w-full items-center gap-2 rounded-xl p-3 hover:bg-zinc-900 dark:hover:bg-zinc-950 ${active && "bg-zinc-900 dark:bg-zinc-950"} ${!openDrawer && "w-full justify-center"}`}
            >
              <Icon size={20} className="text-white" />
              {openDrawer && (
                <div className={`small font-medium capitalize text-white`}>
                  {dropdownTitle}
                </div>
              )}
            </div>

            {openDrawer &&
              (openDropdown[dropdownName] ? (
                <FiChevronDown size={16} className="text-white" />
              ) : (
                <FiChevronRight size={16} className="text-white" />
              ))}
          </div>

          {openDropdown[dropdownName] && (
            <div
              className={`mb-[7px] mt-1 flex flex-col rounded-xl ${!openDrawer && "absolute z-50 w-max bg-zinc-950 shadow-sm"}`}
            >
              {children}
            </div>
          )}
        </div>
      ) : (
        <Link
          className={`mt-1 flex cursor-pointer items-center gap-2 rounded-xl p-3 hover:bg-zinc-900 dark:hover:bg-zinc-950 ${openDrawer ? "justify-start" : "justify-center"} w-full ${active && "bg-zinc-900 dark:bg-zinc-950"}`}
          to={to}
          onClick={onClick}
        >
          <Icon size={20} className="text-white" />
          {openDrawer && (
            <div className={`small font-medium text-white`}>{children}</div>
          )}
        </Link>
      )}
    </>
  );
};

export const MenuItemDropdown = ({ to, active, openDrawer, children }) => {
  return (
    <>
      <Link
        to={to}
        className={`small z-auto cursor-pointer px-3 py-3 font-medium capitalize text-white dark:text-gray-200 ${active && "rounded-xl bg-zinc-900 dark:bg-zinc-950"} ${openDrawer ? "w-[88%]" : "w-full"}`}
      >
        {children}
      </Link>
    </>
  );
};

export default Menu;
