import { Flex, FlexProps, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import Logo from "../ui/Logo";

interface MobileNavProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileNavProps) => {
  return (
    <Flex
      flexDirection="row"
      bgColor="white"
      pos="fixed"
      h="20"
      minW="full"
      paddingY="3"
      justifyContent="space-between"
      alignItems="center"
      zIndex="100"
      shadow="md"
      {...rest}
    >
      <Logo headingFontSize="xl" captionFontSize="sm" ml="5" />
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
        mr="5"
      />
    </Flex>
  );
};

export default MobileNav;
