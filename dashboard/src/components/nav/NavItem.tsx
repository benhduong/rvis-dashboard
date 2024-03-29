import { Box, Flex, FlexProps, Icon, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  selected: boolean;
  pathname: string;
  icon: IconType;
  children: ReactNode;
}

const NavItem = ({
  selected,
  pathname,
  icon,
  children,
  ...rest
}: NavItemProps) => {
  return (
    <Flex {...rest}>
      <Box
        bgColor="rgb(48, 172, 251)"
        visibility={selected ? "visible" : "hidden"}
        roundedRight="xl"
        w="1.5"
        mr="4"
      >
        &nbsp;
      </Box>
      <Link to={pathname} style={{ textDecoration: "none" }} as={RouterLink}>
        <Flex>
          <Text
            fontSize="2xl"
            as="b"
            color={selected ? "gray.900" : "gray.500"}
            display="flex"
            alignItems="center"
          >
            <Icon mr="3" as={icon} />
            {children}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default NavItem;
