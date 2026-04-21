"use client";

import { motion } from "motion/react";

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
};

const Layout = ({ children }) => (
  <motion.article
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={variants}
    transition={{ duration: 0.3, type: "easeInOut" }}
    style={{ position: "relative" }}
  >
    {children}
  </motion.article>
);

export default Layout;