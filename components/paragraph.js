import { Box } from "@chakra-ui/react";

const Paragraph = ({ children, ...props }) => (
  <Box as="p" textAlign="left" lineHeight="tall" mb={6} {...props}>
    {children}
  </Box>
);

export default Paragraph;