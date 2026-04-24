import { useRef, useState, useEffect } from "react";

const Section = ({
  children,
  delay = 0,
  mb = "4rem",
  direction = "left",
  ...props
}) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [mobileShown, setMobileShown] = useState(false);

  // Mark as mounted after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Desktop: IntersectionObserver WITHOUT once — resets on scroll out
  useEffect(() => {
    if (!mounted || !ref.current) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "0px 0px -120px 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [mounted]);

  // Mobile: IntersectionObserver WITH once — plays once, stays visible
  useEffect(() => {
    if (!mounted || !ref.current) return;
    if (typeof window !== "undefined" && window.innerWidth >= 768) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMobileShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [mounted]);

  // SSR + hydration: identical visible plain div on server and client
  if (!mounted) {
    return (
      <div ref={ref} style={{ marginBottom: mb }} {...props}>
        {children}
      </div>
    );
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Mobile: simple fade-up, plays once
  if (isMobile) {
    return (
      <div
        ref={ref}
        style={{
          marginBottom: mb,
          opacity: mobileShown ? 1 : 0,
          transform: mobileShown ? "translateY(0px)" : "translateY(12px)",
          transition: `opacity 0.25s ease-out ${delay * 0.08}s, transform 0.25s ease-out ${delay * 0.08}s`,
          willChange: "transform, opacity",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }

  // Desktop: full slide-in/out animation, resets when scrolling back up
  const translateHidden = direction === "left" ? -20 : 20;

  return (
    <div
      ref={ref}
      style={{
        marginBottom: mb,
        position: "relative",
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateX(0px)"
          : `translateX(${translateHidden}px)`,
        transition: `opacity 0.45s ease-out ${delay * 0.15}s, transform 0.45s ease-out ${delay * 0.15}s`,
        willChange: "transform, opacity",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Section;
