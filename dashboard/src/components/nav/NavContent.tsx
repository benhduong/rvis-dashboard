import { Flex, IconButton, Stack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { PiHouseBold, PiUserBold, PiXBold } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import NavItem from "./NavItem";

interface Item {
  label: string;
  pathname: string;
  icon: IconType;
}

const items: Item[] = [
  { label: "Home", pathname: "/", icon: PiHouseBold },
  { label: "Users", pathname: "/users", icon: PiUserBold },
];

interface NavContentProps {
  onClose?: () => void;
}

const NavContent = ({ onClose }: NavContentProps) => {
  const location = useLocation();
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: "12", md: "20" }}
      >
        <Logo mt={{ base: "3", md: "10" }} ml="5" />
        <IconButton
          variant="outline"
          onClick={onClose}
          aria-label="open menu"
          icon={<PiXBold />}
          mr="5"
          display={{ base: "block", md: "none" }}
        />
      </Flex>

      <Stack spacing="10">
        {items.map((item: Item, key: number) => (
          <NavItem
            key={key}
            selected={location.pathname === item.pathname}
            pathname={item.pathname}
            icon={item.icon}
          >
            {item.label}
          </NavItem>
        ))}
      </Stack>
    </>
  );
};

export default NavContent;
