import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { useTheme } from "next-themes";

import { Logo } from "./icons";
import { ThemeSwitch } from "./theme-switch";
function NoSidebar() {
  const { theme } = useTheme();

  return (
    <div>
      <Navbar className="w-full" position="sticky">
        <NavbarContent className="basis-1/2 sm:basis-full" justify="start">
          <NavbarBrand className="gap-3 max-w-fit">
            <Link
              className="flex items-center justify-start gap-1"
              color="foreground"
              href="/"
            >
              <Logo fill={theme == "dark" ? "white" : "black"} />
              <p className="font-bold text-inherit">PaymentX</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="basis-1/2 sm:basis-full" justify="end">
          <ThemeSwitch />
        </NavbarContent>
      </Navbar>
    </div>
  );
}

export default NoSidebar;
