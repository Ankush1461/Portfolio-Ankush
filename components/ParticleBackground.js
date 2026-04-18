import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const particleColor = useColorModeValue("#202023", "#f0e7db");
  const bgColor = useColorModeValue("#f0e7db", "#202023");

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
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
      fpsLimit: 120,
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
            area: 800,
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
          distance: 180,
          color: particleColor,
          opacity: 0.2,
          width: 0.5,
        },
        move: {
          enable: true,
          speed: 1.5,
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
    <Particles
      id="tsparticles"
      key={particleColor}
      options={options}
    />
  );
}