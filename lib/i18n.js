"use client";

import React, { createContext, useContext, useState } from "react";

const translations = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
      source: "Source",
    },
    home: {
      role: "Microsoft Certified Tech Consultant | CRM Solutions Specialist",
      title: "Ankush Karmakar",
      subtitle:
        "Tech Consultant · Dynamics CRM Specialist · Data Science Enthusiast",
      aboutTitle: "About Me",
      aboutText:
        "Microsoft Certified Tech Consultant with 2+ years of experience at PwC and EY. Expert in developing data-driven CRM solutions and cloud migrations for major firms. With an strong academic background in B.Tech (CSE), I am passionate about increasing my knowledge in Data Science to develop high-performance data-driven systems.",
      resumeBtn: "My Résumé",
      philosophyTitle: "Approach & Philosophy",
      philosophyText:
        "I believe that technology should be an enabler, not a bottleneck. My approach to CRM implementation focuses on 'Clean Data, Clean Logic'—ensuring that enterprise systems are not just functional, but scalable and maintainable. I bridge the gap between complex business requirements and high-performance technical implementation, always prioritizing user experience and data integrity.",
      workTitle: "Work Experience",
      pwcRole: "Associate",
      pwcDesc:
        "• Managed and enhanced Dynamics CRM solutions for enterprise clients like Apollo Hospitals & DIEZ.\n• Engineering robust C# plugins and Power Automate flows, leading fit-gap assessments, and cutting system delivery timelines by 15-20%.\n• Leading client workshops to translate business needs into technical specifications.",
      eyRole: "Associate Consultant",
      eyDesc:
        "• Implemented large-scale CRM customizations for HDFC Life & Aditya Birla Capital.\n• Drove backend data integrity via advanced SQL and deployed complex business logic utilizing .NET (C#) and JavaScript.\n• Optimized database queries resulting in a 30% reduction in report generation time.",
      eduTitle: "Education",
      eduBtech: "Bachelor of Technology in Computer Science and Engineering",
      eduBtechDesc:
        "• Grade: 8.7 / 10.0 DGPA\n• Key Coursework: Machine Learning, Artificial Intelligence, DBMS, Design & Analysis of Algorithms, Statistics, and Numerical Methods.",
      eduHs: "Higher Secondary",
      eduHsDesc: "Stream: Science",
      eduSec: "Secondary",
      eduSecDesc: "",
      skillsTitle: "Core Competencies",
      skillCats: {
        dev: "Development stack",
        cloud: "Cloud & CRM ecosystems",
        data: "Data & AI",
      },
      certTitle: "Professional Certifications",
      hobbiesTitle: "Beyond Code 🤍",
      hobbiesText:
        "When I'm not developing CRM systems, you'll find me on the football pitch or analyzing match statistics. I am a firm believer in the discipline and teamwork that sports instill in engineering projects.",
      webTitle: "Connect with me",
    },
    projects: {
      title: "Projects",
      highlightsTitle: "Key Highlights",
      challengesTitle: "Technical Challenges",
      drivesafeTitle: "DriveSafe AI: Real-Time Driver Drowsiness Detection",
      drivesafeDesc:
        "A high-performance computer vision system designed for road safety.",
      drivesafeHighlights: [
        "97.24% accuracy on MobileNetV3Large model",
        "Quantized to 4.3MB TFLite for edge execution",
        "Zero-latency FastAPI WebSocket architecture",
      ],
      drivesafeChallenges:
        "Achieving real-time inference on low-power CPU devices while maintaining high precision under varying lighting conditions.",
      meteordashTitle: "MeteorDash: Gesture-Controlled Browser Game",
      meteordashDesc:
        "An immersive browser game utilizing hand-tracking for intuitive gameplay.",
      meteordashHighlights: [
        "MediaPipe integration for real-time hand-tilting translation",
        "Dynamic pause/resume logic based on visibility",
        "Persistent high-score tracking via secure cookies",
      ],
      meteordashChallenges:
        "Smoothing out jittery gesture detection and ensuring cross-browser performance for MediaPipe's heavy ML overhead.",
      appleTitle: "Apple iPhone 15 Series Landing Page",
      appleDesc:
        "A premium, high-fidelity clone focused on animations and 3D interactions.",
      appleHighlights: [
        "GSAP scroll-driven typography animations",
        "Three.js real-time 3D model interaction",
        "Pixel-perfect responsive Apple aesthetic",
      ],
      appleChallenges:
        "Optimizing high-poly 3D models to maintain 60FPS while scrolling through complex GSAP timelines.",
      sourceBtn: "Source",
      demoBtn: "Live Demo",
    },
    contact: {
      title: "Contact Me",
      subtitle:
        "Feel free to reach out for collaborations, opportunities, or just a friendly hello. I'd love to hear from you!",
      formTitle: "Drop a Message",
      nameLabel: "Your Name",
      namePlaceholder: "John Doe",
      emailLabel: "Your Email",
      emailPlaceholder: "john@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Project collaboration",
      messageLabel: "Message",
      messagePlaceholder: "Hi Ankush, I'd like to...",
      submitBtn: "Send Message",
    },
    chat: {
      assistantName: "Ankush AI",
      subtitle: "Ask me anything about his experience",
      placeholder: "Ask the assistant...",
      sendAria: "Send Message",
      toggleAria: "Ask AI Assistant",
      emptyState: "Try asking: What are your skills?",
      errorMessage: "Error connecting to AI.",
      suggestedQuestions: [
        "What are your core technical skills?",
        "Tell me about DriveSafe AI.",
        "Show me your certifications.",
        "What is your academic background?",
        "Will you move to Germany?",
      ],
    },
  },
  de: {
    nav: {
      about: "Über mich",
      projects: "Projekte",
      contact: "Kontakt",
      source: "Quellcode",
    },
    home: {
      role: "Microsoft Certified Tech Consultant | CRM Solutions Spezialist",
      title: "Ankush Karmakar",
      subtitle:
        "Tech Consultant · Dynamics CRM Spezialist · Data Science Enthusiast",
      aboutTitle: "Über mich",
      aboutText:
        "Microsoft zertifizierter Technologieberater mit über 2 Jahren Erfahrung bei PwC und EY. Experte für die Entwicklung datengesteuerter CRM-Lösungen und Cloud-Migrationen für große Unternehmen. Mit einem starken akademischen Hintergrund in B.Tech (Informatik) widme ich mich mit Leidenschaft der Erweiterung meines Wissens im Bereich Data Science, um lebensstarke, datengesteuerte Systeme zu entwickeln.",
      resumeBtn: "Mein Lebenslauf",
      philosophyTitle: "Ansatz & Philosophie",
      philosophyText:
        "Ich glaube, dass Technologie ein Enabler sein sollte, kein Engpass. Mein Ansatz zur CRM-Implementierung konzentriert sich auf 'Saubere Daten, Saubere Logik' – um sicherzustellen, dass Unternehmenssysteme nicht nur funktionsfähig, sondern auch skalierbar und wartbar sind.",
      workTitle: "Berufserfahrung",
      pwcRole: "Associate",
      pwcDesc:
        "• Verwaltung und Optimierung der Dynamics CRM-Lösungen für Unternehmenskunden wie Apollo Hospitals & DIEZ.\n• Entwicklung robuster C#-Plugins und Power Automate-Flows, Leitung von Fit-Gap-Analysen und Reduzierung von Systembereitstellungszeiten um 15-20%.\n• Leitung von Workshops zur Übersetzung von Geschäftsanforderungen in technische Spezifikationen.",
      eyRole: "Associate Consultant",
      eyDesc:
        "• Implementierung umfangreicher CRM-Anpassungen für HDFC Life & Aditya Birla Capital.\n• Sicherstellung der Backend-Datenintegrität durch SQL und Bereitstellung komplexer Geschäftslogik mit .NET (C#) und JavaScript.\n• Optimierung von Abfragen zur Reduzierung der Berichtszeit um 30%.",
      eduTitle: "Ausbildung",
      eduBtech: "Bachelor of Technology in Informatik und Computertechnik",
      eduBtechDesc:
        "• Note: 8.7 / 10.0 DGPA\n• Wichtige Kursinhalte: Maschinelles Lernen, Künstliche Intelligenz, DBMS, Design & Analyse von Algorithmen, Statistik und numerische Methoden.",
      eduHs: "Allgemeine Hochschulreife",
      eduHsDesc: "Zweig: Naturwissenschaften",
      eduSec: "Mittlere Reife",
      eduSecDesc: "",
      skillsTitle: "Kernkompetenzen",
      skillCats: {
        dev: "Entwicklungs-Stack",
        cloud: "Cloud & CRM Ökosysteme",
        data: "Daten & KI",
      },
      certTitle: "Berufliche Zertifizierungen",
      hobbiesTitle: "Hinter dem Code 🤍",
      hobbiesText:
        "Wenn ich keine CRM-Systeme entwickle, finden Sie mich auf dem Fußballplatz oder bei der Analyse von Spielstatistiken. Ich glaube fest an die Disziplin und den Teamgeist des Sports.",
      webTitle: "Kontakt aufnehmen",
    },
    projects: {
      title: "Projekte",
      highlightsTitle: "Highlights",
      challengesTitle: "Technische Herausforderungen",
      drivesafeTitle: "DriveSafe AI: Echtzeit-Erkennung von Fahrerlagigkeit",
      drivesafeDesc:
        "Ein leistungsstarkes Computer-Vision-System für die Verkehrssicherheit.",
      drivesafeHighlights: [
        "97,24% Genauigkeit mit MobileNetV3Large",
        "Quantisiert auf 4,3 MB TFLite",
        "Latenzfreie FastAPI-WebSocket-Architektur",
      ],
      drivesafeChallenges:
        "Echtzeit-Inferenz auf leistungsschwachen CPU-Geräten unter wechselnden Lichtverhältnissen.",
      meteordashTitle: "MeteorDash: Gestengesteuertes Browser-Spiel",
      meteordashDesc:
        "Ein immersives Browser-Spiel, das Hand-Tracking für intuitives Gameplay nutzt.",
      meteordashHighlights: [
        "MediaPipe-Integration für Echtzeit-Handgestensteuerung",
        "Dynamische Pause/Fortsetzen-Logik",
        "Dauerhafte Highscore-Verfolgung per Cookies",
      ],
      meteordashChallenges:
        "Glättung der Gestenerkennung und Sicherstellung der Browserleistung trotz hoher ML-Last.",
      appleTitle: "Apple iPhone 15 Landing Page",
      appleDesc:
        "Ein hochwertiger Klon mit Fokus auf Animationen und 3D-Interaktionen.",
      appleHighlights: [
        "GSAP scrollgesteuerte Typografie-Animationen",
        "Three.js Echtzeit-3D-Modell-Interaktion",
        "Pixelperfektes responsives Apple-Design",
      ],
      appleChallenges:
        "Optimierung von 3D-Modellen für stabile 60FPS während komplexer GSAP-Animationen.",
      sourceBtn: "Quellcode",
      demoBtn: "Live-Demo",
    },
    contact: {
      title: "Kontaktieren Sie mich",
      subtitle:
        "Zögern Sie nicht, sich für Kooperationen, Gelegenheiten oder einfach nur für ein freundliches Hallo zu melden. Ich würde mich freuen, von Ihnen zu hören!",
      formTitle: "Schreiben Sie mir",
      nameLabel: "Ihr Name",
      namePlaceholder: "Max Mustermann",
      emailLabel: "Ihre E-Mail",
      emailPlaceholder: "max@beispiel.de",
      subjectLabel: "Betreff",
      subjectPlaceholder: "Projektzusammenarbeit",
      messageLabel: "Nachricht",
      messagePlaceholder: "Hallo Ankush, ich würde gerne...",
      submitBtn: "Nachricht Senden",
    },
    chat: {
      assistantName: "Ankush AI",
      subtitle: "Frag mich alles über seine Erfahrung",
      placeholder: "Den Assistenten fragen...",
      sendAria: "Nachricht senden",
      toggleAria: "KI-Assistenten fragen",
      emptyState: "Probier: Was sind deine Fähigkeiten?",
      errorMessage: "Fehler bei der Verbindung zur KI.",
      suggestedQuestions: [
        "Was sind deine Kernkompetenzen?",
        "Erzähl mir von DriveSafe AI.",
        "Zeig mir deine Zertifizierungen.",
        "Was ist dein akademischer Hintergrund?",
        "Wirst du nach Deutschland ziehen?",
      ],
    },
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "de" : "en"));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
