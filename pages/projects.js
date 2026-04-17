import {
  Container,
  Heading,
  SimpleGrid,
  Link,
  Box,
  Text,
  Badge,
  Flex,
} from "@chakra-ui/react";
import Section from "../components/section";
import Layout from "../components/layouts/article";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useLanguage } from "@/lib/i18n";
import { IoLogoGithub, IoCheckmarkCircleOutline } from "react-icons/io5";
import { LuExternalLink, LuZap } from "react-icons/lu";
import { ListRoot, ListItem } from "@chakra-ui/react";

const TechBadge = ({ children }) => (
  <Badge
    colorPalette="teal"
    variant="outline"
    fontSize="2xs"
    px={2}
    py={0.5}
    borderRadius="full"
  >
    {children}
  </Badge>
);

const ProjectCard = ({ title, description, techStack, highlights, challenges, githubLink, websiteLink }) => {
  const { t } = useLanguage();
  
  return (
    <Box
      p={6}
      borderRadius="2xl"
      bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.100")}
      _hover={{
        bg: useColorModeValue("whiteAlpha.700", "whiteAlpha.200"),
        transform: "translateY(-8px) scale(1.02)",
        boxShadow: useColorModeValue(
          "0 12px 24px rgba(0,0,0,0.12)", 
          "0 0 20px rgba(136, 204, 202, 0.25)"
        ),
        borderColor: "teal.500",
      }}
      transition="all 0.4s cubic-bezier(.17,.67,.83,.67)"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}
      position="relative"
      overflow="hidden"
    >
      <Heading as="h4" fontSize="xl" mb={3} fontFamily="'M PLUS Rounded 1c', sans-serif" color="teal.500">
        {title}
      </Heading>
      
      <Text fontSize="sm" mb={4} color={useColorModeValue("gray.700", "gray.300")} fontWeight="medium" fontStyle="italic">
        {description}
      </Text>

      <Box mb={6}>
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color="gray.500" mb={3} display="flex" alignItems="center" gap={2}>
          <IoCheckmarkCircleOutline /> {t.projects.highlightsTitle}
        </Text>
        <ListRoot gap={1} variant="plain">
          {highlights?.map((point, i) => (
            <ListItem key={i} fontSize="xs" color={useColorModeValue("gray.600", "gray.400")} display="flex" alignItems="center" gap={2}>
              <Box boxSize={1} borderRadius="full" bg="teal.500" /> {point}
            </ListItem>
          ))}
        </ListRoot>
      </Box>

      <Box mb={6} p={3} borderRadius="md" bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")} borderLeft="4px solid" borderColor="orange.400">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color="orange.400" mb={1} display="flex" alignItems="center" gap={2}>
          <LuZap size={14} /> {t.projects.challengesTitle}
        </Text>
        <Text fontSize="xs" color={useColorModeValue("gray.600", "gray.400")}>
          {challenges}
        </Text>
      </Box>

      <Flex flexWrap="wrap" gap={1.5} mb={6}>
        {techStack.map((tech) => (
          <TechBadge key={tech}>{tech}</TechBadge>
        ))}
      </Flex>

      <Flex gap={4}>
        <Link href={githubLink} target="_blank" _hover={{ textDecoration: "none" }}>
          <Flex alignItems="center" gap={1.5} color="teal.500" fontSize="sm" fontWeight="bold">
            <IoLogoGithub />
            <Text>{t.projects.sourceBtn}</Text>
          </Flex>
        </Link>
        {websiteLink && (
          <Link href={websiteLink} target="_blank" _hover={{ textDecoration: "none" }}>
            <Flex alignItems="center" gap={1.5} color="teal.500" fontSize="sm" fontWeight="bold">
              <Text>{t.projects.demoBtn}</Text>
              <LuExternalLink size={14} />
            </Flex>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

const Projects = () => {
  const { t } = useLanguage();

  return (
    <Layout title={t.projects.title}>
      <Container>
        <Heading as="h3" fontSize={20} mb={10} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px">
          {t.projects.title}
        </Heading>
        <SimpleGrid columns={[1]} gap={6}>
          <Section mb="0">
            <ProjectCard
              title={t.projects.drivesafeTitle}
              description={t.projects.drivesafeDesc}
              highlights={t.projects.drivesafeHighlights}
              challenges={t.projects.drivesafeChallenges}
              techStack={[
                "Python",
                "TensorFlow",
                "FastAPI",
                "WebSocket",
                "Docker",
                "OpenCV",
                "Hugging Face",
              ]}
              githubLink="https://github.com/Ankush1461/driver-drowsiness-detection"
              websiteLink="https://huggingface.co/spaces/ankushkarmakar/drivesafe-ai-v2"
            />
          </Section>
          <Section delay={0.1} mb="0">
            <ProjectCard
              title={t.projects.meteordashTitle}
              description={t.projects.meteordashDesc}
              highlights={t.projects.meteordashHighlights}
              challenges={t.projects.meteordashChallenges}
              techStack={[
                "Next.js",
                "MediaPipe",
                "Tailwind CSS",
                "JavaScript",
                "Cookies",
              ]}
              githubLink="https://github.com/Ankush1461/meteordash"
              websiteLink="https://meteordash.vercel.app/"
            />
          </Section>
          <Section delay={0.2} mb="0">
            <ProjectCard
              title={t.projects.appleTitle}
              description={t.projects.appleDesc}
              highlights={t.projects.appleHighlights}
              challenges={t.projects.appleChallenges}
              techStack={[
                "React",
                "Vite",
                "GSAP",
                "Three.js",
                "JavaScript"
              ]}
              githubLink="https://github.com/Ankush1461/apple-website"
              websiteLink="https://apple-website-liart.vercel.app/"
            />
          </Section>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default Projects;
