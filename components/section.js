import { motion, useInView } from "motion/react";
import { useLoading } from "@/lib/loading-context";
import { useRef } from "react";

const Section = ({ children, delay = 0, mb = "4rem", direction = "left", ...props }) => {
  const { isLoading } = useLoading();
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.15, 
    margin: "0px 0px -120px 0px" 
  });

  // Calculate the variants/state based on BOTH viewport and global loading
  const revealVariants = {
    initial: {
      x: direction === "left" ? -15 : 15,
      opacity: 0,
    },
    enter: {
      x: 0,
      opacity: 1,
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={(isInView && !isLoading) ? "enter" : "initial"}
      variants={revealVariants}
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
};

export default Section;
