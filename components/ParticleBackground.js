import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const particleColor = useColorModeValue("#202023", "#f0e7db");

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
      fpsLimit: 60,
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            area: 1000,
          },
        },
        color: {
          value: particleColor,
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.4,
        },
        size: {
          value: { min: 1, max: 3 },
        },
        links: {
          enable: true,
          distance: 150,
          color: particleColor,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          outModes: {
            default: "out",
          },
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
          resize: { enable: true },
        },
        modes: {
          repulse: {
            distance: 150,
            duration: 0.4,
          },
          push: {
            quantity: 3,
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