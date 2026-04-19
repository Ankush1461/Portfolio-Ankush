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
import Magnetic from "../components/Magnetic";
import NextImage from "next/image";

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
  <Magnetic strength={0.1}>
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
        className="glass-card"
        _hover={{
          bg: "whiteAlpha.300",
          _dark: { bg: "whiteAlpha.200" },
          transform: "translateY(-4px)",
        }}
        transition="all 0.3s ease"
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
  </Magnetic>
);

const Page = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <Container>
        {/* Set pointerEvents none to allow clicks through the transparent area of this header block */}
        <Box position="relative" mt={6} mb={10} pointerEvents="none">
          {/* Placeholder for absolutely positioned Global RetroComputer */}
          <Box h={{ base: "320px", sm: "400px", md: "520px" }} w="100%" />

          <Box
            position={{ base: "relative", md: "absolute" }}
            bottom={{ base: "auto", md: "-10px" }} 
            left={{ base: "auto", md: "50%" }}
            transform={{ base: "none", md: "translateX(-50%)" }}
            width={{ base: "100%", md: "95%" }}
            mt={{ base: -28, sm: -36, md: 0 }} 
            className="glass-card"
            p={6}
            zIndex={2}
            textAlign="left"
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
            gap={6}
            pointerEvents="none" /* Let mouse pass through the empty glass background padding */
          >
            <Box flex={1} pointerEvents="none">
              <Heading as="h2" size="2xl" variant="page-title" fontFamily="'M PLUS Rounded 1c', sans-serif" pointerEvents="auto">
                {t.home.title}
              </Heading>
              <Text mt={1} fontWeight="medium" color="gray.800" _dark={{ color: "gray.300" }} pointerEvents="auto">
                {t.home.subtitle}
              </Text>
              
              <Flex 
                mt={3} 
                gap={3} 
                fontSize="xs" 
                fontWeight="bold" 
                color="teal.500" 
                _dark={{ color: "teal.300" }}
                align="center"
              >
                <Text letterSpacing="widest" pointerEvents="auto">{t.home.role?.split('|')[0]?.trim() || "Tech Consultant"}</Text>
                <Box w="1px" h="12px" bg="gray.400" />
                <Text letterSpacing="widest" pointerEvents="auto">{t.home.role?.split('|')[1]?.trim() || "CRM Specialist"}</Text>
              </Flex>
            </Box>

            <Magnetic strength={0.3}>
               {/* Make the explicitly interactive image component catch the mouse */}
              <Box 
                flexShrink={0} 
                pointerEvents="auto"
                borderColor="whiteAlpha.800"
                borderWidth={3}
                borderStyle="solid"
                borderRadius="full"
                // Match the visual footprint precisely
                width="120px" 
                height="120px"
                overflow="hidden"
                boxShadow="0 10px 30px rgba(0,0,0,0.5)"
              >
                <NextImage
                  src="/images/ankushprofile.png"
                  alt="Profile Image"
                  width={480}
                  height={480}
                  quality={100}
                  priority
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </Box>
            </Magnetic>
          </Box>
        </Box>

        <Section delay={0.1} direction="left" id="about-section">
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.aboutTitle}
          </Heading>
          <Paragraph>
            {t.home.aboutText}
          </Paragraph>
          <Box textAlign="center" my={4}>
            <Magnetic strength={0.4}>
              <Link
                href="https://drive.google.com/file/d/1HAoCHkVoGiIDFJw0ag1WK8s9paTiyKOY/view?usp=sharing"
                target="_blank"
                _hover={{ textDecoration: "none" }}
                display="inline-block"
              >
                <Button colorPalette="teal" size="sm" borderRadius="full" px={6}>
                  {t.home.resumeBtn} <LuChevronRight />
                </Button>
              </Link>
            </Magnetic>
          </Box>
        </Section>

        <Separator my={12} opacity={0.3} />

        <Section delay={0.1} direction="right">
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.philosophyTitle}
          </Heading>
          <Paragraph>
            {t.home.philosophyText}
          </Paragraph>
        </Section>

        <Separator my={12} opacity={0.3} />

        <Section delay={0.2} direction="left">
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.workTitle}
          </Heading>
          <BioSection>
            <BioYear>Apr 2025–Oct 2025</BioYear>
            <BioContent>
              <Text as="span" fontWeight="semibold" color="gray.800" _dark={{ color: "white" }}>{t.home.pwcRole}</Text> — PricewaterhouseCoopers LLP (PwC), Kolkata
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mt={2} lineHeight="tall" whiteSpace="pre-line">
                {t.home.pwcDesc}
              </Text>
            </BioContent>
          </BioSection>


          <BioSection>
            <BioYear>Jul 2023–Apr 2025</BioYear>
            <BioContent>
              <Text as="span" fontWeight="semibold" color="gray.800" _dark={{ color: "white" }}>{t.home.eyRole}</Text> — Ernst and Young LLP (EY), Mumbai
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mt={2} lineHeight="tall" whiteSpace="pre-line">
                {t.home.eyDesc}
              </Text>
            </BioContent>
          </BioSection>
        </Section>

        <Separator my={12} opacity={0.3} />

        <Section delay={0.2} direction="right">
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

        <Section delay={0.3} direction="left">
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

        <Section delay={0.3} direction="right">
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

        <Section delay={0.3} direction="left">
          <Heading as="h3" fontSize={20} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px" mt={3} mb={4}>
            {t.home.hobbiesTitle}
          </Heading>
          <Paragraph>{t.home.hobbiesText}</Paragraph>
        </Section>

        <Separator my={12} opacity={0.3} />

        <Section delay={0.3} direction="right">
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
