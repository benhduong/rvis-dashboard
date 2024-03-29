import { Box } from "@chakra-ui/react";
import Logo from "../../components/ui/Logo";

const Home = () => {
  return (
    <Box
      paddingTop="32"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Logo
        mb="3"
        headingFontSize="6xl"
        captionFontSize="2xl"
        longTitle={true}
      />
    </Box>
  );
};

export default Home;
