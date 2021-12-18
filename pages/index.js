import NextLink from "next/link";
import {
  Container,
  Button,
  Box,
  Heading,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Section from "../components/section";
import Paragraph from "../components/paragraph";
import { BioSection, BioYear } from "../components/bio";
import ParticleBackground from './../components/ParticleBackground';

const Page = () => {
  return (
    <Container>
      <ParticleBackground/>
      <Box
        borderRadius="lg"
        bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
        p={3}
        mb={6}
        textAlign="center"
      >
        Hello, I&apos;m a front-end Developer based in India
      </Box>
      <Box display={{ md: "flex" }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Ankush Karmakar
          </Heading>
          <p>Front-end Developer</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Image
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            maxWidth="100px"
            display="inline-block"
            borderRadius="full"
            src="images/ankushprofile.png"
            alt="Profile Image"
          />
        </Box>
      </Box>
      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          Ankush is an enthusiastic engineering fresher proficient in Front-end
          Web Development and creating progressive web apps. In possession of
          strong communication and leadership skills and capable of mastering
          new technologies.
        </Paragraph>
        <Box align="center" my={4}>
          <NextLink href="/works">
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              My Portfolio
            </Button>
          </NextLink>
        </Box>
      </Section>
      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>2001</BioYear>
          Born in Jamshedpur, India.<br/>
          Grew up in Kolkata, India.
        </BioSection>
        <br/>
        <BioSection>
          <BioYear>2017</BioYear>
          Passed Secondary (X) from Andrew&apos;s High School
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Passed Higher Secondary (XII) from Jodhpur Park Boys School
        </BioSection>
        <BioSection>
          <BioYear>2019-Present</BioYear>
          Studying Btech(Hons) in Computer Science & Engineering from Narula Institute of Technology.
        </BioSection>
      </Section>
      <Section>
        <Heading as="h3" variant="section-title">I ❤️</Heading>
        <Paragraph>
          Machine Learning, Football, Athletics, Badminton
        </Paragraph>
      </Section>
    </Container>
  );
};

export default Page;
