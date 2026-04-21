"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Heading,
  Box,
  Text,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Link,
  Flex,
  Icon,
} from "@chakra-ui/react";
import Layout from "@/components/layouts/article";
import Section from "@/components/section";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useLanguage } from "@/lib/i18n";
import {
  IoLogoLinkedin,
  IoLogoGithub,
  IoLogoInstagram,
} from "react-icons/io5";
import { LuSend } from "react-icons/lu";



const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const iconColor = useColorModeValue("gray.600", "gray.400");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const body = `Hi Ankush,%0D%0A%0D%0AMy name is ${encodeURIComponent(name)}.%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ARegards,%0D%0A${encodeURIComponent(name)}`;
    window.location.href = `mailto:karmakarankush1461@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };



  return (
    <Layout title={t.contact.title}>
      <Flex minH="calc(100vh - 120px)" align="center" justify="center" w="100%">
        <Container>
        <Heading
          as="h3"
          fontSize={20}
          mb={4}
          textDecoration="underline"
          textUnderlineOffset={6}
          textDecorationColor="gray.500"
          textDecorationThickness="4px"
        >
          {t.contact.title}
        </Heading>

        {mounted && (
          <Section delay={0.1}>
            <Text fontSize="sm" mb={6} color={subtitleColor}>
              {t.contact.subtitle}
            </Text>
          </Section>
        )}

        <Section delay={0.2}>
          <Heading
            as="h4"
            fontSize={18}
            mb={4}
            fontFamily="var(--font-m-plus), sans-serif"
          >
            {t.contact.formTitle}
          </Heading>
          <Box
            as="form"
            onSubmit={handleSubmit}
            p={6}
            className="glass-card"
          >
            <SimpleGrid columns={[1, 2]} gap={4} mb={4}>
              <Box>
                <Text fontSize="xs" mb={1} fontWeight="medium" color="gray.500">
                  {t.contact.nameLabel}
                </Text>
                <Input
                  name="name"
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  bg={{ base: "whiteAlpha.700", _dark: "whiteAlpha.100" }}
                  borderColor={{ base: "gray.200", _dark: "whiteAlpha.200" }}
                  size="sm"
                  borderRadius="md"
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal" }}
                />
              </Box>
              <Box>
                <Text fontSize="xs" mb={1} fontWeight="medium" color="gray.500">
                  {t.contact.emailLabel}
                </Text>
                <Input
                  name="email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  bg={{ base: "whiteAlpha.700", _dark: "whiteAlpha.100" }}
                  borderColor={{ base: "gray.200", _dark: "whiteAlpha.200" }}
                  size="sm"
                  borderRadius="md"
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal" }}
                />
              </Box>
            </SimpleGrid>
            <Box mb={4}>
              <Text fontSize="xs" mb={1} fontWeight="medium" color="gray.500">
                {t.contact.subjectLabel}
              </Text>
              <Input
                name="subject"
                placeholder={t.contact.subjectPlaceholder}
                value={formData.subject}
                onChange={handleChange}
                required
                bg={{ base: "whiteAlpha.700", _dark: "whiteAlpha.100" }}
                borderColor={{ base: "gray.200", _dark: "whiteAlpha.200" }}
                size="sm"
                borderRadius="md"
                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal" }}
              />
            </Box>
            <Box mb={4}>
              <Text fontSize="xs" mb={1} fontWeight="medium" color="gray.500">
                {t.contact.messageLabel}
              </Text>
              <Textarea
                name="message"
                placeholder={t.contact.messagePlaceholder}
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                bg={{ base: "whiteAlpha.700", _dark: "whiteAlpha.100" }}
                borderColor={{ base: "gray.200", _dark: "whiteAlpha.200" }}
                size="sm"
                borderRadius="md"
                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal" }}
              />
            </Box>
            <Button type="submit" colorPalette="teal" size="sm" w="full">
              <LuSend /> {t.contact.submitBtn}
            </Button>
          </Box>
        </Section>

        {mounted && (
          <Section delay={0.3}>
            <Flex justifyContent="center" gap={4} mt={4}>
              <Link href="https://github.com/Ankush1461" target="_blank">
                <Icon boxSize={6} color={iconColor} _hover={{ color: "teal.500" }} transition="color 0.2s">
                  <IoLogoGithub />
                </Icon>
              </Link>
              <Link href="https://www.linkedin.com/in/ankush-karmakar" target="_blank">
                <Icon boxSize={6} color={iconColor} _hover={{ color: "teal.500" }} transition="color 0.2s">
                  <IoLogoLinkedin />
                </Icon>
              </Link>
              <Link href="https://www.instagram.com/mysteriously_ecstatic_guy" target="_blank">
                <Icon boxSize={6} color={iconColor} _hover={{ color: "teal.500" }} transition="color 0.2s">
                  <IoLogoInstagram />
                </Icon>
              </Link>
            </Flex>
          </Section>
        )}
        </Container>
      </Flex>
    </Layout>
  );
};

export default Contact;

