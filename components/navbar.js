import Logo from "./logo";
import NextLink from "next/link";
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LuMenu } from "react-icons/lu";
import ThemeToggleButton from "./theme-toggle-button";
import LanguageToggleButton from "./language-toggle";
import { useLanguage } from "@/lib/i18n";
import { useState, useEffect } from "react";
import Magnetic from "./Magnetic.js";

const LinkItem = ({ href, path, children, target, ...props }) => {
  const active = path === href;
  return (
    <Magnetic strength={0.15}>
      <Link
        asChild
        p={2}
        bg={active ? "#88ccca" : "transparent"}
        color={active ? "#202023" : "gray.800"}
        _dark={{ color: active ? "#202023" : "whiteAlpha.900" }}
        borderRadius="md"
        fontSize="sm"
        fontWeight="medium"
        _hover={{ 
          textDecoration: "none", 
          bg: active ? "#88ccca" : "whiteAlpha.200",
          transform: "scale(1.05)",
        }}
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        target={target}
        {...props}
      >
        <NextLink href={href}>{children}</NextLink>
      </Link>
    </Magnetic>
  );
};

const Navbar = (props) => {
  const { path } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg="#ffffff40"
      _dark={{ bg: "#20202380" }}
      css={{ backdropFilter: "blur(18px)" }}
      borderBottom="1px"
      borderColor="whiteAlpha.500"
      dark={{ borderColor: "whiteAlpha.100" }}
      zIndex={10}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing="tighter">
            <Magnetic strength={0.2}>
              <Box>
                <Logo />
              </Box>
            </Magnetic>
          </Heading>
        </Flex>
        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
          gap={2}
        >
          <LinkItem href="/projects" path={path}>
            {t.nav.projects}
          </LinkItem>
          <LinkItem href="/contact" path={path}>
            {t.nav.contact}
          </LinkItem>
          <Link
            href="https://github.com/Ankush1461/Portfolio-Ankush"
            target="_blank"
            p={2}
            fontSize="sm"
            fontWeight="medium"
            _hover={{ textDecoration: "none" }}
          >
            {t.nav.source}
          </Link>
        </Stack>
        <Box flex={1} textAlign="right" display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
          <LanguageToggleButton />
          <ThemeToggleButton />
          <Box display={{ base: "inline-block", md: "none" }}>
            <IconButton
              aria-label="Options"
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <LuMenu />
            </IconButton>
          </Box>
        </Box>

        {/* Mobile menu */}
        {isMenuOpen && (
          <Box
            display={{ base: "block", md: "none" }}
            w="100%"
            mt={2}
            pb={2}
          >
            <Stack gap={1}>
              <Link asChild _hover={{ textDecoration: "none" }} onClick={() => setIsMenuOpen(false)}>
                <NextLink href="/">{t.nav.about}</NextLink>
              </Link>
              <Link asChild _hover={{ textDecoration: "none" }} onClick={() => setIsMenuOpen(false)}>
                <NextLink href="/projects">{t.nav.projects}</NextLink>
              </Link>
              <Link asChild _hover={{ textDecoration: "none" }} onClick={() => setIsMenuOpen(false)}>
                <NextLink href="/contact">{t.nav.contact}</NextLink>
              </Link>
              <Link
                href="https://github.com/Ankush1461/Portfolio-Ankush"
                target="_blank"
                _hover={{ textDecoration: "none" }}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.source}
              </Link>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
