import { IconButton } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { IoMoon, IoSunny } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: "inline-block" }}
        key={useColorModeValue("light", "dark")}
        initial={{ y: -20, opacity: 0, rotate: -90 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 20, opacity: 0, rotate: 90 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 200, damping: 10 }}
      >
        <IconButton
          aria-label="Toggle Theme"
          colorPalette={useColorModeValue("purple", "orange")}
          variant="ghost"
          onClick={toggleColorMode}
          size="sm"
        >
          {useColorModeValue(<IoMoon />, <IoSunny />)}
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeToggleButton;
