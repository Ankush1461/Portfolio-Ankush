import { Box, Button, Input, Flex, Text, IconButton, Spinner } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LuMessageCircle, LuX, LuSend } from 'react-icons/lu';
import { useColorModeValue } from '@/components/ui/color-mode';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState('');
  
  // Local state tracking to safely bypass AI SDK networking completely
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cacheLoaded, setCacheLoaded] = useState(false);

  const suggestedQuestions = [
    "What are your core technical skills?",
    "Tell me about DriveSafe AI.",
    "Show me your certifications.",
    "What is your academic background?",
    "Will you move to Germany?"
  ];

  useEffect(() => {
    try {
      const cached = localStorage.getItem('ai-chat-history');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.length > 0) {
           setMessages(parsed);
        }
      }
      } catch(err) { /* Catching silently to keep console clean */ }
    setCacheLoaded(true);
  }, []);

  useEffect(() => {
    if (cacheLoaded && messages && messages.length > 0) {
      localStorage.setItem('ai-chat-history', JSON.stringify(messages));
    }
  }, [messages, cacheLoaded]);

  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && 
        chatWindowRef.current && 
        !chatWindowRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const bg = useColorModeValue('whiteAlpha.800', '#202023dc');
  const border = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200');
  const userBubble = useColorModeValue('teal.500', 'teal.300');
  const aiBubble = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const textColor = useColorModeValue('white', 'gray.900');
  const aiTextColor = useColorModeValue('gray.800', 'whiteAlpha.900');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;
    
    // Optimistic UI Update
    const userMessage = { id: Date.now().toString(), role: 'user', content: localInput.trim(), text: localInput.trim() };
    const newContext = [...(messages || []), userMessage];
    
    setMessages(newContext);
    setLocalInput('');
    setIsLoading(true);

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ messages: newContext }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        
        setMessages([...newContext, { id: Date.now().toString(), role: 'assistant', content: data.text, text: data.text }]);
    } catch(err) {
        setMessages([...newContext, { id: Date.now().toString(), role: 'assistant', content: "Error connecting to AI.", text: "Error connecting to AI." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <Box position="fixed" bottom={{ base: 4, md: 8 }} right={{ base: 4, md: 8 }} zIndex={100}>
        <motion.div 
          ref={toggleButtonRef}
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          style={{ 
            borderRadius: "full",
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            className="animate-glow"
            colorPalette="teal"
            size="lg"
            borderRadius="full"
            aria-label="Ask AI Assistant"
            height="64px"
            width="64px"
            border="none"
            padding={0}
            _focus={{ boxShadow: "none", outline: "none" }}
            _active={{ bg: "transparent" }}
            bg="teal.500"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {isOpen ? <LuX size={30} /> : <LuMessageCircle size={30} />}
          </IconButton>
        </motion.div>
      </Box>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '30px',
              zIndex: 99,
              width: '100%',
              maxWidth: '350px',
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
              height="500px"
            >
              <Box p={4} borderBottomWidth="1px" borderColor={border} bg="blackAlpha.200">
                <Text fontWeight="bold" fontSize="md">
                  ✨ Ankush AI
                </Text>
                <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
                  Ask me anything about his experience!
                </Text>
              </Box>

              <Box flex={1} overflowY="auto" p={4} display="flex" flexDirection="column" gap={3}>
                {!messages || messages.length === 0 ? (
                  <Flex height="100%" alignItems="center" justifyContent="center" opacity={0.5} direction="column" gap={2}>
                    <LuMessageCircle size={32} />
                    <Text fontSize="sm">Try asking: &quot;What are your skills?&quot;</Text>
                  </Flex>
                ) : (
                  messages.map((m) => (
                    <Flex key={m.id || Math.random()} justifyContent={m.role === 'user' ? 'flex-end' : 'flex-start'}>
                      <Box
                        bg={m.role === 'user' ? userBubble : aiBubble}
                        color={m.role === 'user' ? textColor : aiTextColor}
                        px={3}
                        py={2}
                        borderRadius="2xl"
                        borderBottomRightRadius={m.role === 'user' ? '4px' : '2xl'}
                        borderBottomLeftRadius={m.role === 'user' ? '2xl' : '4px'}
                        maxWidth="85%"
                        fontSize="sm"
                      >
                        {m.content || m.text || (m.parts && m.parts[0]?.text) || ""}
                      </Box>
                    </Flex>
                  ))
                )}
                {isLoading && (
                  <Flex justifyContent="flex-start">
                    <Box bg={aiBubble} px={3} py={2} borderRadius="2xl" borderBottomLeftRadius="4px">
                      <Spinner size="xs" color="teal.500" />
                    </Box>
                  </Flex>
                )}
                <div ref={messagesEndRef} />
              </Box>

              <Box p={3} borderTopWidth="1px" borderColor={border}>
                {/* Suggested Questions Pills */}
                {messages?.length < 4 && (
                  <Flex gap={2} mb={3} overflowX="auto" pb={2} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                    {suggestedQuestions.map((q) => (
                      <Button
                        key={q}
                        size="xs"
                        variant="outline"
                        borderRadius="full"
                        fontSize="2xs"
                        whiteSpace="nowrap"
                        onClick={() => {
                          setLocalInput(q);
                          setTimeout(() => {
                             const btn = document.getElementById('chat-send-btn');
                             btn?.click();
                          }, 100);
                        }}
                        borderColor="teal.500"
                        color="teal.500"
                        _hover={{ bg: "teal.50", _dark: { bg: "whiteAlpha.100" } }}
                      >
                        {q}
                      </Button>
                    ))}
                  </Flex>
                )}
                
                <form onSubmit={handleManualSubmit}>
                  <Flex gap={2}>
                    <Input
                      variant="filled"
                      placeholder="Ask the assistant..."
                      value={localInput}
                      onChange={(e) => setLocalInput(e.target.value)}
                      size="sm"
                      borderRadius="full"
                      bg="blackAlpha.100"
                      _dark={{ bg: 'whiteAlpha.100' }}
                      _focus={{ bg: 'transparent' }}
                      autoFocus
                    />
                    <IconButton
                      id="chat-send-btn"
                      type="submit"
                      colorPalette="teal"
                      size="sm"
                      borderRadius="full"
                      disabled={!localInput?.trim() || isLoading}
                      isDisabled={!localInput?.trim() || isLoading}
                      aria-label="Send Message"
                    >
                      <LuSend />
                    </IconButton>
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
