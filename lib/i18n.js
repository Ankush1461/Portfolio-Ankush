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
      subtitle: "Tech Consultant · Dynamics CRM Specialist · Data Science Enthusiast",
      aboutTitle: "About Me",
      aboutText: "Microsoft Certified Tech Consultant with 2+ years of experience at PwC and EY. Expert in architecting data-driven CRM solutions and cloud migrations for major firms. With an strong academic background in B.Tech (CSE), I am passionate about increasing my knowledge in Data Science to develop high-performance data-driven architectures.",
      resumeBtn: "My Résumé",
      workTitle: "Work Experience",
      pwcRole: "Associate",
      pwcDesc: "Developing CRM architecture for enterprise clients like Apollo Hospitals & DIEZ. Engineering robust C# plugins and Power Automate flows, leading fit-gap assessments, and cutting system delivery timelines by 15-20%.",
      eyRole: "Associate Consultant",
      eyDesc: "Implemented large-scale CRM customizations for HDFC Life & Aditya Birla Capital. Drove backend data integrity via advanced SQL and deployed complex business logic utilizing .NET (C#) and JavaScript.",
      eduTitle: "Education",
      eduBtech: "B.Tech (CSE)",
      eduHs: "Higher Secondary",
      eduSec: "Secondary",
      skillsTitle: "Skills",
      certTitle: "Certifications",
      hobbiesTitle: "I also 🤍",
      hobbiesText: "Football",
      webTitle: "On the web",
    },
    projects: {
      title: "Projects",
      drivesafeTitle: "DriveSafe AI: Real-Time Driver Drowsiness Detection",
      drivesafeDesc: "Developed a 97.24% accurate MobileNetV3Large model, quantized to 4.3MB TFLite for real-time CPU execution. Architected a zero-latency FastAPI WebSocket server for full-duplex JPEG streaming and client-side canvas rendering. Deployed as a Dockerized app on Hugging Face, utilizing OpenCV DNN SSD for robust face detection in low light.",
      meteordashTitle: "MeteorDash: Gesture-Controlled Browser Game",
      meteordashDesc: "Developed a browser-based game using Next.js and MediaPipe to translate real-time hand-tilting gestures into seamless game movement. Engineered a robust detection system that dynamically pauses/resumes execution based on hand visibility. Crafted a responsive UI with Tailwind CSS and implemented persistent cookie-based high-score tracking.",
      appleTitle: "Apple iPhone 15 Series Landing Page",
      appleDesc: "A highly interactive landing page for the Apple iPhone 15 series. Built with Vite and React, leveraging GSAP for deep scroll-driven typography animations and Three.js for immersive, real-time 3D model rendering and interaction to recreate the premium Apple aesthetic and fluid user experience.",
      sourceBtn: "Source",
      demoBtn: "Live Demo"
    },
    contact: {
      title: "Contact Me",
      subtitle: "Feel free to reach out for collaborations, opportunities, or just a friendly hello. I'd love to hear from you!",
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
    }
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
      subtitle: "Tech Consultant · Dynamics CRM Spezialist · Data Science Enthusiast",
      aboutTitle: "Über mich",
      aboutText: "Microsoft zertifizierter Technologieberater mit über 2 Jahren Erfahrung bei PwC und EY. Experte für die Architektur datengesteuerter CRM-Lösungen und Cloud-Migrationen für große Unternehmen. Mit einem starken akademischen Hintergrund in B.Tech (Informatik) widme ich mich mit Leidenschaft der Erweiterung meines Wissens im Bereich Data Science, um leistungsstarke, datengesteuerte Architekturen zu entwickeln.",
      resumeBtn: "Mein Lebenslauf",
      workTitle: "Berufserfahrung",
      pwcRole: "Associate",
      pwcDesc: "Entwicklung von CRM-Architekturen für Unternehmenskunden wie Apollo Hospitals & DIEZ. Entwicklung robuster C#-Plugins und Power Automate-Flows, Durchführung von Fit-Gap-Analysen und Reduzierung von Systembereitstellungszeiten um 15-20%.",
      eyRole: "Associate Consultant",
      eyDesc: "Implementierung umfangreicher CRM-Anpassungen für HDFC Life & Aditya Birla Capital. Sicherstellung der Backend-Datenintegrität durch erweitertes SQL und Bereitstellung komplexer Geschäftslogik mit .NET (C#) und JavaScript.",
      eduTitle: "Ausbildung",
      eduBtech: "B.Tech (Informatik)",
      eduHs: "Allgemeine Hochschulreife",
      eduSec: "Mittlere Reife",
      skillsTitle: "Fähigkeiten",
      certTitle: "Zertifizierungen",
      hobbiesTitle: "Ich mag außerdem 🤍",
      hobbiesText: "Fußball",
      webTitle: "Im Netz",
    },
    projects: {
      title: "Projekte",
      drivesafeTitle: "DriveSafe AI: Echtzeit-Erkennung von Fahrerlagigkeit",
      drivesafeDesc: "Entwicklung eines zu 97,24% präzisen MobileNetV3Large-Modells, quantisiert in ein 4,3-MB-TFLite-Format für Echtzeitausführung. Architektur eines latenzfreien FastAPI-WebSocket-Servers für Vollduplex-JPEG-Streaming und clientseitiges Canvas-Rendering. Bereitstellung als dockerisierte App auf Hugging Face unter Verwendung von OpenCV DNN SSD für robuste Gesichtserkennung.",
      meteordashTitle: "MeteorDash: Gestengesteuertes Browser-Spiel",
      meteordashDesc: "Entwicklung eines browserbasierten Spiels mit Next.js und MediaPipe zur Übersetzung von Handbewegungen in Echtzeit. Aufbau eines robusten Erkennungssystems, das die Ausführung abhängig von der Handsichtbarkeit dynamisch pausiert. Erstellung einer responsiven Benutzeroberfläche mit Tailwind CSS und Highscore-Verfolgung per Cookies.",
      appleTitle: "Apple iPhone 15 Landing Page",
      appleDesc: "Eine hochgradig interaktive Landingpage für die Apple iPhone 15 Serie. Erstellt mit Vite und React, unter Verwendung von GSAP für scrollgesteuerte Typografie-Animationen und Three.js für immersives 3D-Modell-Rendering in Echtzeit.",
      sourceBtn: "Quellcode",
      demoBtn: "Live-Demo"
    },
    contact: {
      title: "Kontaktieren Sie mich",
      subtitle: "Zögern Sie nicht, sich für Kooperationen, Gelegenheiten oder einfach nur für ein freundliches Hallo zu melden. Ich würde mich freuen, von Ihnen zu hören!",
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
    }
  }
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
