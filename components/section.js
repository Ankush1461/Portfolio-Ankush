import { Box } from "@chakra-ui/react";
import { motion } from "motion/react";
import { forwardRef } from "react";

const MotionBox = motion.create(
  forwardRef(function ChakraBox(props, ref) {
    return <Box ref={ref} {...props} />;
  })
);

const Section = ({ children, delay = 0, mb = "4rem", direction = "left" }) => (
  <MotionBox
    initial={{ 
      x: direction === "left" ? -30 : 30, 
      opacity: 0, 
      rotate: direction === "left" ? -2 : 2,
    }}
    whileInView={{ 
      x: 0, 
      opacity: 1, 
      rotate: 0,
    }}
    viewport={{ once: false, amount: 0.1, margin: "10000px 0px -150px 0px" }}
    transition={{
      duration: 0.5,
      delay,
      ease: [0.25, 0.1, 0.25, 1], /* CSS ease — smooth single-pass, no bounce */
    }}
    style={{ 
      marginBottom: mb, 
      position: "relative",
      willChange: "transform, opacity",
    }}
  >
    {children}
  </MotionBox>
);

export default Section;
