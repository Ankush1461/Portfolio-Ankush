"use client";

import { Box, Button, Input, Flex, Text, IconButton } from "@chakra-ui/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LuMessageCircle,
  LuX,
  LuSend,
  LuSparkles,
  LuBot,
  LuRefreshCw,
  LuTrash2,
} from "react-icons/lu";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useLanguage } from "@/lib/i18n";

/* ── Typing Dots Animation ──────────────────────────────────────── */
const TypingDots = () => (
  <Flex gap="4px" alignItems="center" h="20px">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut",
        }}
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#319795",
        }}
      />
    ))}
  </Flex>
);

/* ── Chat Message Bubble ────────────────────────────────────────── */
const ChatBubble = ({ message, userBubble, aiBubble, textColor, aiTextColor }) => {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <Box
        bg={isUser ? userBubble : aiBubble}
        color={isUser ? textColor : aiTextColor}
        px={3.5}
        py={2.5}
        borderRadius="2xl"
        borderBottomRightRadius={isUser ? "4px" : "2xl"}
        borderBottomLeftRadius={isUser ? "2xl" : "4px"}
        maxWidth="85%"
        fontSize="sm"
        lineHeight="1.55"
        whiteSpace="pre-wrap"
        wordBreak="break-word"
        opacity={message.isError ? 0.75 : 1}
      >
        {message.content || ""}
      </Box>
    </motion.div>
  );
};

/* ── Main Component ─────────────────────────────────────────────── */
const ChatAssistant = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const abortRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const inputRef = useRef(null);

  const chatStrings = t?.chat || {};
  const suggestedQuestions = chatStrings.suggestedQuestions || [
    "What are your core technical skills?",
    "Tell me about DriveSafe AI.",
    "Show me your certifications.",
    "What is your academic background?",
    "Will you move to Germany?",
  ];

  /* ── LocalStorage Cache (load once) ────────────────────────────── */
  useEffect(() => {
    try {
      const cached = localStorage.getItem("ai-chat-history");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed.slice(-20));
        }
      }
    } catch { /* silent */ }
  }, []);

  /* Save to localStorage on change */
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem("ai-chat-history", JSON.stringify(messages.slice(-20)));
      } catch { /* silent */ }
    }
  }, [messages]);

  /* ── Auto-Scroll ───────────────────────────────────────────────── */
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isLoading, scrollToBottom]);

  /* Focus + scroll on open */
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
        inputRef.current?.focus();
      }, 120);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* ── Click Outside to Close ────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  /* Escape key */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  /* ── Send Message (functional setState to avoid stale closures) ── */
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      // Abort any in-flight request
      if (abortRef.current) abortRef.current.abort();

      const userMsg = {
        id: Date.now().toString(),
        role: "user",
        content: trimmed,
      };

      // Use functional update to get latest messages (no stale closure)
      let contextMessages;
      setMessages((prev) => {
        contextMessages = [...prev, userMsg];
        return contextMessages;
      });
      setLocalInput("");
      setIsLoading(true);
      setHasError(false);

      const controller = new AbortController();
      abortRef.current = controller;

      // Small delay to let state settle before reading contextMessages
      await new Promise((r) => setTimeout(r, 10));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: (contextMessages || [userMsg]).slice(-6),
            language,
          }),
          signal: controller.signal,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "API error");

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.text || "",
          },
        ]);
        setHasError(false);
      } catch (err) {
        if (err.name === "AbortError") return;

        const errText =
          language === "de"
            ? "Entschuldigung, ich konnte keine Antwort bekommen. Bitte versuche es noch einmal!"
            : "Sorry, I couldn't get a response. Please try again!";

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: errText,
            isError: true,
          },
        ]);
        setHasError(true);
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [language],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;
    sendMessage(localInput);
  };

  const handleSuggested = (q) => {
    if (isLoading) return;
    setLocalInput(q);
    sendMessage(q);
  };

  const handleRetry = () => {
    setMessages((prev) => {
      const withoutErrors = prev.filter((m) => !m.isError);
      const lastUser = [...withoutErrors].reverse().find((m) => m.role === "user");
      if (lastUser) {
        setTimeout(() => sendMessage(lastUser.content), 50);
      }
      return withoutErrors;
    });
    setHasError(false);
  };

  const handleClear = () => {
    setMessages([]);
    setHasError(false);
    try { localStorage.removeItem("ai-chat-history"); } catch { /* silent */ }
  };

  /* ── Theme Colors ──────────────────────────────────────────────── */
  const border = useColorModeValue("whiteAlpha.500", "whiteAlpha.200");
  const userBubble = useColorModeValue("teal.500", "teal.300");
  const aiBubble = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const textColor = useColorModeValue("white", "gray.900");
  const aiTextColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const headerBg = useColorModeValue(
    "linear-gradient(135deg, rgba(49,151,149,0.12) 0%, rgba(94,234,212,0.08) 100%)",
    "linear-gradient(135deg, rgba(49,151,149,0.18) 0%, rgba(94,234,212,0.1) 100%)",
  );
  const pulseBorderColor = useColorModeValue("white", "#1a1a1e");

  return (
    <>
      {/* ── Toggle Button ───────────────────────────────────────── */}
      <Box
        position="fixed"
        bottom={{ base: 3, sm: 4, md: 8 }}
        right={{ base: 3, sm: 4, md: 8 }}
        zIndex={100}
      >
        <motion.div
          ref={toggleButtonRef}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "tween", duration: 0.15 }}
          style={{
            borderRadius: "50%",
            width: "56px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            className="animate-glow"
            colorPalette="teal"
            size="lg"
            borderRadius="full"
            aria-label={chatStrings.toggleAria || "Ask AI Assistant"}
            height={{ base: "56px", md: "64px" }}
            width={{ base: "56px", md: "64px" }}
            border="none"
            padding={0}
            _focus={{ boxShadow: "none", outline: "none" }}
            _active={{ bg: "transparent" }}
            bg="teal.500"
            color="white"
          >
            {isOpen ? <LuX size={28} /> : <LuMessageCircle size={28} />}
          </IconButton>
        </motion.div>
      </Box>

      {/* ── Chat Window ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              bottom: "90px",
              right: "16px",
              zIndex: 99,
              width: "calc(100% - 32px)",
              maxWidth: "380px",
            }}
          >
            <Box
              ref={chatWindowRef}
              className="glass-card"
              borderRadius="2xl"
              boxShadow="2xl"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              height={{ base: "370px", sm: "420px", md: "500px" }}
            >
              {/* ── Header ────────────────────────────────────────── */}
              <Box
                p={4}
                borderBottomWidth="1px"
                borderColor={border}
                bg={headerBg}
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  h="2px"
                  bg="linear-gradient(90deg, transparent, #319795, #5eead4, transparent)"
                  opacity={0.6}
                />
                <Flex alignItems="center" gap={3}>
                  <Box
                    position="relative"
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    bg="linear-gradient(135deg, #319795 0%, #5eead4 100%)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    boxShadow="0 0 16px rgba(49,151,149,0.35)"
                  >
                    <LuBot size={20} color="white" />
                    <Box
                      position="absolute"
                      bottom="0"
                      right="0"
                      w="12px"
                      h="12px"
                      borderRadius="full"
                      bg="#28c840"
                      border="2px solid"
                      borderColor={pulseBorderColor}
                      className="status-pulse"
                    />
                  </Box>
                  <Box flex={1} minW={0}>
                    <Flex alignItems="center" gap={1.5} mb="2px">
                      <Text
                        fontWeight="bold"
                        fontSize="md"
                        letterSpacing="tight"
                        bg="linear-gradient(90deg, #319795, #5eead4)"
                        backgroundClip="text"
                        style={{
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {chatStrings.assistantName || "Ankush AI"}
                      </Text>
                      <LuSparkles size={14} color="#5eead4" opacity={0.7} />
                    </Flex>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      _dark={{ color: "gray.400" }}
                      lineHeight="short"
                    >
                      {chatStrings.subtitle || "Ask me anything about his experience"}
                    </Text>
                  </Box>
                  {/* Clear chat button */}
                  {messages.length > 0 && (
                    <IconButton
                      size="xs"
                      variant="ghost"
                      borderRadius="full"
                      onClick={handleClear}
                      aria-label="Clear chat"
                      color="gray.400"
                      _hover={{ color: "red.400", bg: "whiteAlpha.100" }}
                      opacity={0.6}
                      _dark={{ _hover: { color: "red.300" } }}
                    >
                      <LuTrash2 size={14} />
                    </IconButton>
                  )}
                </Flex>
              </Box>

              {/* ── Messages Area ─────────────────────────────────── */}
              <Box
                flex={1}
                overflowY="auto"
                p={4}
                display="flex"
                flexDirection="column"
                gap={3}
                css={{
                  "&::-webkit-scrollbar": { width: "4px" },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(49,151,149,0.2)",
                    borderRadius: "10px",
                  },
                }}
              >
                {messages.length === 0 ? (
                  <Flex
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                    opacity={0.5}
                    direction="column"
                    gap={2}
                  >
                    <LuMessageCircle size={32} />
                    <Text fontSize="sm" textAlign="center">
                      {chatStrings.emptyState || 'Try asking: "What are your skills?"'}
                    </Text>
                  </Flex>
                ) : (
                  messages.map((m) => (
                    <ChatBubble
                      key={m.id}
                      message={m}
                      userBubble={userBubble}
                      aiBubble={aiBubble}
                      textColor={textColor}
                      aiTextColor={aiTextColor}
                    />
                  ))
                )}
                {isLoading && (
                  <Flex justifyContent="flex-start">
                    <Box
                      bg={aiBubble}
                      px={3.5}
                      py={2.5}
                      borderRadius="2xl"
                      borderBottomLeftRadius="4px"
                    >
                      <TypingDots />
                    </Box>
                  </Flex>
                )}
                <div ref={messagesEndRef} />
              </Box>

              {/* ── Input Area ────────────────────────────────────── */}
              <Box p={3} borderTopWidth="1px" borderColor={border}>
                {/* Suggested Questions */}
                {messages.length < 4 && (
                  <Flex
                    gap={2}
                    mb={3}
                    overflowX="auto"
                    pb={2}
                    css={{ "&::-webkit-scrollbar": { display: "none" } }}
                  >
                    {suggestedQuestions.map((q) => (
                      <Button
                        key={q}
                        size="xs"
                        variant="outline"
                        borderRadius="full"
                        fontSize="2xs"
                        whiteSpace="nowrap"
                        onClick={() => handleSuggested(q)}
                        borderColor="teal.500"
                        color="teal.500"
                        disabled={isLoading}
                        _hover={{
                          bg: "teal.50",
                          _dark: { bg: "whiteAlpha.100" },
                        }}
                      >
                        {q}
                      </Button>
                    ))}
                  </Flex>
                )}

                <form onSubmit={handleSubmit}>
                  <Flex gap={2}>
                    <Input
                      ref={inputRef}
                      variant="filled"
                      placeholder={chatStrings.placeholder || "Ask the assistant..."}
                      value={localInput}
                      onChange={(e) => setLocalInput(e.target.value)}
                      size="sm"
                      borderRadius="full"
                      bg="blackAlpha.100"
                      _dark={{ bg: "whiteAlpha.100" }}
                      _focus={{ bg: "transparent" }}
                      disabled={isLoading}
                    />
                    {hasError ? (
                      <IconButton
                        type="button"
                        colorPalette="orange"
                        size="sm"
                        borderRadius="full"
                        onClick={handleRetry}
                        aria-label="Retry"
                      >
                        <LuRefreshCw />
                      </IconButton>
                    ) : (
                      <IconButton
                        id="chat-send-btn"
                        type="submit"
                        colorPalette="teal"
                        size="sm"
                        borderRadius="full"
                        disabled={!localInput?.trim() || isLoading}
                        aria-label={chatStrings.sendAria || "Send Message"}
                      >
                        <LuSend />
                      </IconButton>
                    )}
                  </Flex>
                </form>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
