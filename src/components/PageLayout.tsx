import { Box, BoxProps, Flex, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PageLayoutProps extends BoxProps {
  title: string;
  children?: ReactNode;
}

const PageLayout = ({ title, children, ...rest }: PageLayoutProps) => (
  <Box {...rest}>
    <Box
      paddingX={{ base: "8", md: "20" }}
      paddingTop="10"
      paddingBottom="32"
      bgColor="rgb(48, 172, 251)"
      marginBottom="20"
    >
      <Heading color="white" margin="0" fontSize="6xl">
        {title}
      </Heading>
    </Box>
    <Flex alignItems="center" flexDirection="column">
      {children}
    </Flex>
  </Box>
);

export default PageLayout;
