import Icon from "@/components/ui/commons/Icon";
import Avatar from "@/components/ui/displays/Avatar";
import Tag from "@/components/ui/displays/Tag";
import Dropdown from "@/components/ui/navigations/Dropdown";
import DarkModeUtil from "@/utils/configs/displays/DarkModeUtil";
import DateUtil from "@/utils/configs/displays/DateUtil";
import FullScreenUtil from "@/utils/configs/displays/FullScreenUtil";
import TitlePageUtil from "@/utils/configs/displays/TitlePageUtil";
import {
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuSun,
  LuMoon,
  LuMaximize2,
  LuMaximize,
  LuList,
  LuLogOut,
} from "react-icons/lu";
import { Link } from "react-router-dom";

const NavbarNav = ({ openDrawer, handleOpenDrawer }) => {
  const { title } = TitlePageUtil();
  const { dateType, dateText } = DateUtil();
  const { dark, handleChangeDarkMode } = DarkModeUtil();
  const { fullScreen, handleChangeFullScreen } = FullScreenUtil();

  return (
    <>
      <header>
        <nav className="flex items-center justify-between rounded-xl bg-white p-2 ring-1 ring-gray-200 dark:bg-zinc-900 dark:ring-zinc-700">
          <div className="flex items-center">
            <button
              type="button"
              className="inline rounded-xl bg-gray-100 p-3 dark:bg-zinc-700 md:hidden"
              onClick={handleOpenDrawer}
            >
              {openDrawer ? (
                <Icon name={LuPanelLeftClose} size={20} />
              ) : (
                <Icon name={LuPanelLeftOpen} size={20} />
              )}
            </button>

            <Tag
              type={dateType}
              className="hidden rounded-lg dark:bg-zinc-700 md:inline"
              children={dateText}
            />
          </div>

          <p className="inline font-semibold dark:text-white md:hidden">
            {title}
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="hidden rounded-xl bg-gray-100 p-3 dark:bg-zinc-700 md:inline"
              onClick={handleChangeDarkMode}
            >
              {dark ? (
                <Icon name={LuSun} className="dark:text-yellow-300" />
              ) : (
                <Icon name={LuMoon} />
              )}
            </button>

            <button
              type="button"
              className="hidden rounded-xl bg-gray-100 p-3 dark:bg-zinc-700 md:inline"
              onClick={handleChangeFullScreen}
            >
              {fullScreen ? (
                <Icon name={LuMaximize2} />
              ) : (
                <Icon name={LuMaximize} />
              )}
            </button>

            <Dropdown
              dropdownName="profile"
              dropdownTitle={
                <>
                  <div className="ms-4 flex items-center gap-1">
                    <div className="hidden md:inline">
                      <div className="small">Muhibah</div>
                      <div className="extra-small">Super Admin</div>
                    </div>

                    <Avatar />
                  </div>
                </>
              }
              dropdownToggle={false}
            >
              <Link
                className="flex items-center gap-2 pb-2 md:hidden"
                onClick={handleChangeDarkMode}
              >
                <Icon name={dark ? LuSun : LuMoon} />
                <div className="small">{dark ? "Light" : "Dark"}</div>
              </Link>

              <Link className="flex items-center gap-2 pb-2" to={`/`}>
                <Icon name={LuList} />
                <div className="small">Edit Profile</div>
              </Link>

              <Link className="flex items-center gap-2">
                <Icon name={LuLogOut} />
                <div className="small">Logout</div>
              </Link>
            </Dropdown>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavbarNav;
