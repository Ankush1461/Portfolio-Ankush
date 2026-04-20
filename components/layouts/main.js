"use client";
import { useState } from "react";

import { Box, Container } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "../navbar.js";
import ChatAssistant from "../chat-assistant.js";
import CustomCursor from "../custom-cursor.js";
import ScrollProgress from "../ScrollProgress.js";
import RetroComputer from "../RetroComputer.js";
import Footer from "../footer.js";

const ParticleBackground = dynamic(() => import("../ParticleBackground"), { ssr: false });
const LoadingScreen = dynamic(() => import("../LoadingScreen"), { ssr: false });

import { AnimatePresence, motion } from "motion/react";
import { useLoading } from "@/lib/loading-context";

const Main = ({ children }) => {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoading();

  return (
    <>
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={!isLoading ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <Box as="main" pb={8} position="relative" zIndex={1}>
          <ParticleBackground />
          <ScrollProgress />
          <Navbar path={pathname} />
          <Container maxW="container.md" pt={14} position="relative">
             {/* 3D Scene - Always mounted to allow background initialization */}
             <Box 
                position="absolute"
                top={14}
                left="50%"
                transform="translateX(-50%)"
                width="100%"
                opacity={pathname === '/' ? 1 : 0}
                visibility={pathname === '/' ? "visible" : "hidden"}
                pointerEvents={pathname === '/' && !isLoading ? "auto" : "none"}
                zIndex={0}
              >
                <RetroComputer />
              </Box>

              {/* Page Content - Mounted immediately but reveal is handled by Section components via Context */}
              <AnimatePresence mode="wait" initial={false}>
                <Box key={pathname}>
                  {children}
                </Box>
              </AnimatePresence>
              <Footer />
          </Container>
        </Box>
      </motion.div>
      <ChatAssistant />
      <CustomCursor />
    </>
  );
};

export default Main;