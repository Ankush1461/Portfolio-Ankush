import { Button } from "@chakra-ui/react";
import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence } from "motion/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useEffect, useState } from "react";

const LanguageToggleButton = () => {
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const colorPalette = useColorModeValue("teal", "cyan");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        w="40px"
      >
        EN
      </Button>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: "inline-block" }}
        key={language}
        initial={{ y: -20, opacity: 0, rotateX: 90 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        exit={{ y: 20, opacity: 0, rotateX: -90 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 200, damping: 10 }}
      >
        <Button
          colorPalette={colorPalette}
          variant="ghost"
          onClick={toggleLanguage}
          size="sm"
          fontWeight="bold"
          fontSize="sm"
          w="40px"
        >
          {language.toUpperCase()}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default LanguageToggleButton;
