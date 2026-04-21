import { motion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

/**
 * A creative scroll progress indicator that merges:
 * - Football Tactical Board (dotted paths)
 * - Computer Terminal (loading progress percentage)
 */
export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);

  // Map progress to 0-100%
  useEffect(() => {
    // Force 100% on contact page immediately
    if (pathname && pathname.includes("/contact")) {
      setPercentage(100);
      return;
    }

    // Check if page is scrollable on mount and resize
    const checkScrollability = () => {
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const winHeight = window.innerHeight;
      const isScrollable = docHeight > winHeight + 15; // 15px buffer for cross-browser consistency
      
      if (!isScrollable) {
        setPercentage(100);
      } else {
        // Recalculate based on current scroll position
        setPercentage(Math.round(scrollYProgress.get() * 100));
      }
    };

    checkScrollability();
    window.addEventListener("resize", checkScrollability);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const winHeight = window.innerHeight;
      const isScrollable = docHeight > winHeight + 15;
      
      if (isScrollable) {
        setPercentage(Math.round(latest * 100));
      } else {
        setPercentage(100);
      }
    });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", checkScrollability);
    };
  }, [scrollYProgress, pathname]);

  return (
    <Box
      position="fixed"
      right={{ base: "4px", md: "20px" }}
      top="50%"
      transform="translateY(-50%)"
      zIndex={50}
      height={{ base: "240px", md: "280px" }}
      width={{ base: "18px", md: "40px" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      sx={{ willChange: "transform", contain: "layout style" }}
    >
      {/* Terminal Label */}
      <Box
        position="relative"
        height="120px"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontSize={{ base: "8px", md: "11px" }}
          fontWeight="bold"
          fontFamily="mono"
          color="teal.500"
          style={{ 
            whiteSpace: "nowrap",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            position: "absolute"
          }}
          textAlign="center"
          letterSpacing="widest"
        >
          SYS_LOAD: {percentage}%
        </Text>
      </Box>

      {/* The Tactical Playbook Line */}
      <Box
        height={{ base: "80px", md: "100px" }}
        width="2px"
        bg="whiteAlpha.200"
        position="relative"
        borderRadius="full"
        overflow="hidden"
      >
        {/* The Dotted 'Action Path' */}
        <motion.div
          style={{
            scaleY,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to bottom, transparent, #319795)",
            transformOrigin: "top"
          }}
          className="playbook-dot-container"
          height="100%"
        />
      </Box>

      {/* Football Icon Representation */}
      <motion.div
        animate={{ 
          rotate: percentage * 3.6,
          y: (percentage / 100) * 20 
        }}
      >
        <Box 
            width="10px" 
            height="10px" 
            borderRadius="full" 
            bg="teal.500" 
            boxShadow="0 0 10px #319795"
        />
      </motion.div>
    </Box>
  );
}
