import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const isMobile = useIsMobile();
  const particleColor = useColorModeValue("#202023", "#f0e7db");
  const bgColor = useColorModeValue("#f0e7db", "#202023");

  useEffect(() => {
    if (!init) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }
  }, [init]);

  const options = useMemo(
    () => ({
      fullScreen: { 
        enable: false,
      },
      background: {
        color: {
          value: bgColor,
        },
      },
      fpsLimit: isMobile ? 30 : 60,
      particles: {
        number: {
          value: isMobile ? 15 : 50,
          density: {
            enable: true,
            area: isMobile ? 2000 : 1200,
          },
        },
        color: {
          value: particleColor,
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.25,
        },
        size: {
          value: { min: 1, max: isMobile ? 1.5 : 2 },
        },
        links: {
          enable: true,
          distance: isMobile ? 100 : 150,
          color: particleColor,
          opacity: 0.15,
          width: 0.5,
        },
        move: {
          enable: true,
          speed: isMobile ? 0.5 : 1,
          direction: "none",
          outModes: {
            default: "bounce",
          },
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: {
            enable: !isMobile,
          },
        },
        modes: {
          repulse: {
            distance: 200,
            duration: 0.4,
            factor: 100,
          },
          push: {
            quantity: 4,
          },
        },
      },
      detectRetina: !isMobile,
    }),
    [particleColor, isMobile]
  );

  if (!init) return null;

  return (
    <Box 
      id="particles-container" 
      position="fixed" 
      top={0} 
      left={0} 
      w="100%" 
      h="100%" 
      zIndex={-1} 
      overflow="hidden"
      pointerEvents="none"
    >
      <Particles
        id="tsparticles"
        key={`${particleColor}-${isMobile}`}
        options={options}
      />
    </Box>
  );

}