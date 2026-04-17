import { IconButton } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { IoMoon, IoSunny } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  const colorModeKey = useColorModeValue("light", "dark");
  const colorPalette = useColorModeValue("purple", "orange");
  const icon = useColorModeValue(<IoMoon />, <IoSunny />);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        aria-label="Toggle Theme"
        variant="ghost"
        size="sm"
        disabled
      />
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: "inline-block" }}
        key={colorModeKey}
        initial={{ y: -20, opacity: 0, rotate: -90 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 20, opacity: 0, rotate: 90 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 200, damping: 10 }}
      >
        <IconButton
          aria-label="Toggle Theme"
          colorPalette={colorPalette}
          variant="ghost"
          onClick={toggleColorMode}
          size="sm"
        >
          {icon}
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeToggleButton;
