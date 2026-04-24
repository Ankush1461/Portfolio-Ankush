import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLoading } from "@/lib/loading-context";

const LOADING_MESSAGES = [
  "Initializing something extraordinary...",
  "Compiling years of experience...",
  "Loading a profile worth the wait...",
  "Brewing code & creativity...",
  "Deploying awesomeness...",
  "Connecting the dots between tech & impact...",
];

export default function LoadingScreen({ onLoadingComplete }) {
  const { setIsLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const message = useMemo(
    () => LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)],
    [],
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ssrOverlay = document.getElementById("initial-loader");
    if (ssrOverlay) ssrOverlay.style.display = "none";

    let splineFinished = false;
    let minTimePassed = false;
    let isFullyDone = false;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        const increment = prev < 50 ? 10 : prev < 75 ? 5 : 3;
        return Math.min(prev + increment, 95);
      });
    }, 30);

    const tryFinish = () => {
      if (isFullyDone) return;
      if (splineFinished && minTimePassed) {
        isFullyDone = true;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setIsLoading(false);
          if (onLoadingComplete) onLoadingComplete();
        }, 250);
      }
    };

    const onSplineEvent = () => {
      splineFinished = true;
      tryFinish();
    };

    window.addEventListener("spline-loaded", onSplineEvent);
    window.addEventListener("spline-error", onSplineEvent);

    const minimumTimer = setTimeout(
      () => {
        minTimePassed = true;
        tryFinish();
      },
      isMobile ? 80 : 250,
    );

    const safetyTimer = setTimeout(
      () => {
        splineFinished = true;
        tryFinish();
      },
      isMobile ? 1200 : 2500,
    );

    return () => {
      clearInterval(interval);
      clearTimeout(minimumTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener("spline-loaded", onSplineEvent);
      window.removeEventListener("spline-error", onSplineEvent);
    };
  }, [onLoadingComplete, isMobile]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#121214",
            overflow: "hidden",
          }}
        >
          {/* Side Indicator */}
          <div
            style={{
              position: "fixed",
              right: "0",
              top: "0",
              bottom: "0",
              width: isMobile ? "18px" : "48px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: "1px solid rgba(49, 151, 149, 0.2)",
              background: "rgba(20, 20, 23, 0.5)",
              backdropFilter: "blur(5px)",
              zIndex: 100,
              transition: "width 0.3s ease",
            }}
          >
            <div
              style={{
                color: "#319795",
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: isMobile ? "8px" : "12px",
                fontWeight: 600,
                letterSpacing: isMobile ? "1px" : "4px",
                opacity: 0.8,
                marginBottom: "20px",
                transform: "rotate(-90deg)",
                whiteSpace: "nowrap",
              }}
            >
              SYS_LOAD
            </div>
            <div
              style={{
                height: isMobile ? "40px" : "100px",
                width: "1px",
                background: "rgba(49, 151, 149, 0.2)",
                marginBottom: "16px",
              }}
            />
            <div
              style={{
                color: "#319795",
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: isMobile ? "10px" : "14px",
                fontWeight: "bold",
                transform: "rotate(-90deg)",
                whiteSpace: "nowrap",
                letterSpacing: isMobile ? "1px" : "normal",
              }}
            >
              {progress}%
            </div>
          </div>

          {/* Background grid — desktop only */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(49,151,149,0.08) 1px, transparent 0)",
              backgroundSize: "40px 40px",
              opacity: 0.6,
              display: isMobile ? "none" : "block",
            }}
          />

          {/* Glow orb — desktop only */}
          {!isMobile && (
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(49,151,149,0.25) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          )}

          {/* Terminal window */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            style={{
              position: "relative",
              width: "min(480px, 90vw)",
              background: isMobile ? "#1a1a1e" : "rgba(20, 20, 23, 0.75)",
              backdropFilter: isMobile ? "none" : "blur(25px)",
              border: "1px solid rgba(49,151,149,0.15)",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: isMobile
                ? "0 20px 40px rgba(0,0,0,0.6)"
                : "0 40px 100px rgba(0,0,0,0.8), 0 0 40px rgba(49,151,149,0.1)",
            }}
          >
            {/* Scanner — desktop only */}
            {!isMobile && (
              <motion.div
                animate={{ left: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: 0,
                  width: "40%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(49,151,149,0.08), transparent)",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#ff5f57",
                    boxShadow: "0 0 8px rgba(255,95,87,0.3)",
                  }}
                />
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#febc2e",
                    boxShadow: "0 0 8px rgba(254,188,46,0.3)",
                  }}
                />
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#28c840",
                    boxShadow: "0 0 8px rgba(40,200,64,0.3)",
                  }}
                />
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "10px",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "1.5px",
                  fontWeight: 500,
                }}
              >
                PROD_INIT_PHASE
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: "28px 32px 36px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "14px",
                }}
              >
                <span style={{ color: "#319795", fontWeight: 700 }}>❯</span>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  run sync --portfolio
                </span>
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: "8px",
                    height: "16px",
                    background: "#319795",
                    marginLeft: "2px",
                  }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12.5px",
                  color: "rgba(94,234,212,0.9)",
                  margin: "0 0 28px 0",
                  lineHeight: 1.8,
                  textShadow: "0 0 10px rgba(49,151,149,0.3)",
                }}
              >
                {message}
              </motion.p>

              {/* Progress */}
              <div
                style={{
                  position: "relative",
                  maxWidth: "180px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "2px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    marginBottom: "12px",
                  }}
                >
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15, ease: "linear" }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg, #319795, #5eead4)",
                      boxShadow: "0 0 20px rgba(49,151,149,0.6)",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "8.5px",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.5px",
                  }}
                >
                  <span>INITIALIZING_HYDRATION</span>
                  <span style={{ color: "#319795" }}>{progress}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Signature */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{
              position: "absolute",
              bottom: "40px",
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "6px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            ANKUSH KARMAKAR
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
