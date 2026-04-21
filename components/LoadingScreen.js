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

/**
 * Premium full-screen loading splash.
 * Shows a terminal-style typewriter animation with a witty message,
 * then gracefully fades out once the site is ready.
 */
export default function LoadingScreen({ onLoadingComplete }) {
  const { setIsLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Pick a random message on mount
  const message = useMemo(
    () => LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)],
    []
  );

  useEffect(() => {
    // Remove the server-rendered overlay now that LoadingScreen has hydrated
    const ssrOverlay = document.getElementById("initial-loader");
    if (ssrOverlay) ssrOverlay.style.display = "none";

    let splineFinished = false;
    let minTimePassed = false;
    let isFullyDone = false;

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) { // Cap at 95% until actually loaded
          return 95;
        }
        // Accelerating progress curve
        const increment = prev < 50 ? 8 : prev < 75 ? 4 : 2;
        return Math.min(prev + increment, 95);
      });
    }, 35);

    const tryFinish = () => {
      if (isFullyDone) return;
      if (splineFinished && minTimePassed) {
        isFullyDone = true;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
           setIsVisible(false);
           setIsLoading(false); // Update global context
           if (onLoadingComplete) onLoadingComplete();
        }, 400); // Small delay to show 100%
      }
    };

    const onSplineEvent = () => {
      splineFinished = true;
      tryFinish();
    };

    // Listen for events from the Spline component (RetroComputer)
    window.addEventListener('spline-loaded', onSplineEvent);
    window.addEventListener('spline-error', onSplineEvent);

    // Minimum display time for the animation to feel complete
    const minimumTimer = setTimeout(() => {
      minTimePassed = true;
      tryFinish();
    }, 300); 

    // Safety timeout: If Spline fails to load within 3 seconds, finish anyway
    const safetyTimer = setTimeout(() => {
      splineFinished = true;
      tryFinish();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(minimumTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener('spline-loaded', onSplineEvent);
      window.removeEventListener('spline-error', onSplineEvent);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(5px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
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
          {/* Side Indicator - Sticking to the right side */}
          <div
            style={{
              position: "fixed",
              right: "0",
              top: "0",
              bottom: "0",
              width: typeof window !== 'undefined' && window.innerWidth < 768 ? "40px" : "60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: "1px solid rgba(49, 151, 149, 0.2)",
              background: "rgba(20, 20, 23, 0.5)",
              backdropFilter: "blur(5px)",
              zIndex: 100,
              transition: "width 0.3s ease"
            }}
          >
             <div
               style={{
                 writingMode: "vertical-lr",
                 transform: "rotate(180deg)",
                 color: "#319795",
                 fontFamily: "var(--font-jetbrains), monospace",
                 fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? "10px" : "12px",
                 fontWeight: 600,
                 letterSpacing: typeof window !== 'undefined' && window.innerWidth < 768 ? "2px" : "4px",
                 opacity: 0.8,
                 marginBottom: "20px"
               }}
             >
               SYS_LOAD
             </div>
             <div style={{ height: typeof window !== 'undefined' && window.innerWidth < 768 ? "60px" : "100px", width: "1px", background: "rgba(49, 151, 149, 0.2)", marginBottom: "16px" }} />
             <div 
               style={{ 
                 color: "#319795", 
                 fontFamily: "var(--font-jetbrains), monospace", 
                 fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? "12px" : "14px", 
                 fontWeight: "bold" 
               }}
             >
               {progress}%
             </div>
          </div>

          {/* Subtle animated background grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(49,151,149,0.08) 1px, transparent 0)",
              backgroundSize: "40px 40px",
              opacity: 0.6,
              display: typeof window !== 'undefined' && window.innerWidth < 768 ? 'none' : 'block'
            }}
          />

          {/* Glow orb behind content */}
          {typeof window !== 'undefined' && window.innerWidth >= 768 && (
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            style={{
              position: "relative",
              width: "min(480px, 90vw)",
              background: "rgba(20, 20, 23, 0.75)",
              backdropFilter: "blur(25px)",
              border: "1px solid rgba(49,151,149,0.15)",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 40px rgba(49,151,149,0.1)",
            }}
          >
            {/* Scanner Line Animation */}
            <motion.div
              animate={{
                top: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(49,151,149,0.5), transparent)",
                zIndex: 2,
                pointerEvents: "none"
              }}
            />

            {/* Terminal title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.02)"
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", boxShadow: "0 0 8px rgba(255,95,87,0.3)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", boxShadow: "0 0 8px rgba(254,188,46,0.3)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", boxShadow: "0 0 8px rgba(40,200,64,0.3)" }} />
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "10px",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "1.5px",
                  fontWeight: 500
                }}
              >
                PROD_INIT_PHASE
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: "28px 32px 36px" }}>
              {/* Command line */}
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
                <span style={{ color: "rgba(255,255,255,0.85)" }}>run sync --portfolio</span>
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: "8px",
                    height: "16px",
                    background: "#319795",
                    marginLeft: "2px",
                  }}
                />
              </div>

              {/* Message with subtle glow */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12.5px",
                  color: "rgba(94,234,212,0.9)",
                  margin: "0 0 28px 0",
                  lineHeight: 1.8,
                  textShadow: "0 0 10px rgba(49,151,149,0.3)"
                }}
              >
                {message}
              </motion.p>

              {/* Progress Container */}
              <div style={{ position: "relative" }}>
                <div
                    style={{
                      width: "100%",
                      height: "2px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "2px",
                      overflow: "hidden",
                      marginBottom: "12px"
                    }}
                >
                    <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
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
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "1px"
                    }}
                >
                    <span>INITIALIZING_HYDRATION</span>
                    <span style={{ color: "#319795" }}>{progress}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Bottom Signature */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: "40px",
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "6px",
              textTransform: "uppercase",
              fontWeight: 700
            }}
          >
            ANKUSH KARMAKAR
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
