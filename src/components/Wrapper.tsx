import { Box } from "@chakra-ui/react";
import Navbar from "./nav/Navbar";
import { Outlet } from "react-router-dom";

const Wrapper = () => (
  <Box minH="100vh" minW="100vw" bg="gray.100" display="flex">
    <Navbar />
    <Box
      w="100%"
      paddingLeft={{ base: "0", md: "80" }}
      paddingTop={{ base: "20", md: "0" }}
    >
      <Outlet />
    </Box>
  </Box>
);

export default Wrapper;
