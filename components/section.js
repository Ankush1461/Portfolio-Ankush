import { Box } from "@chakra-ui/react";
import { motion } from "motion/react";
import { forwardRef } from "react";

const MotionBox = motion.create(
  forwardRef(function ChakraBox(props, ref) {
    return <Box ref={ref} {...props} />;
  })
);

const Section = ({ children, delay = 0, mb = "4rem" }) => (
  <MotionBox
    initial={{ y: 20, opacity: 0, scale: 0.98 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{
      duration: 0.6,
      delay,
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.8
    }}
    style={{ marginBottom: mb }}
  >
    {children}
  </MotionBox>
);

export default Section;
