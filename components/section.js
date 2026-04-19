import { motion } from "motion/react";

const Section = ({ children, delay = 0, mb = "4rem", direction = "left", ...props }) => (
  <motion.div
    initial={{
      x: direction === "left" ? -15 : 15,
      opacity: 0,
    }}
    whileInView={{
      x: 0,
      opacity: 1,
    }}
    viewport={{ once: false, amount: 0.05, margin: "10000px 0px -80px 0px" }}
    transition={{
      delay: delay * 0.5,
      type: "spring",
      stiffness: 200,
      damping: 25,
      mass: 0.8,
    }}
    style={{
      marginBottom: mb,
      position: "relative",
      willChange: "transform, opacity",
    }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Section;
