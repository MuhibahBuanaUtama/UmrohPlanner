import { Link } from "react-router-dom";
import Icon from "@/components/ui/commons/Icon";
import LogoPrimary from "@/assets/img/logo-primary.png";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";

const SidebarBrand = ({ openDrawer, handleOpenDrawer }) => {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        {openDrawer && (
          <Link to="/" className="flex cursor-pointer items-center gap-2">
            <img
              className="size-8 rounded-full"
              src={LogoPrimary}
              alt="logo-primary"
            />
            <span className="text-[13px] font-medium leading-[12px] text-white">
              Umrah <br></br> Planner <span className="text-red-500">.</span>
            </span>
          </Link>
        )}

        <button
          type="button"
          className={`rounded-full ${!openDrawer && "mx-auto p-3"}`}
          onClick={handleOpenDrawer}
        >
          {openDrawer ? (
            <Icon className="text-white" name={LuPanelLeftClose} size={20} />
          ) : (
            <Icon className="text-white" name={LuPanelLeftOpen} size={20} />
          )}
        </button>
      </div>
    </>
  );
};

export default SidebarBrand;
