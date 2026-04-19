import { motion } from "motion/react";

const Section = ({ children, delay = 0, mb = "4rem", direction = "left" }) => (
  <motion.div
    initial={{ 
      x: direction === "left" ? -30 : 30, 
      opacity: 0, 
      rotate: direction === "left" ? -1 : 1,
    }}
    whileInView={{ 
      x: 0, 
      opacity: 1, 
      rotate: 0,
    }}
    viewport={{ once: false, amount: 0.1, margin: "10000px 0px -150px 0px" }}
    transition={{
      duration: 0.6,
      delay,
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 1
    }}
    style={{ 
      marginBottom: mb, 
      position: "relative",
      willChange: "transform, opacity",
    }}
  >
    {children}
  </motion.div>
);

export default Section;
