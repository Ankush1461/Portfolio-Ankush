import { Flex, Box } from "@chakra-ui/react";

export const BioSection = ({ children, ...props }) => (
  <Flex direction={{ base: "column", md: "row" }} gap={{ base: 0, md: 4 }} mb={10} {...props}>
    {children}
  </Flex>
);

export const BioYear = ({ children, ...props }) => (
  <Box flexShrink={0} fontWeight="bold" width={{ base: "auto", md: "160px" }} color="teal.500" {...props}>
    {children}
  </Box>
);

export const BioContent = ({ children, ...props }) => (
  <Box flex={1} {...props}>
    {children}
  </Box>
);
