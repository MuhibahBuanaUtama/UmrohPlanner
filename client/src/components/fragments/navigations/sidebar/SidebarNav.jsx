import Menu, {
  MenuItem,
  MenuItemDropdown,
} from "@/components/ui/navigations/Menu";
import DropdownUtil from "@/utils/configs/navigations/DropdownUtil";
import { RiHomeSmile2Line } from "react-icons/ri";
import { LuHotel, LuPlaneTakeoff, LuCalculator } from "react-icons/lu";
import { LiaCcVisa } from "react-icons/lia";
import { GrAggregate } from "react-icons/gr";
import { PiGear } from "react-icons/pi";

const SidebarNav = ({ openDrawer }) => {
  const { active } = DropdownUtil();

  return (
    <>
      <div className="border-b-[1px] border-zinc-900 pb-4 dark:border-gray-600">
        {openDrawer && <span className="extra-small text-white">Main</span>}
        <Menu>
          <MenuItem
            openDrawer={openDrawer}
            icon={RiHomeSmile2Line}
            children="Dashboard"
            active={active === "dashboard-admin"}
            to="/"
          />
        </Menu>
      </div>

      <div className="border-b-[1px] border-zinc-900 py-4 dark:border-gray-600">
        {openDrawer && <span className="extra-small text-white">Menu</span>}
        <Menu>
          <MenuItem
            openDrawer={openDrawer}
            icon={LuHotel}
            collapsable
            dropdownName="hotel"
            dropdownTitle="Hotel"
            active={
              (active === "hotel") |
              (active === "hotel-new") |
              (active === "hotel-edit")
            }
          >
            <MenuItemDropdown
              to="/hotel"
              active={active === "hotel"}
              children="Daftar Hotel"
            />
            <MenuItemDropdown
              to="/hotel-new"
              active={active === "hotel-new"}
              children="Tambah Hotel"
            />
          </MenuItem>
        </Menu>

        <Menu>
          <MenuItem
            openDrawer={openDrawer}
            icon={LiaCcVisa}
            collapsable
            dropdownName="visa"
            dropdownTitle="Visa"
            active={
              (active === "visa") |
              (active === "visa-new") |
              (active === "visa-edit")
            }
          >
            <MenuItemDropdown
              to="/visa"
              active={active === "visa"}
              children="Daftar Visa"
            />
            <MenuItemDropdown
              to="/visa-new"
              active={active === "visa-new"}
              children="Tambah Visa"
            />
          </MenuItem>
        </Menu>

        <Menu>
          <MenuItem
            openDrawer={openDrawer}
            icon={GrAggregate}
            collapsable
            dropdownName="la"
            dropdownTitle="LA"
            active={
              (active === "la") | (active === "la-new") | (active === "la-edit")
            }
          >
            <MenuItemDropdown
              to="/la"
              active={active === "la"}
              children="Daftar LA"
            />
            <MenuItemDropdown
              to="/la-new"
              active={active === "la-new"}
              children="Tambah LA"
            />
          </MenuItem>
        </Menu>

        <Menu>
          <MenuItem
            openDrawer={openDrawer}
            icon={LuPlaneTakeoff}
            collapsable
            dropdownName="airline"
            dropdownTitle="Pesawat"
            active={
              (active === "airline") |
              (active === "airline-new") |
              (active === "airline-edit")
            }
          >
            <MenuItemDropdown
              to="/airline"
              active={active === "airline"}
              children="Daftar Pesawat"
            />
            <MenuItemDropdown
              to="/airline-new"
              active={active === "airline-new"}
              children="Tambah Pesawat"
            />
          </MenuItem>
        </Menu>

        <Menu>
          <MenuItem
            openDrawer={openDrawer}
            icon={LuCalculator}
            children="Hitung"
            active={active === "calculate"}
            to="/calculate"
          />
        </Menu>
      </div>

      <div className="py-4">
        {openDrawer && (
          <span className="extra-small text-white">Pengaturan</span>
        )}
        <Menu>
          <MenuItem
            openDrawer={openDrawer}
            icon={PiGear}
            collapsable
            dropdownName="setting"
            dropdownTitle="Pengaturan"
            active={
              (active === "setting") |
              (active === "setting-new") |
              (active === "setting-edit")
            }
          >
            <MenuItemDropdown
              to="/setting"
              active={active === "setting"}
              children="Daftar Pengaturan"
            />
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default SidebarNav;
