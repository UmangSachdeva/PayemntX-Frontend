import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/navbar";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

type NavbarType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

export const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarType) => {
  const nav = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("authToken");
    nav("/");
  };

  return (
    <HeroUINavbar className="h-fit" isBordered={true} maxWidth="full">
      <NavbarBrand>
        <button
          title="Toggle Sidebar"
          className="p-2 rounded-lg hover:bg-default-100"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Icon icon="lucide:menu" className="text-xl" />
        </button>
        <p className="font-bold text-inherit">Payment X</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              name="John Doe"
              src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="gap-2 h-14">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">john.doe@example.com</p>
            </DropdownItem>

            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={onLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroUINavbar>
  );
};
