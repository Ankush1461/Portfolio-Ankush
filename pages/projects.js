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
import { IoLogoGithub } from "react-icons/io5";
import { LuExternalLink } from "react-icons/lu";

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

const ProjectCard = ({ title, description, techStack, githubLink, websiteLink }) => {
  const { t } = useLanguage();
  
  return (
    <Box
      p={5}
      borderRadius="xl"
      bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.100")}
      _hover={{
        bg: useColorModeValue("whiteAlpha.700", "whiteAlpha.200"),
        transform: "translateY(-4px)",
        boxShadow: useColorModeValue("0 6px 12px rgba(0,0,0,0.1)", "0 6px 12px rgba(136, 204, 202, 0.15)"),
        borderColor: useColorModeValue("transparent", "whiteAlpha.300"),
      }}
      transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}
    >
      <Heading as="h4" fontSize="lg" mb={2} fontFamily="'M PLUS Rounded 1c', sans-serif">
        {title}
      </Heading>
      <Text fontSize="sm" mb={4} color={useColorModeValue("gray.600", "gray.400")} lineHeight="tall">
        {description}
      </Text>
      <Flex flexWrap="wrap" gap={1.5} mb={4}>
        {techStack.map((tech) => (
          <TechBadge key={tech}>{tech}</TechBadge>
        ))}
      </Flex>
      <Flex gap={4}>
        <Link href={githubLink} target="_blank" _hover={{ textDecoration: "none" }}>
          <Flex alignItems="center" gap={1.5} color="teal.500" fontSize="sm" fontWeight="medium">
            <IoLogoGithub />
            <Text>{t.projects.sourceBtn}</Text>
          </Flex>
        </Link>
        {websiteLink && (
          <Link href={websiteLink} target="_blank" _hover={{ textDecoration: "none" }}>
            <Flex alignItems="center" gap={1.5} color="teal.500" fontSize="sm" fontWeight="medium">
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
        <Heading as="h3" fontSize={20} mb={4} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px">
          {t.projects.title}
        </Heading>
        <SimpleGrid columns={[1]} gap={6}>
          <Section>
            <ProjectCard
              title={t.projects.drivesafeTitle}
              description={t.projects.drivesafeDesc}
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
          <Section delay={0.1}>
            <ProjectCard
              title={t.projects.meteordashTitle}
              description={t.projects.meteordashDesc}
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
          <Section delay={0.2}>
            <ProjectCard
              title={t.projects.appleTitle}
              description={t.projects.appleDesc}
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
