import { Box, Text, Container } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" py={6} borderTop="1px solid rgba(255,255,255,0.05)">
      <Container maxW="container.md">
        <Box 
          display="flex" 
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Text 
            opacity={0.3} 
            fontSize="xs" 
            fontFamily="var(--font-jetbrains), monospace"
            letterSpacing="0.5px"
            textTransform="uppercase"
          >
            &copy; 2026 Ankush Karmakar
          </Text>
          
          <Text 
            opacity={0.2} 
            fontSize="10px" 
            fontFamily="var(--font-jetbrains), monospace"
            display="flex" 
            alignItems="center"
          >
            Developed for Impact.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

