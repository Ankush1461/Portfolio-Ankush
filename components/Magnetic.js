import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A wrapper component that makes its child "magnetically" follow the cursor.
 * Uses motion values instead of React state to avoid re-renders on every mouse move.
 * CHANGE: Completely disabled on mobile to prevent expensive computations
 */
export default function Magnetic({ children, strength = 0.5 }) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return; // CHANGE: Skip on mobile

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Calculate relative mouse position from element center
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // CHANGE: Skip on mobile
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={!isMobile ? { x: springX, y: springY } : {}} // CHANGE: No motion on mobile
    >
      {children}
    </motion.div>
  );
}
