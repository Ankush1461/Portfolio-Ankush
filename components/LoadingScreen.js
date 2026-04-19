import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

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
export default function LoadingScreen() {
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
    if (ssrOverlay) ssrOverlay.remove();

    let splineFinished = false;
    let minTimePassed = false;
    let isFullyDone = false;

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) { // Cap at 90% until actually loaded
          return 90;
        }
        // Accelerating progress curve
        const increment = prev < 50 ? 6 : prev < 75 ? 3 : 1;
        return Math.min(prev + increment, 90);
      });
    }, 45);

    const tryFinish = () => {
      if (isFullyDone) return;
      if (splineFinished && minTimePassed) {
        isFullyDone = true;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setIsVisible(false), 400); // Small delay to show 100%
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
    }, 3000); 

    return () => {
      clearInterval(interval);
      clearTimeout(minimumTimer);
      window.removeEventListener('spline-loaded', onSplineEvent);
      window.removeEventListener('spline-error', onSplineEvent);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#202023",
            overflow: "hidden",
          }}
        >
          {/* Subtle animated background grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(49,151,149,0.08) 1px, transparent 0)",
              backgroundSize: "40px 40px",
              opacity: 0.6,
            }}
          />

          {/* Glow orb behind content */}
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
              filter: "blur(40px)",
            }}
          />

          {/* Terminal window */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "relative",
              width: "min(420px, 85vw)",
              background: "rgba(30, 30, 34, 0.9)",
              border: "1px solid rgba(49,151,149,0.2)",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(49,151,149,0.1)",
            }}
          >
            {/* Terminal title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "11px",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.5px",
                }}
              >
                ankush@portfolio ~
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: "20px 20px 24px" }}>
              {/* Command line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "13px",
                }}
              >
                <span style={{ color: "#319795", fontWeight: 700 }}>❯</span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>npx load-portfolio</span>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "16px",
                    background: "#319795",
                    marginLeft: "2px",
                    animation: "cursorBlink 0.8s steps(1) infinite",
                  }}
                />
                <style>{`
                  @keyframes cursorBlink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                  }
                `}</style>
              </div>

              {/* Message with typewriter effect */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "12px",
                  color: "rgba(94,234,212,0.8)",
                  margin: "0 0 20px 0",
                  lineHeight: 1.6,
                }}
              >
                {message}
              </motion.p>

              {/* Progress bar */}
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #319795, #5eead4)",
                    borderRadius: "2px",
                    boxShadow: "0 0 12px rgba(49,151,149,0.5)",
                    transition: "width 50ms ease-out",
                  }}
                />
              </div>

              {/* Progress percentage */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                <span>SYS_LOAD</span>
                <span>{progress}%</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom signature */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{
              position: "relative",
              marginTop: "32px",
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Ankush Karmakar
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
