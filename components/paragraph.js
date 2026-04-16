import { Box } from "@chakra-ui/react";

const Paragraph = ({ children, ...props }) => (
  <Box as="p" textAlign="justify" textIndent="1em" {...props}>
    {children}
  </Box>
);

export default Paragraph;