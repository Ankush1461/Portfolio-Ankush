"use client";

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
import Section from "@/components/section";
import Layout from "@/components/layouts/article";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useLanguage } from "@/lib/i18n";
import { IoLogoGithub, IoCheckmarkCircleOutline } from "react-icons/io5";
import { LuExternalLink, LuZap } from "react-icons/lu";
import { ListRoot, ListItem } from "@chakra-ui/react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

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
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    // Update local CSS vars for the light source
    e.currentTarget.style.setProperty("--mouse-x", `${(mouseX / width) * 100}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${(mouseY / height) * 100}%`);
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-card"
    >
      <Box
        p={6}
        borderRadius="2xl"
        position="relative"
        height="100%"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        {/* Dynamic Light Source */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          pointerEvents="none"
          zIndex={0}
          background="radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 80%)"
        />

        <Box position="relative" zIndex={1}>
          <Heading as="h4" fontSize="xl" mb={3} fontFamily="'M PLUS Rounded 1c', sans-serif" color="teal.500">
            {title}
          </Heading>
          
          <Text fontSize="sm" mb={4} color="gray.600" _dark={{ color: "gray.300" }} fontWeight="medium" fontStyle="italic">
            {description}
          </Text>

          <Box mb={6}>
            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color="gray.500" mb={3} display="flex" alignItems="center" gap={2}>
              <IoCheckmarkCircleOutline /> {t.projects.highlightsTitle}
            </Text>
            <ListRoot gap={1} variant="plain">
              {highlights?.map((point, i) => (
                <ListItem key={i} fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }} display="flex" alignItems="center" gap={2}>
                  <Box boxSize={1} borderRadius="full" bg="teal.500" /> {point}
                </ListItem>
              ))}
            </ListRoot>
          </Box>

          <Box mb={6} p={3} borderRadius="md" bg="blackAlpha.50" _dark={{ bg: "whiteAlpha.100" }} borderLeft="4px solid" borderColor="orange.400">
            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color="orange.400" mb={1} display="flex" alignItems="center" gap={2}>
              <LuZap size={14} /> {t.projects.challengesTitle}
            </Text>
            <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.400" }}>
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
      </Box>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useLanguage();

  return (
    <Layout title={t.projects.title}>
      <Container mb={18}>
        <Heading as="h3" fontSize={20} mb={10} textDecoration="underline" textUnderlineOffset={6} textDecorationColor="gray.500" textDecorationThickness="4px">
          {t.projects.title}
        </Heading>
        <SimpleGrid columns={[1]} gap={8}>
          <Section mb="0" direction="left">
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
          <Section delay={0.1} mb="0" direction="right">
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
          <Section delay={0.2} mb="0" direction="left">
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

