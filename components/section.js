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
      x: direction === "left" ? -50 : 50, 
      opacity: 0, 
      rotate: direction === "left" ? -2 : 2,
      filter: "blur(10px)"
    }}
    whileInView={{ 
      x: 0, 
      opacity: 1, 
      rotate: 0,
      filter: "blur(0px)"
    }}
    viewport={{ once: false, amount: 0.1, margin: "10000px 0px -150px 0px" }} // Huge top margin prevents elements from animating out when exiting the top of the screen, so they never wrongly re-animate when scrolling back up. Mapped: Top Right Bottom Left.
    transition={{
      duration: 0.8,
      delay,
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 1
    }}
    style={{ marginBottom: mb, position: "relative" }}
  >
    {children}
  </MotionBox>
);

export default Section;
