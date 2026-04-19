import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';

import { SplineErrorBoundary } from './SplineErrorBoundary';

// Lazy loading the heavy WebGL engine drastically reduces payload on first paint
const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false 
});

const TECH_TAGS = [
  "Python", "PySpark", "SQL", "DBMS", "AI", "ML",
  "Calculus", "Statistics", "Mathematics",
  "NumPy", "Pandas", "TensorFlow", "Scikit-Learn",
  "Docker", "React", "Next.js", "Azure", "FastAPI",
  "C#", ".NET", "Power Automate", "D365 CRM", "Data Eng",
];

function OrbitingTags({ isDark }) {
  const tagData = useMemo(() => {
    return TECH_TAGS.map((tag, i) => {
      const angle = (i / TECH_TAGS.length) * 360;
      // Spread tags further apart fundamentally
      const radiusBase = 200; // px (widened)
      const radiusOffset = (i % 5) * 42; // More staggered layers
      const yOffBase = (i % 8 - 4) * 30; // Further Y deviation

      return {
        tag,
        angle,
        radius: radiusBase + radiusOffset,
        minRadius: 100 + (radiusOffset * 0.6), // Dynamic min radius for mobile prevents collapsing to a single shell
        yOff: yOffBase,
        dur: 35 + (i % 6) * 6,
        delay: i * 0.4,
        size: i % 5 === 0 ? 10 : 8, // Smaller text to prevent visual clutter
      };
    });
  }, []);

  const tagFg = isDark ? "#5eead4" : "#0d9488";
  const tagBgColor = isDark ? "rgba(94,234,212,0.06)" : "rgba(13,148,136,0.07)";
  const tagBorderColor = isDark ? "rgba(94,234,212,0.15)" : "rgba(13,148,136,0.18)";

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
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
            fontWeight: 700,
            color: tagFg,
            background: tagBgColor,
            border: `1px solid ${tagBorderColor}`,
            padding: "2px 10px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 0, // Keep behind Spline if we want, or in front. We'll set zIndex: 1
            animation: `rcOrbit ${tp.dur}s linear ${tp.delay}s infinite`,
            "--rc-angle": `${tp.angle}deg`,
            "--rc-r": `clamp(${tp.minRadius}px, 24vw, ${tp.radius}px)`, // Tightly couples mobile offsets mapping directly to the staggered depths
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
  const isDark = useColorModeValue(false, true);

  useEffect(() => {
    setMounted(true);
  }, []);


  // Track global pointer events to ensure Spline tracks mouse coordinates infinitely across the whole screen width
  // even though the Canvas DOM element stops at the constrained 768px layout boundary.
  useEffect(() => {
    const handleGlobalPointer = (e) => {
      // Prevent infinite event echo loops from our own dispatched clones
      if (!e.isTrusted) return; 
      
      const canvas = document.querySelector("#rc-spline-wrapper canvas");
      const aboutSection = document.getElementById("about-section");
      
      if (canvas && e.target !== canvas) {
        
        // LIMIT DETECTION AREA: Stop tracking if the mouse is below the start of the About section
        if (aboutSection) {
          const rect = aboutSection.getBoundingClientRect();
          if (e.clientY > rect.top) return; // Exit if mouse is in the content area
        }

        // Self-Healing Retracker pulse
        const now = Date.now();
        const lastEnter = parseInt(canvas.dataset.lastSyntheticEnter || "0");
        if (now - lastEnter > 500) {
          const enterEvent = new PointerEvent("pointerenter", {
            bubbles: true, cancelable: true, clientX: e.clientX, clientY: e.clientY,
            pointerId: e.pointerId, pointerType: e.pointerType, isPrimary: e.isPrimary
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
    
    window.addEventListener("pointermove", handleGlobalPointer, { capture: true, passive: true });
    return () => window.removeEventListener("pointermove", handleGlobalPointer, { capture: true });
  }, []);

  return (
    <>
      <Box
        position="relative"
        w="100%"
        h={{ base: "320px", sm: "400px", md: "520px" }} // Tightened height so bio card naturally hugs the scene
        mb={{ base: 4, md: 10 }}
        bg="transparent"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden" /* Clip orbiting tags and canvas overflow */
      >

        {/* Loading state */}
        {loading && (
          <Flex position="absolute" inset={0} align="center" justify="center" zIndex={5}>
            <Spinner size="xl" color="teal.400" thickness="4px" />
          </Flex>
        )}

        {/* Orbiting Tech Tags Container */}
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          overflow="hidden"
          zIndex={2}
        >
          {mounted && <OrbitingTags isDark={isDark} />}
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
          pointerEvents="auto" /* Enable mouse interactions */
        >
          {/* Spline Fixed-Aspect Ratio Canvas */}
          <Box
            id="rc-spline-wrapper"
            w={{ base: "800px", md: "100%" }} // Provide a massive canvas on mobile to prevent Spline's internal FOV cropping
            h={{ base: "800px", md: "100%" }}
            flexShrink={0}
            pointerEvents="auto"
            filter={{ base: "var(--rc-filter-base)", md: "var(--rc-filter-md)" }}
            transform={{ 
              base: "scale(0.42)", // Completely visible desk exactly fitting 360px+ screens
              sm: "scale(0.60)", 
              md: "none" 
            }}
            transformOrigin="center center"
            sx={{
              transition: 'filter 0.5s ease',
              "--rc-filter-base": "brightness(1) contrast(1.05)",
              "--rc-filter-md": "brightness(1) contrast(1.05) drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
              _dark: {
                "--rc-filter-base": "brightness(0.85) contrast(1.15)", // Verified NO shadow for base/mobile breakpoints
                "--rc-filter-md": "brightness(0.85) contrast(1.15) drop-shadow(0 40px 60px rgba(13, 148, 136, 0.4))"
              },
              maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
              "& canvas": {
                display: "block",
                width: "100% !important",
                height: "100% !important",
                outline: "none",
                backgroundColor: "transparent !important"
              }
            }}
          >
            <SplineErrorBoundary>
              <Spline
                scene="/scene.splinecode"
                onLoad={(splineApp) => {
                  // Buffer for WebGL to actually push its first populated frame
                  setTimeout(() => {
                    setLoading(false);
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new Event('spline-loaded'));
                    }
                  }, 1200);
                  
                  // Restore Standard Orientation: 
                  // By restricting mouse events to the Hero section above,
                  // we no longer need the 'heartbeat' loop to fight the Spline engine.
                  // This allows the desk to maintain its natural artist-defined axis correctly.

                  // Attempt to force the background to be transparent
                  try {
                    if (splineApp._scene) splineApp._scene.background = null;
                    if (splineApp._renderer) splineApp._renderer.setClearAlpha(0);
                    if (splineApp.setColors) splineApp.setColors();
                  } catch (e) {}
                }}
              />
            </SplineErrorBoundary>
          </Box>
        </Box>

        {/* Global Orbit Keyframes */}
        <style jsx global>{`
          @keyframes rcOrbit {
            from {
              transform: translate(-50%, -50%)
                rotate(var(--rc-angle))
                translateX(var(--rc-r))
                translateY(var(--rc-y))
                rotate(calc(-1 * var(--rc-angle)));
            }
            to {
              transform: translate(-50%, -50%)
                rotate(calc(var(--rc-angle) + 360deg))
                translateX(var(--rc-r))
                translateY(var(--rc-y))
                rotate(calc(-1 * (var(--rc-angle) + 360deg)));
            }
          }
          @media (max-width: 640px) {
            .rc-tag:nth-child(n+12) { display: none !important; }
          }
          @media (max-width: 400px) {
            .rc-tag:nth-child(n+8) { display: none !important; }
          }
        `}</style>
      </Box>
    </>
  );
}

