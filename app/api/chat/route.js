import { NextResponse } from "next/server";

/* ═══════════════════════════════════════════════════════════════════
   ANKUSH PORTFOLIO CHAT API — v3 (Robust / Fast / Multilingual)
   ─────────────────────────────────────────────────────────────────
   Priority chain:  Cache → Gemini → OpenRouter → Offline fallback
   Languages:       English | Deutsch | Denglish → replies in Deutsch
   Performance:     6s timeout, parallel OR racing, in-memory cache
   ═══════════════════════════════════════════════════════════════════ */

/* ── In-Memory Response Cache (survives across requests in same edge instance) */
const responseCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE = 100;

function getCacheKey(text, lang) {
  return `${lang}:${text.toLowerCase().trim().replace(/[^a-zäöüß0-9\s]/g, "").replace(/\s+/g, " ")}`;
}

function getCached(key) {
  const entry = responseCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    responseCache.delete(key);
    return null;
  }
  return entry.text;
}

function setCache(key, text) {
  if (responseCache.size >= MAX_CACHE) {
    const oldest = responseCache.keys().next().value;
    responseCache.delete(oldest);
  }
  responseCache.set(key, { text, ts: Date.now() });
}

/* ── Language Detection ─────────────────────────────────────────── */
function detectLanguage(text) {
  const lower = text.toLowerCase().trim();
  const words = lower.split(/\s+/);

  // Umlauts / ß are a strong German signal
  const hasGermanChars = /[äöüßÄÖÜ]/.test(text);

  // German-specific words (excluding truly ambiguous ones like "an")
  const strongGerman = [
    // Pronouns & articles
    "ich", "du", "er", "sie", "wir", "ihr", "uns", "euch",
    "dein", "deine", "deinen", "deiner", "deinem",
    "sein", "seine", "seinen", "seiner", "seinem",
    "mein", "meine", "meinen", "meiner", "meinem",
    "unser", "unsere", "unserer", "unseren", "unserem",
    "dieser", "diese", "dieses", "diesem", "diesen",
    // Common verbs
    "ist", "bist", "sind", "war", "hast", "hat", "habe", "haben", "hatte",
    "wird", "werden", "kann", "kannst", "können", "koennen",
    "möchte", "möchten", "würde", "würdest", "könntest",
    "soll", "sollte", "muss", "müssen", "macht", "mach",
    "gibt", "mag", "sag", "gib", "komm", "geh", "zeig",
    // Question words
    "was", "wer", "wie", "wo", "wann", "warum", "woher", "wohin", "welche", "welcher",
    // Greetings & interjections
    "hallo", "moin", "servus", "bitte", "danke",
    "ja", "nein", "vielleicht", "natürlich", "gerne",
    "toll", "super", "krass", "spannend", "interessant",
    "guten", "morgen", "abend",
    // Common words
    "nicht", "kein", "keine", "keiner", "auch", "noch", "schon",
    "alles", "klar", "verstanden", "genau", "richtig",
    "über", "nach", "für", "zwischen", "außer", "ohne",
    "weil", "dass", "damit", "trotzdem", "deshalb", "sondern",
    // Imperative/commands
    "erzähl", "erzähle",
    // Portfolio-specific nouns
    "fähigkeiten", "erfahrung", "ausbildung", "beruf", "karriere",
    "projekt", "projekte", "zertifikat", "zertifizierungen",
    "lebenslauf", "arbeit", "firma", "unternehmen",
    "deutschland", "deutsch", "goethe",
    "sprechen", "sprachen", "studium", "studieren",
    "hobbys", "hobbies", "fußball", "fussball", "freizeit",
    "kontakt", "nachricht", "erreichen",
  ];

  // Score based on word boundaries (not substring matching — avoids false positives)
  let score = 0;
  for (const w of words) {
    // Strip trailing punctuation for matching (e.g. "Hobbys?" → "hobbys")
    const clean = w.replace(/[?!.,;:]+$/, "");
    if (strongGerman.includes(clean)) score += 2;
  }
  if (hasGermanChars) score += 5;

  // Check for English tech terms mixed in (indicates Denglish)
  const englishTech = [
    "ai", "api", "crm", "sql", "python", "javascript", "react",
    "nextjs", "azure", "cloud", "data", "science", "ml",
    "machine learning", "deep learning", "backend", "frontend",
    "skills", "tech", "stack",
  ];
  const hasEnglishTech = englishTech.some((t) => lower.includes(t));

  // Threshold of 2 catches even short German sentences like "Was ist das?"
  if (score >= 2 && hasEnglishTech) return "denglish";
  if (score >= 2) return "de";
  return "en";
}

/* ── Offline Fallback Responses ───────────────────────────────── */
const RESPONSES = {
  greetings: {
    en: "Hey there! 👋 I'm the AI assistant for Ankush's portfolio. Ask me anything about his experience, projects, or skills!",
    de: "Hallo! 👋 Ich bin der KI-Assistent für Ankushs Portfolio. Frag mich alles über seine Erfahrung, Projekte oder Fähigkeiten!",
  },
  identity: {
    en: "Ankush Karmakar is a Microsoft Certified Tech Consultant with 2+ years at PwC and EY. He's now transitioning into Data Science and planning a Master's in Germany.",
    de: "Ankush Karmakar ist ein Microsoft-zertifizierter Tech Consultant mit 2+ Jahren bei PwC und EY. Er wechselt jetzt ins Data Science und plant einen Master in Deutschland.",
  },
  skills: {
    en: "Ankush's core skills include: Python, C#, JavaScript, SQL, Dynamics 365 CRM, Microsoft Azure, Power Platform, and Machine Learning.",
    de: "Ankushs Kernkompetenzen: Python, C#, JavaScript, SQL, Dynamics 365 CRM, Microsoft Azure, Power Platform und Machine Learning.",
  },
  projects: {
    en: "His standout projects: 1) DriveSafe AI — real-time driver drowsiness detection (97.24% accuracy) with MobileNetV3Large. 2) MeteorDash — gesture-controlled browser game with MediaPipe hand tracking.",
    de: "Seine herausragenden Projekte: 1) DriveSafe AI — Echtzeit-Erkennung von Fahrerermüdung (97,24% Genauigkeit) mit MobileNetV3Large. 2) MeteorDash — gestengesteuertes Browser-Spiel mit MediaPipe Hand-Tracking.",
  },
  work: {
    en: "He worked at PwC (Associate, Apr–Oct 2025) managing D365 CRM for Apollo Hospitals & DIEZ. At EY (Associate Consultant, 2023–2025), he led CRM customization for HDFC Life & Aditya Birla Capital.",
    de: "Er arbeitete bei PwC (Associate, Apr–Okt 2025) und verwaltete D365 CRM für Apollo Hospitals & DIEZ. Bei EY (Associate Consultant, 2023–2025) leitete er CRM-Anpassungen für HDFC Life & Aditya Birla Capital.",
  },
  education: {
    en: "Ankush holds a B.Tech in Computer Science & Engineering from Narula Institute of Technology (2019–2023) with a grade of 8.7/10.0 DGPA.",
    de: "Ankush hat einen B.Tech in Computer Science & Engineering vom Narula Institute of Technology (2019–2023) mit einer Note von 8,7/10,0 DGPA.",
  },
  certifications: {
    en: "He's Microsoft certified in: Azure AI Fundamentals, Azure Data Fundamentals, Azure Fundamentals, Power Platform Fundamentals, and Dynamics 365 CRM Fundamentals.",
    de: "Er ist Microsoft-zertifiziert in: Azure AI Fundamentals, Azure Data Fundamentals, Azure Fundamentals, Power Platform Fundamentals und Dynamics 365 CRM Fundamentals.",
  },
  germany: {
    en: "Yes! Ankush is planning a Master's in Data Science in Germany. He's learning German (A2 at Goethe-Institut) and preparing for the move.",
    de: "Ja! Ankush plant einen Master in Data Science in Deutschland. Er lernt Deutsch (A2 am Goethe-Institut) und bereitet sich auf den Umzug vor.",
  },
  resume: {
    en: "Click the 'My Résumé' button on the home page to download his full CV with experience, projects, and certifications.",
    de: "Klicke auf den Button 'My Résumé' auf der Startseite, um seinen vollständigen Lebenslauf herunterzuladen.",
  },
  contact: {
    en: "Reach Ankush via the Contact page, LinkedIn (@ankush-karmakar), GitHub (@Ankush1461), or email at karmakarankush1461@gmail.com.",
    de: "Erreiche Ankush über die Kontaktseite, LinkedIn (@ankush-karmakar), GitHub (@Ankush1461) oder per E-Mail an karmakarankush1461@gmail.com.",
  },
  languages: {
    en: "Ankush speaks Bengali and Hindi natively, English fluently (C1, IELTS 7.0), and is learning German (A2 at Goethe-Institut).",
    de: "Ankush spricht Bengali und Hindi muttersprachlich, Englisch fließend (C1, IELTS 7,0) und lernt Deutsch (A2 am Goethe-Institut).",
  },
  hobbies: {
    en: "When not coding, Ankush plays football and analyzes match statistics. He believes sports build teamwork and discipline.",
    de: "Wenn er nicht programmiert, spielt Ankush Fußball und analysiert Spielstatistiken. Er glaubt, dass Sport Teamwork und Disziplin aufbaut.",
  },
  personal: {
    en: "Ankush is from Kolkata, India. He was born in 2000 and is currently in his mid-20s, full of energy for his Data Science journey!",
    de: "Ankush kommt aus Kolkata, Indien. Er wurde 2000 geboren und ist Mitte 20, voller Energie für seine Data Science-Reise!",
  },
  philosophy: {
    en: "Ankush believes technology should be an enabler, not a bottleneck. His motto: 'Clean Data, Clean Logic' — scalable, maintainable, user-friendly systems.",
    de: "Ankush glaubt, dass Technologie ein Enabler sein sollte, kein Engpass. Sein Motto: 'Saubere Daten, Saubere Logik' — skalierbare, wartbare, benutzerfreundliche Systeme.",
  },
  crm: {
    en: "Ankush specializes in Dynamics 365 CRM. At PwC and EY, he built custom plugins, automated workflows with Power Automate, and managed enterprise CRM deployments.",
    de: "Ankush ist auf Dynamics 365 CRM spezialisiert. Bei PwC und EY entwickelte er Custom Plugins, automatisierte Workflows mit Power Automate und verwaltete Unternehmens-CRM-Deployments.",
  },
  ai: {
    en: "Ankush is passionate about AI/ML. His DriveSafe AI project uses MobileNetV3Large for real-time drowsiness detection with 97.24% accuracy.",
    de: "Ankush ist begeistert von KI/ML. Sein DriveSafe AI-Projekt nutzt MobileNetV3Large für Echtzeit-Ermüdungserkennung mit 97,24% Genauigkeit.",
  },
  default: {
    en: "Great question! Ankush is a Microsoft Certified Tech Consultant with experience at PwC and EY, now transitioning to Data Science. Ask me about his projects, certifications, or his plan to study in Germany!",
    de: "Gute Frage! Ankush ist ein Microsoft-zertifizierter Tech Consultant mit Erfahrung bei PwC und EY, der jetzt ins Data Science wechselt. Frag mich nach seinen Projekten, Zertifizierungen oder seinem Plan in Deutschland zu studieren!",
  },
};

/* Keyword matching for fallback (word-boundary aware) */
const FALLBACK_PATTERNS = {
  greetings: {
    en: ["hello", "hi", "hey", "greetings", "good morning", "good evening"],
    de: ["hallo", "moin", "servus", "guten tag", "guten morgen", "guten abend", "grüß dich", "was geht", "wie geht"],
  },
  identity: {
    en: ["who are you", "who is ankush", "tell me about", "about you", "about him", "introduce"],
    de: ["wer bist du", "wer ist ankush", "erzähl mir", "über dich", "über ihn", "vorstellung"],
  },
  skills: {
    en: ["skills", "technical skills", "programming", "stack", "tech stack", "competencies", "capable", "good at"],
    de: ["fähigkeiten", "skills", "was kann er", "technische", "programmierung", "können", "talent"],
  },
  projects: {
    en: ["project", "drivesafe", "meteordash", "built", "created", "portfolio", "application"],
    de: ["projekt", "projekte", "drivesafe", "meteordash", "gebaut", "erstellt", "entwickelt"],
  },
  work: {
    en: ["work", "experience", "pwc", "ey", "ernst", "pricewaterhouse", "career", "job", "company"],
    de: ["arbeit", "erfahrung", "pwc", "ey", "karriere", "beruf", "job", "firma", "unternehmen"],
  },
  education: {
    en: ["education", "degree", "university", "college", "study", "studied", "academic", "gpa", "grade"],
    de: ["ausbildung", "abschluss", "universität", "studium", "studiert", "akademisch", "note"],
  },
  certifications: {
    en: ["certification", "azure", "microsoft cert", "badge", "credential", "exam"],
    de: ["zertifikat", "zertifizierungen", "azure", "microsoft", "prüfung", "zertifiziert"],
  },
  germany: {
    en: ["germany", "master", "german", "deutschland", "study abroad", "move", "relocat"],
    de: ["deutschland", "master", "studium", "studieren", "umzug", "goethe"],
  },
  resume: {
    en: ["resume", "cv", "download", "pdf"],
    de: ["lebenslauf", "cv", "download", "dokument", "herunterladen"],
  },
  contact: {
    en: ["contact", "email", "phone", "linkedin", "github", "reach", "connect"],
    de: ["kontakt", "email", "telefon", "linkedin", "github", "erreichen", "nachricht"],
  },
  languages: {
    en: ["languages", "english", "hindi", "bengali", "speak", "fluent", "ielts"],
    de: ["sprachen", "englisch", "hindi", "bengali", "sprechen", "fließend", "muttersprache"],
  },
  hobbies: {
    en: ["hobbies", "football", "sport", "free time", "weekend", "fun"],
    de: ["hobbys", "fußball", "fussball", "sport", "freizeit", "wochenende"],
  },
  personal: {
    en: ["age", "birthday", "kolkata", "india", "born", "hometown", "from where"],
    de: ["alter", "geburtstag", "kolkata", "indien", "geboren", "woher"],
  },
  philosophy: {
    en: ["philosophy", "approach", "methodology", "belief", "mindset", "values"],
    de: ["philosophie", "ansatz", "methodik", "überzeugung", "werte"],
  },
  crm: {
    en: ["crm", "dynamics", "dynamics 365", "customer relationship"],
    de: ["crm", "dynamics", "kundenbeziehung"],
  },
  ai: {
    en: ["machine learning", "deep learning", "artificial intelligence", "neural", "computer vision"],
    de: ["künstliche intelligenz", "maschinelles lernen", "ki", "neuronal", "computer vision"],
  },
};

function getFallbackResponse(text, lang) {
  const lower = text.toLowerCase();
  const useDe = lang === "de" || lang === "denglish";
  const patterns = FALLBACK_PATTERNS;

  for (const [category, langPatterns] of Object.entries(patterns)) {
    const kws = useDe ? [...langPatterns.de, ...langPatterns.en] : langPatterns.en;
    if (kws.some((kw) => lower.includes(kw))) {
      return RESPONSES[category]?.[useDe ? "de" : "en"] || RESPONSES.default[useDe ? "de" : "en"];
    }
  }

  return RESPONSES.default[useDe ? "de" : "en"];
}

/* ── System Prompt ──────────────────────────────────────────────── */
function buildSystemPrompt(lang) {
  const base = `You are the AI assistant on Ankush Karmakar's portfolio website. 
Be concise (2-3 sentences max). Be friendly and conversational. Never use markdown formatting.

About Ankush:
- Microsoft Certified Tech Consultant, 2+ years at PwC and EY
- Now transitioning to Data Science, planning Master's in Germany
- Skills: Python, C#, JavaScript, SQL, Dynamics 365 CRM, Azure, Power Platform, ML
- Projects: DriveSafe AI (97.24% drowsiness detection), MeteorDash (gesture game)
- Certs: Azure AI, Azure Data, Azure, Power Platform, Dynamics 365 CRM (all Microsoft)
- Education: B.Tech CSE, Narula Institute of Technology (8.7/10 DGPA)
- Languages: Bengali/Hindi native, English C1 (IELTS 7.0), German A2 (Goethe-Institut)
- Hobbies: Football, match analysis
- From Kolkata, India. Born 2000.
- Contact: karmakarankush1461@gmail.com, LinkedIn: @ankush-karmakar, GitHub: @Ankush1461

Rules:
- Answer ONLY about Ankush. Politely decline unrelated topics.
- If asked for resume/CV, direct to the "My Résumé" button on the Home page.
- If asked about Germany/future plans, mention he's planning a Master's in Data Science in Germany.
- If unsure, suggest visiting the Contact page.
- No chain-of-thought. No meta-commentary. Just answer directly.
- Keep replies SHORT and natural — max 2-3 sentences.
- NEVER use markdown formatting. No bold (**), no italic (*), no headers (#), no bullet points (-). Write plain text only.`;

  if (lang === "de" || lang === "denglish") {
    return `${base}\n\nCRITICAL LANGUAGE RULE: The user is writing in German or Denglish. You MUST reply entirely in GERMAN (Deutsch). Use natural, casual German. Keep it short.`;
  }
  return `${base}\n\nReply in English. Keep it casual and brief.`;
}

/* ── Fetch with Timeout ─────────────────────────────────────────── */
async function fetchWithTimeout(url, options, timeoutMs = 6000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/* ── Gemini (Primary) ───────────────────────────────────────────── */
async function callGemini(messages, lang) {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key) throw new Error("No Gemini key");

  const systemPrompt = buildSystemPrompt(lang);

  // Use only last 6 messages for speed + relevance
  const recent = messages.slice(-6);
  const contents = recent.map((msg) => ({
    role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
    parts: [{ text: msg.content || msg.text || "" }],
  }));

  // Ensure first message is from user (Gemini requirement)
  if (contents.length > 0 && contents[0].role === "model") {
    contents.shift();
  }

  const res = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
          topP: 0.9,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ],
      }),
    },
    6000,
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Gemini error");
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");
  return text;
}

/* ── OpenRouter (Fallback — race top 3 models) ──────────────────── */
const OR_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-3-27b-it:free",
  "meta-llama/llama-3.2-3b-instruct:free",
];

async function callOpenRouterModel(model, messages, lang) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("No OpenRouter key");

  const res = await fetchWithTimeout(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "HTTP-Referer": "https://portfolio-ankush.vercel.app",
        "X-Title": "Ankush Portfolio",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: buildSystemPrompt(lang) },
          ...messages.slice(-6).map((msg) => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content || msg.text || "",
          })),
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    },
    5000,
  );

  const data = await res.json();
  if (!res.ok || !data.choices?.[0]?.message?.content) {
    throw new Error(data?.error?.message || `${model} failed`);
  }
  return data.choices[0].message.content.trim();
}

async function callOpenRouter(messages, lang) {
  // Race top 3 models — first success wins
  const promises = OR_MODELS.map((model) =>
    callOpenRouterModel(model, messages, lang).catch(() => null),
  );
  const results = await Promise.allSettled(promises);
  for (const r of results) {
    if (r.status === "fulfilled" && r.value) return r.value;
  }
  throw new Error("All OpenRouter models failed");
}

/* ── Clean AI Response ──────────────────────────────────────────── */
function cleanResponse(text) {
  return text
    // Remove chain-of-thought leakage
    .replace(/^(Okay|Alright|Let me|I need to|So|Hmm|Wait|Now|The user)[^\n]*\n/gi, "")
    // Strip all markdown formatting
    .replace(/\*\*([^*]+)\*\*/g, "$1")  // **bold** → bold
    .replace(/\*([^*]+)\*/g, "$1")      // *italic* → italic
    .replace(/__([^_]+)__/g, "$1")      // __bold__ → bold
    .replace(/_([^_]+)_/g, "$1")        // _italic_ → italic
    .replace(/^#+\s*/gm, "")            // # headers
    .replace(/^[-*]\s+/gm, "")         // - bullet points
    .replace(/^\d+\.\s+/gm, "")        // 1. numbered lists
    .replace(/`([^`]+)`/g, "$1")        // `code`
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [link](url) → link
    .trim();
}

/* ── Main Handler ───────────────────────────────────────────────── */
export async function POST(req) {
  const startTime = Date.now();

  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ text: "No messages provided." }, { status: 400 });
    }

    const lastUserMsg = messages.filter((m) => m.role === "user").pop();
    const userText = lastUserMsg?.content || lastUserMsg?.text || "";
    const lang = detectLanguage(userText);

    // Check cache first (key includes detected language)
    const cacheKey = getCacheKey(userText, lang);
    const cached = getCached(cacheKey);
    if (cached) {
      return NextResponse.json({ text: cached, cached: true });
    }

    // Try Gemini first, then OpenRouter, then offline fallback
    let reply = "";
    let source = "fallback";

    try {
      reply = await callGemini(messages, lang);
      source = "gemini";
    } catch (geminiErr) {
      console.warn("[Gemini]", geminiErr.message);
      try {
        reply = await callOpenRouter(messages, lang);
        source = "openrouter";
      } catch (orErr) {
        console.warn("[OpenRouter]", orErr.message);
      }
    }

    // Offline fallback if APIs failed
    if (!reply) {
      reply = getFallbackResponse(userText, lang);
      source = "fallback";
    } else {
      reply = cleanResponse(reply);
    }

    // Cache successful API responses
    if (source !== "fallback" && reply) {
      setCache(cacheKey, reply);
    }

    const elapsed = Date.now() - startTime;
    if (elapsed > 4000) {
      console.warn(`[Chat API] Slow response: ${elapsed}ms (${source})`);
    }

    return NextResponse.json({ text: reply });
  } catch (err) {
    console.error("[Chat API] Fatal:", err);
    return NextResponse.json({
      text: "Sorry, something went wrong. Please try again!",
    });
  }
}
