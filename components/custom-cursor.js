import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useColorModeValue } from "@/components/ui/color-mode";

/**
 * Lightweight gate: on touch/mobile devices, this component renders
 * nothing and avoids mounting any hooks, motion values, or springs.
 */
const CustomCursor = () => {
  const [hasPrecisionPointer, setHasPrecisionPointer] = useState(false);

  useEffect(() => {
    const isMobileScreen = window.innerWidth < 768;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setHasPrecisionPointer(!isMobileScreen && hasFinePointer);
  }, []);

  if (!hasPrecisionPointer) return null;

  return <CursorInner />;
};

const CursorInner = () => {
  const cursorSize = 24;
  const cursorSizeHover = 50;

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const [isHovering, setIsHovering] = useState(false);

  // High stiffness and low mass for ultra-low latency "snappiness"
  const springConfig = { damping: 20, stiffness: 800, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const cursorColor = useColorModeValue(
    "rgba(49, 151, 149, 0.4)",
    "rgba(129, 230, 217, 0.3)",
  );
  const cursorBorder = useColorModeValue(
    "1px solid rgba(49, 151, 149, 0.8)",
    "1px solid rgba(129, 230, 217, 0.6)",
  );

  useEffect(() => {
    document.body.style.cursor = "auto";

    const handleMouseMove = (e) => {
      mouseX.set(
        e.clientX - (isHovering ? cursorSizeHover / 2 : cursorSize / 2),
      );
      mouseY.set(
        e.clientY - (isHovering ? cursorSizeHover / 2 : cursorSize / 2),
      );
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName?.toLowerCase() === "button" ||
        target.tagName?.toLowerCase() === "a" ||
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest?.("button") ||
        target.closest?.("a");

      setIsHovering(!!isClickable);

      if (isClickable) {
        mouseX.set(e.clientX - cursorSizeHover / 2);
        mouseY.set(e.clientY - cursorSizeHover / 2);
      } else {
        mouseX.set(e.clientX - cursorSize / 2);
        mouseY.set(e.clientY - cursorSize / 2);
      }
    };

    // CHANGE: Throttle mousemove to 16ms (60fps) instead of every event
    let lastTime = 0;
    const throttledMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime > 16) {
        handleMouseMove(e);
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", throttledMouseMove, {
      passive: true,
    });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isHovering]);
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        x: cursorX,
        y: cursorY,
        borderRadius: "50%",
        border: cursorBorder,
      }}
      initial={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        width: cursorSize,
        height: cursorSize,
      }}
      animate={{
        width: isHovering ? cursorSizeHover : cursorSize,
        height: isHovering ? cursorSizeHover : cursorSize,
        backgroundColor: isHovering ? cursorColor : "rgba(0, 0, 0, 0)",
        backdropFilter: isHovering ? "blur(2px)" : "blur(0px)",
        WebkitBackdropFilter: isHovering ? "blur(2px)" : "blur(0px)",
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
    />
  );
};

export default CustomCursor;
