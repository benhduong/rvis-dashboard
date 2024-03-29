import { Box, BoxProps, Heading, Text, Icon } from "@chakra-ui/react";
import { PiPaintBrushFill } from "react-icons/pi";

interface LogoProps extends BoxProps {
  headingFontSize?: string;
  captionFontSize?: string;
  longTitle?: boolean;
}

const Logo = ({
  headingFontSize,
  captionFontSize,
  longTitle,
  ...rest
}: LogoProps) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    {...rest}
  >
    <Heading
      display="flex"
      fontSize={headingFontSize ? headingFontSize : "4xl"}
      color="gray.900"
      margin="0"
      alignItems="center"
    >
      <Icon mr="1" color="rgb(48, 172, 251)" as={PiPaintBrushFill} />
      {longTitle ? "Rapid Visual Categorization" : "RVIS"}
    </Heading>
    <Text fontSize={captionFontSize} margin="0" color="gray.900">
      by <Text as="b">SERRE LAB</Text>
    </Text>
  </Box>
);

export default Logo;
