import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../navbar.js";

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8} position="relative" zIndex={1}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>Ankush Karmakar — Portfolio</title>
        <meta name="description" content="Ankush Karmakar's Professional Portfolio - Microsoft Certified Tech Consultant, Dynamics CRM Specialist, and Data Science Enthusiast." />
        <meta name="author" content="Ankush Karmakar" />
        <meta name="theme-color" content="#202023" />
        <link rel="apple-touch-icon" href="/images/footprint.png" />
        <link rel="shortcut icon" href="/images/footprint.png" type="image/x-icon" />
        <meta property="og:site_name" content="Ankush Karmakar" />
        <meta name="og:title" content="Ankush Karmakar" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/ankushprofile.jpeg" />
      </Head>
      <Navbar path={router.asPath} />
      <Container maxW="container.md" pt={14}>
        {children}
      </Container>
    </Box>
  );
};

export default Main;
