import { Box, Text, Link, Heading } from "@chakra-ui/react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";

/**
 * A highly interactive card with:
 * - 3D Tilt based on mouse position
 * - Dynamic Light Source reflection
 * - Glassmorphism surface
 */
export default function ProjectCard({ title, description, thumbnail, href }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

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
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
        borderRadius: "1.5rem"
      }}
      className="glass-card"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={href} target="_blank" style={{ textDecoration: "none" }}>
        <Box 
          p={4} 
          borderRadius="2xl" 
          overflow="hidden"
          position="relative"
          role="group"
          cursor="pointer"
        >
          {/* Dynamic Light/Glow Overlay */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 80%)`,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          <Box
            borderRadius="xl"
            mb={4}
            overflow="hidden"
            position="relative"
            style={{ transform: "translateZ(30px)" }}
            boxShadow="0 10px 30px -10px rgba(0,0,0,0.5)"
          >
            <Image
              src={thumbnail}
              alt={title}
              width={500}
              height={300}
              style={{ transition: "transform 0.5s ease" }}
            />
          </Box>

          <Box style={{ transform: "translateZ(50px)" }}>
            <Heading as="h3" fontSize="xl" mb={2} color="teal.500">
              {title}
            </Heading>
            <Text fontSize="sm" opacity={0.8} color="gray.600" _dark={{ color: "gray.300" }}>
              {description}
            </Text>
          </Box>
        </Box>
      </Link>
    </motion.div>
  );
}
