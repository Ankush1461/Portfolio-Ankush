import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

import { SplineErrorBoundary } from "./SplineErrorBoundary";

// Lazy loading the heavy WebGL engine drastically reduces payload on first paint
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const TECH_TAGS = [
  "Python",
  "SQL",
  "AI",
  "ML",
  "Azure",
  "NumPy",
  "Pandas",
  "TensorFlow",
  "Scikit-Learn",
  "Docker",
  "React",
  "Next.js",
  "Dynamics CRM",
  "Data Eng",
];

function StaticTechTags({ isDark }) {
  const tagFg = isDark ? "#5eead4" : "#0d9488";
  const tagBg = isDark ? "rgba(94,234,212,0.15)" : "rgba(13,148,136,0.15)";
  const tagBorder = isDark ? "rgba(94,234,212,0.45)" : "rgba(13,148,136,0.45)";
  const glowColor = isDark ? "rgba(94,234,212,0.3)" : "rgba(13,148,136,0.3)";

  // Two staggered arcs around upper half: inner (closer) + outer (farther)
  const innerTags = TECH_TAGS.slice(0, 7);
  const outerTags = TECH_TAGS.slice(7);
  const innerRadius = 115;
  const outerRadius = 160;
  const innerStart = 205;
  const innerEnd = 335;
  const outerStart = 192;
  const outerEnd = 348;
  const yOffset = 20;

  const badgeStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    fontSize: 10,
    fontFamily: "var(--font-jetbrains), 'Fira Code', monospace",
    fontWeight: 700,
    color: tagFg,
    background: tagBg,
    border: `1px solid ${tagBorder}`,
    padding: "3px 9px",
    borderRadius: 8,
    whiteSpace: "nowrap",
    boxShadow: `0 0 10px ${glowColor}`,
    textShadow: `0 0 6px ${glowColor}`,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      {innerTags.map((tag, i) => {
        const angleDeg =
          innerStart + ((innerEnd - innerStart) / (innerTags.length - 1)) * i;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = Math.cos(angleRad) * innerRadius;
        const y = Math.sin(angleRad) * innerRadius + yOffset;
        return (
          <span
            key={tag}
            style={{
              ...badgeStyle,
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            {tag}
          </span>
        );
      })}
      {outerTags.map((tag, i) => {
        const angleDeg =
          outerStart + ((outerEnd - outerStart) / (outerTags.length - 1)) * i;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = Math.cos(angleRad) * outerRadius;
        const y = Math.sin(angleRad) * outerRadius + yOffset;
        return (
          <span
            key={tag}
            style={{
              ...badgeStyle,
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function OrbitingTags({ isDark }) {
  const tagData = useMemo(() => {
    return TECH_TAGS.map((tag, i) => {
      const angle = (i / TECH_TAGS.length) * 360;
      const radiusBase = 200;
      const radiusOffset = (i % 5) * 42;
      const yOffBase = ((i % 8) - 4) * 30;

      return {
        tag,
        angle,
        radius: radiusBase + radiusOffset,
        minRadius: 100 + radiusOffset * 0.6,
        yOff: yOffBase,
        dur: 35 + (i % 6) * 6,
        delay: i * 0.4,
        size: i % 5 === 0 ? 10 : 8,
      };
    });
  }, []);

  const tagFg = isDark ? "#5eead4" : "#0d9488";
  const tagBgColor = isDark ? "rgba(94,234,212,0.06)" : "rgba(13,148,136,0.07)";
  const tagBorderColor = isDark
    ? "rgba(94,234,212,0.15)"
    : "rgba(13,148,136,0.18)";

  return (
    <>
      {tagData.map((tp) => (
        <div
          key={tp.tag}
          className="rc-tag"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            fontSize: tp.size,
            fontFamily: "var(--font-jetbrains), 'Fira Code', monospace",
            fontWeight: 700,
            color: tagFg,
            background: tagBgColor,
            border: `1px solid ${tagBorderColor}`,
            padding: "2px 10px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 0,
            animation: `rcOrbit ${tp.dur}s linear ${tp.delay}s infinite`,
            willChange: "transform",
            "--rc-angle": `${tp.angle}deg`,
            "--rc-r": `clamp(${tp.minRadius}px, 24vw, ${tp.radius}px)`,
            "--rc-y": `${tp.yOff}px`,
          }}
        >
          {tp.tag}
        </div>
      ))}
    </>
  );
}

export default function RetroComputer() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isDark = useColorModeValue(false, true);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleGlobalPointer = (e) => {
      if (!e.isTrusted) return;

      const canvas = document.querySelector("#rc-spline-wrapper canvas");
      if (!canvas) return;

      const aboutSection = document.getElementById("about-section");

      if (e.target !== canvas) {
        if (aboutSection) {
          const rect = aboutSection.getBoundingClientRect();
          if (e.clientY > rect.top) return;
        }

        const now = Date.now();
        const lastEvent = parseInt(canvas.dataset.lastSyntheticEvent || "0");
        if (now - lastEvent < 16) return;
        canvas.dataset.lastSyntheticEvent = now.toString();

        const lastEnter = parseInt(canvas.dataset.lastSyntheticEnter || "0");
        if (now - lastEnter > 500) {
          const enterEvent = new PointerEvent("pointerenter", {
            bubbles: true,
            cancelable: true,
            clientX: e.clientX,
            clientY: e.clientY,
            pointerId: e.pointerId,
            pointerType: e.pointerType,
            isPrimary: e.isPrimary,
          });
          canvas.dispatchEvent(enterEvent);
          canvas.dataset.lastSyntheticEnter = now.toString();
        }

        const clone = new PointerEvent(e.type, {
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
          pointerId: e.pointerId,
          pointerType: e.pointerType,
          isPrimary: e.isPrimary,
        });
        canvas.dispatchEvent(clone);
      }
    };

    window.addEventListener("pointermove", handleGlobalPointer, {
      capture: true,
      passive: true,
    });
    return () =>
      window.removeEventListener("pointermove", handleGlobalPointer, {
        capture: true,
      });
  }, [isMobile]);

  return (
    <>
      <Box
        position="relative"
        w="100%"
        h={{ base: "320px", sm: "400px", md: "520px" }}
        mb={{ base: 4, md: 10 }}
        bg="transparent"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {/* Loading state */}
        {loading && (
          <Flex
            position="absolute"
            inset={0}
            align="center"
            justify="center"
            zIndex={5}
          >
            <Spinner size="xl" color="teal.400" thickness="4px" />
          </Flex>
        )}

        {/* Tech Tags Container — Static on mobile, Orbiting on desktop */}
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          overflow="hidden"
          zIndex={2}
        >
          <Box display={{ base: "block", md: "none" }}>
            <StaticTechTags isDark={isDark} />
          </Box>
          <Box display={{ base: "none", md: "block" }}>
            {mounted && <OrbitingTags isDark={isDark} />}
          </Box>
        </Box>

        {/* Centering Wrapper for Spline */}
        <Box
          position="absolute"
          inset={0}
          zIndex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          pointerEvents="auto"
        >
          {/* Spline Fixed-Aspect Ratio Canvas */}
          <Box
            id="rc-spline-wrapper"
            w={{ base: "800px", md: "100%" }}
            h={{ base: "800px", md: "100%" }}
            flexShrink={0}
            pointerEvents="auto"
            filter={{
              base: "var(--rc-filter-base)",
              md: "var(--rc-filter-md)",
            }}
            transform={{
              base: "scale(0.42)",
              sm: "scale(0.60)",
              md: "none",
            }}
            transformOrigin="center center"
            sx={{
              transition: "filter 0.5s ease",
              "--rc-filter-base": "brightness(1) contrast(1.05)",
              "--rc-filter-md":
                "brightness(1) contrast(1.05) drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
              _dark: {
                "--rc-filter-base": "brightness(0.85) contrast(1.15)",
                "--rc-filter-md":
                  "brightness(0.85) contrast(1.15) drop-shadow(0 40px 60px rgba(13, 148, 136, 0.4))",
              },
              maskImage: isMobile
                ? "none"
                : "linear-gradient(to bottom, black 85%, transparent 100%)",
              WebkitMaskImage: isMobile
                ? "none"
                : "linear-gradient(to bottom, black 85%, transparent 100%)",
              "& canvas": {
                display: "block",
                width: "100% !important",
                height: "100% !important",
                outline: "none",
                backgroundColor: "transparent !important",
              },
            }}
          >
            <SplineErrorBoundary>
              <Spline
                scene="/scene.splinecode"
                onLoad={(splineApp) => {
                  setTimeout(() => {
                    setLoading(false);
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new Event("spline-loaded"));
                    }
                  }, 800);

                  try {
                    if (splineApp._scene) splineApp._scene.background = null;
                    if (splineApp._renderer)
                      splineApp._renderer.setClearAlpha(0);
                    if (splineApp.setColors) splineApp.setColors();
                  } catch {
                    // Silently fail if Spline internal API changes
                  }
                }}
              />
            </SplineErrorBoundary>
          </Box>
        </Box>

        {/* Global Orbit Keyframes */}
        <style jsx global>{`
          @keyframes rcOrbit {
            from {
              transform: translate(-50%, -50%) rotate(var(--rc-angle))
                translateX(var(--rc-r)) translateY(var(--rc-y))
                rotate(calc(-1 * var(--rc-angle)));
            }
            to {
              transform: translate(-50%, -50%)
                rotate(calc(var(--rc-angle) + 360deg)) translateX(var(--rc-r))
                translateY(var(--rc-y))
                rotate(calc(-1 * (var(--rc-angle) + 360deg)));
            }
          }
          @media (max-width: 768px) {
            .rc-tag:nth-child(n + 10) {
              display: none !important;
            }
          }
          @media (max-width: 480px) {
            .rc-tag:nth-child(n + 6) {
              display: none !important;
            }
          }
          @media (max-width: 360px) {
            .rc-tag:nth-child(n + 4) {
              display: none !important;
            }
          }
        `}</style>
      </Box>
    </>
  );
}
