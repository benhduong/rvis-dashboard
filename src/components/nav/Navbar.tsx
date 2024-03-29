import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  Hide,
} from "@chakra-ui/react";
import MobileNav from "./MobileNav";
import NavContent from "./NavContent";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <Box
        bg="white"
        shadow="lg"
        w="80"
        h="full"
        pos="fixed"
        display={{ base: "none", md: "block" }}
      >
        <NavContent />
      </Box>

      <Hide above="md">
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <NavContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
      </Hide>
      <MobileNav onOpen={onOpen} display={{ base: "flex", md: "none" }} />
    </Box>
  );
};

export default Navbar;
