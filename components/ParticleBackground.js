import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";


export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const particleColor = useColorModeValue("#202023", "#f0e7db");
  const bgColor = useColorModeValue("#f0e7db", "#202023");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

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
      fpsLimit: 60,
      particles: {
        number: {
          value: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 50,
          density: {
            enable: true,
            area: 1200,
          },
        },
        color: {
          value: particleColor,
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.3,
        },
        size: {
          value: { min: 1, max: 2 },
        },
        links: {
          enable: true,
          distance: 150,
          color: particleColor,
          opacity: 0.2,
          width: 0.5,
        },
        move: {
          enable: true,
          speed: 1,
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
          resize: true,
        },
        modes: {
          repulse: {
            distance: 200,
            duration: 0.4,
            speed: 1,
            factor: 100,
          },
          push: {
            quantity: 4,
          },
        },
      },
      detectRetina: true,
    }),
    [particleColor]
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
        key={particleColor}
        options={options}
      />
    </Box>
  );

}