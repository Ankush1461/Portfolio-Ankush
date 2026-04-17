import {
  Container,
  Button,
  Box,
  Heading,
  Image as Img,
  Link,
  Icon,
  Text,
  Badge,
  SimpleGrid,
  Flex,
  Separator,
  Stack,
  ListRoot,
  ListItem,
} from "@chakra-ui/react";
import { LuChevronRight, LuExternalLink, LuAward } from "react-icons/lu";
import Layout from "../components/layouts/article";
import Section from "../components/section";
import Paragraph from "../components/paragraph";
import { BioSection, BioYear, BioContent } from "../components/bio";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useLanguage } from "@/lib/i18n";

import {
  IoMail,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoGithub,
} from "react-icons/io5";

const SkillBadge = ({ children }) => (
  <Badge
    colorPalette="teal"
    variant="subtle"
    px={3}
    py={1}
    borderRadius="full"
    fontSize="xs"
    fontWeight="medium"
  >
    {children}
  </Badge>
);

const CertCard = ({ title, date, link }) => (
  <Link
    href={link}
    target="_blank"
    _hover={{ textDecoration: "none" }}
    h="full"
    display="block"
  >
    <Box
      p={3}
      h="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      borderRadius="lg"
      bg="whiteAlpha.500"
      _dark={{ 
        bg: "whiteAlpha.100",
        borderColor: "whiteAlpha.50"
      }}
      _hover={{
        bg: "whiteAlpha.700",
        _dark: { 
          bg: "whiteAlpha.200",
          borderColor: "whiteAlpha.300"
        },
        transform: "translateY(-4px)",
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
      }}
      borderWidth="1px"
      borderColor="transparent"
      transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
      cursor="pointer"
    >
      <Flex alignItems="flex-start" gap={3}>
        <Icon color="teal.500" mt={1}>
          <LuAward size={20} />
        </Icon>
        <Box flex={1}>
          <Text fontSize="sm" fontWeight="bold" lineHeight="tight" mb={1}>
            {title}
          </Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.400" }} fontWeight="medium">
              {date}
            </Text>
            <Icon color="teal.500" boxSize={3.5}>
              <LuExternalLink />
            </Icon>
          </Flex>
        </Box>
      </Flex>
    </Box>
  </Link>
);

const Page = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <Container>
        <Box
          borderRadius="xl"
          bg="whiteAlpha.500"
          _dark={{ 
            bg: "whiteAlpha.100",
            borderColor: "whiteAlpha.200"
          }}
          backdropFilter="blur(10px)"
          borderWidth="1px"
          borderColor="whiteAlpha.300"
          p={4}
          mb={8}
          textAlign="center"
          fontSize={{ base: "sm", md: "sm" }}
          fontWeight="semibold"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={{ base: 1, md: 3 }}
        >
          <Text as="span">{t.home.role.split('|')[0].trim()}</Text>
          <Box display={{ base: "none", md: "block" }} w="1px" h="14px" bg="gray.400" />
          <Text as="span" color="teal.500" _dark={{ color: "teal.300" }}>{t.home.role.split('|')[1].trim()}</Text>
        </Box>
        <Box display={{ md: "flex" }}>
          <Box flexGrow={1}>
            <Heading as="h2" size="2xl" fontFamily="'M PLUS Rounded 1c', sans-serif">
              {t.home.title}
            </Heading>
            <Text mt={1}>{t.home.subtitle}</Text>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Img
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="images/ankushprofile.jpeg"
              alt="Profile Image"
            />
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.aboutTitle}
          </Heading>
          <Paragraph>
            {t.home.aboutText}
          </Paragraph>
          <Box textAlign="center" my={4}>
            <Link
              href="https://drive.google.com/file/d/1HAoCHkVoGiIDFJw0ag1WK8s9paTiyKOY/view?usp=sharing"
              target="_blank"
              _hover={{ textDecoration: "none" }}
            >
              <Button colorPalette="teal" size="sm" borderRadius="full" px={6}>
                {t.home.resumeBtn} <LuChevronRight />
              </Button>
            </Link>
          </Box>
        </Section>

        <Separator my={12} opacity={0.3} />

        <Section delay={0.1}>
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.philosophyTitle}
          </Heading>
          <Paragraph>
            {t.home.philosophyText}
          </Paragraph>
        </Section>

        <Separator my={12} opacity={0.3} />

        <Section delay={0.2}>
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.workTitle}
          </Heading>
          <BioSection>
            <BioYear>Apr 2025–Oct 2025</BioYear>
            <BioContent>
              <Text as="span" fontWeight="semibold" color="gray.800" _dark={{ color: "white" }}>{t.home.pwcRole}</Text> — PricewaterhouseCoopers LLP (PwC), Kolkata
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mt={2} lineHeight="tall">
                {t.home.pwcDesc}
              </Text>
            </BioContent>
          </BioSection>


          <BioSection>
            <BioYear>Jul 2023–Apr 2025</BioYear>
            <BioContent>
              <Text as="span" fontWeight="semibold" color="gray.800" _dark={{ color: "white" }}>{t.home.eyRole}</Text> — Ernst and Young LLP (EY), Mumbai
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mt={2} lineHeight="tall">
                {t.home.eyDesc}
              </Text>
            </BioContent>
          </BioSection>
        </Section>

        <Separator my={12} opacity={0.3} />

        <Section delay={0.2}>
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.eduTitle}
          </Heading>
          <BioSection>
            <BioYear>2019 – 2023</BioYear>
            <BioContent>
              <Text as="span" fontWeight="semibold">{t.home.eduBtech}</Text> — Narula Institute of Technology, Kolkata
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mt={1} whiteSpace="pre-line">
                {t.home.eduBtechDesc}
              </Text>
            </BioContent>
          </BioSection>
          <BioSection>
            <BioYear>2017 – 2019</BioYear>
            <BioContent>
              <Text as="span" fontWeight="semibold">{t.home.eduHs}</Text> — Jodhpur Park Boys&apos; School, Kolkata
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mt={1} whiteSpace="pre-line">
                {t.home.eduHsDesc}
              </Text>
            </BioContent>
          </BioSection>
          <BioSection>
            <BioYear>2011 – 2017</BioYear>
            <BioContent>
              <Text as="span" fontWeight="semibold">{t.home.eduSec}</Text> — Andrew&apos;s High (HS) School, Kolkata
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mt={1} whiteSpace="pre-line">
                {t.home.eduSecDesc}
              </Text>
            </BioContent>
          </BioSection>
        </Section>

        <Separator my={12} opacity={0.3} />

        <Section delay={0.3}>
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.skillsTitle}
          </Heading>
          <Stack gap={6}>
            <Box>
              <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color="teal.500" mb={3}>
                {t.home.skillCats.dev}
              </Text>
              <Flex flexWrap="wrap" gap={2}>
                <SkillBadge>Python</SkillBadge>
                <SkillBadge>C#</SkillBadge>
                <SkillBadge>JavaScript</SkillBadge>
                <SkillBadge>.NET</SkillBadge>
                <SkillBadge>React</SkillBadge>
                <SkillBadge>Next.js</SkillBadge>
                <SkillBadge>FastAPI</SkillBadge>
              </Flex>
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color="teal.500" mb={3}>
                {t.home.skillCats.cloud}
              </Text>
              <Flex flexWrap="wrap" gap={2}>
                <SkillBadge>Microsoft Azure</SkillBadge>
                <SkillBadge>D365 CRM</SkillBadge>
                <SkillBadge>Power Automate</SkillBadge>
                <SkillBadge>Docker</SkillBadge>
                <SkillBadge>Cloud Migrations</SkillBadge>
              </Flex>
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color="teal.500" mb={3}>
                {t.home.skillCats.data}
              </Text>
              <Flex flexWrap="wrap" gap={2}>
                <SkillBadge>SQL</SkillBadge>
                <SkillBadge>Machine Learning</SkillBadge>
                <SkillBadge>DBMS</SkillBadge>
                <SkillBadge>Data Engineering</SkillBadge>
              </Flex>
            </Box>
          </Stack>
        </Section>

        <Separator my={12} opacity={0.3} />

        <Section delay={0.3}>
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.certTitle}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
            <CertCard
              title="Azure AI Fundamentals"
              date="Feb 2025"
              link="https://learn.microsoft.com/api/credentials/share/en-us/AnkushKarmakar-8857/1905535236501260?sharingId=8658FAC4C1E86102"
            />
            <CertCard
              title="Azure Data Fundamentals"
              date="Dec 2024"
              link="https://learn.microsoft.com/api/credentials/share/en-us/AnkushKarmakar-8857/5DFCEFE95A42440B?sharingId=8658FAC4C1E86102"
            />
            <CertCard
              title="Azure Fundamentals"
              date="Aug 2024"
              link="https://learn.microsoft.com/api/credentials/share/en-us/AnkushKarmakar-8857/B629421A16CC1F61?sharingId=8658FAC4C1E86102"
            />
            <CertCard
              title="Power Platform Fundamentals"
              date="Nov 2023"
              link="https://learn.microsoft.com/api/credentials/share/en-us/AnkushKarmakar-8857/FB95AC8EBA9E8026?sharingId=8658FAC4C1E86102"
            />
            <CertCard
              title="Dynamics 365 Fundamentals (CRM)"
              date="Sep 2023"
              link="https://learn.microsoft.com/api/credentials/share/en-us/AnkushKarmakar-8857/6A44692AEBE7559?sharingId=8658FAC4C1E86102"
            />
          </SimpleGrid>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.hobbiesTitle}
          </Heading>
          <Paragraph>{t.home.hobbiesText}</Paragraph>
        </Section>

        <Separator my={12} opacity={0.3} />

        <Section delay={0.3}>
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.webTitle}
          </Heading>
          <ListRoot listStyle="none" p={0}>
            <ListItem>
              <Link
                href="https://www.linkedin.com/in/ankush-karmakar"
                target="_blank"
                _hover={{ textDecoration: "none" }}
              >
                <Button variant="ghost" colorPalette="teal" size="sm">
                  <IoLogoLinkedin /> @ankush-karmakar
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://github.com/Ankush1461" target="_blank" _hover={{ textDecoration: "none" }}>
                <Button variant="ghost" colorPalette="teal" size="sm">
                  <IoLogoGithub /> @Ankush1461
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="mailto:karmakarankush1461@gmail.com" target="_blank" _hover={{ textDecoration: "none" }}>
                <Button variant="ghost" colorPalette="teal" size="sm">
                  <IoMail /> karmakarankush1461@gmail.com
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.instagram.com/mysteriously_ecstatic_guy"
                target="_blank"
                _hover={{ textDecoration: "none" }}
              >
                <Button variant="ghost" colorPalette="teal" size="sm">
                  <IoLogoInstagram /> @mysteriously_ecstatic_guy
                </Button>
              </Link>
            </ListItem>
          </ListRoot>
        </Section>
      </Container>
    </Layout>
  );
};

export default Page;
