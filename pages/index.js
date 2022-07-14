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
import ParticleBackground from "./../components/ParticleBackground";

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
            About Me
          </Heading>
          <Paragraph>
            Ankush is an enthusiastic engineering fresher proficient in
            Front-end Web Development and creating progressive web apps. In
            possession of strong communication and leadership skills and capable
            of mastering new technologies.
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
              src="https://img.icons8.com/color/48/000000/javascript--v1.png"
              alt="Javascript Programming Language"
            />

            <Image
              pr={4}
              src="https://img.icons8.com/color/48/000000/python--v1.png"
              alt="Python Programming Language"
            />

            <Image
              pr={4}
              src="https://img.icons8.com/color/48/000000/java.png"
              alt="Java Programming Language"
            />

            <Image
              pr={4}
              src="https://img.icons8.com/color/48/000000/c-programming.png"
              alt="C Programming Language"
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
              src="https://img.icons8.com/color/48/000000/html-5--v1.png"
              alt="HTML 5"
            />

            <Image
              pr={4}
              pb={4}
              src="https://img.icons8.com/color/48/000000/css3.png"
              alt="CSS3"
            />

            <Image
              pr={4}
              pb={4}
              src="https://img.icons8.com/office/48/000000/react.png"
              alt="ReactJS"
            />
            <Image
              pr={4}
              src="https://camo.githubusercontent.com/92ec9eb7eeab7db4f5919e3205918918c42e6772562afb4112a2909c1aaaa875/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313630373535343338352f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6c6f676f2e706e67"
              alt="NextJS"
              h={"48px"}
            />
            <Image
              pr={4}
              src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/b983e4ceb7c1e794c2b901ce16f12016836d40d6/logo/logomark-colored.svg"
              alt="Chakra UI"
              h={"48px"}
            />
          </Box>
          <Box display={{ base: "flex" }}>
            <Image
              pr={4}
              src="https://github.com/tailwindlabs/tailwindcss/raw/master/.github/logo-dark.svg"
              alt="Tailwind CSS"
              h={"20px"}
            />

            <Image
              pr={4}
              src="https://img.icons8.com/color/48/000000/bootstrap.png"
              alt="Bootstrap"
            />

            <Image
              pr={4}
              src="https://img.icons8.com/color/48/000000/firebase.png"
              alt="Firebase"
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
