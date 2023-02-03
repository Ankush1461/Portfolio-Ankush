import {
  Container,
  Button,
  Box,
  Heading,
  Image,
  List,
  ListItem,
  Link,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Layout from "../components/layouts/article";
import Section from "../components/section";
import Paragraph from "../components/paragraph";
import { BioSection, BioYear } from "../components/bio";

import {
  IoMail,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoGithub,
} from "react-icons/io5";
// Programming Languages Images
import ParticleBackground from "./../components/ParticleBackground";
import JavaImage from "./../public/images/programming/java.png";
import CImage from "./../public/images/programming/c.png";
import PythonImage from "./../public/images/programming/python.png";
import JavascriptImage from "./../public/images/programming/javascript.png";
// Technologies Images
import BootstrapImage from "./../public/images/technologies/bootstrap.png";
import ChakraUIImage from "./../public/images/technologies/chakra-ui.png";
import CSSImage from "./../public/images/technologies/css3.png";
import FirebaseImage from "./../public/images/technologies/firebase.png";
import HTMLImage from "./../public/images/technologies/html-5.png";
import NextJsImage from "./../public/images/technologies/nextjs.png";
import TailwindCSSImage from "./../public/images/technologies/tailwindcss.png";
import ReactImage from "./../public/images/technologies/react.png";

const Page = () => {
  return (
    <Layout>
      <ParticleBackground />
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
          p={3}
          mb={6}
          textAlign="center"
        >
          Hello, I&apos;m a Software Developer based in India
        </Box>
        <Box display={{ md: "flex" }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Ankush Karmakar
            </Heading>
            <p>Software Developer</p>
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
            About Me
          </Heading>
          <Paragraph>
            Ankush is an enthusiastic engineering fresher proficient in
            Front-end Web Development and creating progressive web apps. In
            possession of strong communication and leadership skills and capable
            of mastering new technologies quickly and efficiently.
          </Paragraph>
          <Box align="center" my={4}>
            {/* <NextLink href="/projects"> */}
            <a href="https://drive.google.com/file/d/1HAoCHkVoGiIDFJw0ag1WK8s9paTiyKOY/view?usp=sharing">
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                My Résumé
              </Button>
            </a>
            {/* </NextLink> */}
          </Box>
        </Section>
        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>2001</BioYear>
            Born in Jamshedpur, India.
            <br />
            Grew up in Kolkata, India.
          </BioSection>
          <br />
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
            Studying Btech(Hons) in Computer Science & Engineering from Narula
            Institute of Technology.
          </BioSection>
        </Section>
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Programming Languages
          </Heading>
          <Box display={{ base: "flex" }}>
            <Image
              pr={4}
              src={JavascriptImage}
              alt="Javascript Programming Language" h={"48px"}
            />

            <Image
              pr={4}
              src={PythonImage}
              alt="Python Programming Language" h={"48px"}
            />

            <Image
              pr={4}
              src={JavaImage}
              alt="Java Programming Language" h={"48px"}
            />

            <Image
              pr={4}
              src={CImage}
              alt="C Programming Language" h={"48px"}
            />
          </Box>
        </Section>
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Technologies
          </Heading>
          <Box display={{ base: "flex" }}>
            <Image
              pr={4}
              pb={4}
              src={HTMLImage}
              alt="HTML 5" h={"48px"}
            />

            <Image
              pr={4}
              pb={4}
              src={CSSImage}
              alt="CSS3" h={"48px"}
            />

            <Image
              pr={4}
              pb={4}
              src={ReactImage}
              alt="ReactJS" h={"48px"}
            />
            <Image
              pr={4}
              src={NextJsImage}
              alt="NextJS"
              h={"48px"}
            />
            <Image
              pr={4}
              src={ChakraUIImage}
              alt="Chakra UI"
              h={"48px"}
            />
          </Box>
          <Box display={{ base: "flex" }}>
            <Image
              pr={4}
              src={TailwindCSSImage}
              alt="Tailwind CSS"
              h={"48px"}
            />

            <Image
              pr={4}
              src={BootstrapImage}
              alt="Bootstrap" h={"48px"}
            />

            <Image
              pr={4}
              src={FirebaseImage}
              alt="Firebase" h={"48px"}
            />
          </Box>
        </Section>
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            I 🤍
          </Heading>
          <Paragraph>
            Machine Learning, Football, Athletics, Badminton
          </Paragraph>
        </Section>
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            On the web
          </Heading>
          <List>
            <ListItem>
              <Link
                href="https://www.linkedin.com/in/ankush-karmakar"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoLinkedin} />}
                >
                  @ankush-karmakar
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://github.com/Ankush1461" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoGithub} />}
                >
                  @Ankush1461
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="mailto:karmakarankush1461@gmail.com" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoMail} />}
                >
                  @karmakarankush1461@gmail.com
                </Button>
              </Link>
            </ListItem>

            <ListItem>
              <Link
                href="https://www.instagram.com/mysteriously_ecstatic_guy"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoInstagram} />}
                >
                  @mysteriously_ecstatic_guy
                </Button>
              </Link>
            </ListItem>
          </List>
        </Section>
      </Container>
    </Layout>
  );
};

export default Page;
