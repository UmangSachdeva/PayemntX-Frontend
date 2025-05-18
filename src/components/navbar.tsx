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
import { useGetUserDetails } from "@/api/queries/auth";

type NavbarType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

export const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarType) => {
  const nav = useNavigate();
  const { data: user } = useGetUserDetails();

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
              name={user?.name}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="gap-2 h-14">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>

            <DropdownItem key="logout" color="danger" onPress={onLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroUINavbar>
  );
};
