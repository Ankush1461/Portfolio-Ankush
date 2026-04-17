import Link from "next/link";
import Image from "next/image";
import { Text, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useEffect, useState } from "react";

const Logo = () => {
  const [mounted, setMounted] = useState(false);
  const footPrintImg = `/images/footprint${useColorModeValue("", "-dark")}.png`;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/">
      <Box
        as="span"
        fontWeight="bold"
        fontSize="18px"
        display="inline-flex"
        alignItems="center"
        height="30px"
        lineHeight="20px"
        padding="10px"
        css={{
          "& img": {
            transition: "200ms ease",
          },
          "&:hover img": {
            transform: "rotate(20deg)",
          },
        }}
      >
        {mounted && (
          <Image src={footPrintImg} width={20} height={20} alt="logo" />
        )}
        <Text
          color="gray.800"
          _dark={{ color: "whiteAlpha.900" }}
          fontFamily="'M PLUS Rounded 1c', sans-serif"
          fontWeight="bold"
          ml={3}
        >
          Ankush Karmakar
        </Text>
      </Box>
    </Link>
  );
};

export default Logo;
