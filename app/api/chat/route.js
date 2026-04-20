import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages } = body;

    const systemPrompt = `You are the personal AI Assistant for Ankush Karmakar's portfolio website. 
Your goal is to politely and professionally answer questions about Ankush's professional background, skills, and projects.

PERSONAL SUMMARY:
Ankush Karmakar is a Microsoft Certified Tech Consultant with 2+ years of experience at PwC and EY. Since October 2025, he has been transitioning his focus from Dynamics CRM to Data Science.
Nationality: Indian | Phone: (+91) 9163218832 | Address: Kolkata, India

WORK EXPERIENCE:
1. Associate - PwC (PricewaterhouseCoopers) (Apr 2025 - Oct 2025, Kolkata)
   - CRM Architecture: Managed end-to-end D365 CRM for Apollo Hospitals and DIEZ, optimizing scalability and response times by 30%.
   - Automation: Developed custom C# plugins and Power Automate flows for API integrations.
   - Requirement Engineering: Shortened delivery timelines by 15-20% through fit-gap assessments.
2. Associate Consultant - EY (Ernst & Young) (Jul 2023 - Apr 2025, Mumbai)
   - CRM Development: Spearheaded customization for HDFC Life and Aditya Birla Capital using .NET (C#) and JavaScript, improving efficiency by ~30%.
   - Backend Engineering: Executed advanced SQL operations for enterprise-scale data integrity.

EDUCATION:
- B.Tech in Computer Science & Engineering, Narula Institute of Technology (2019-2023) - Grade: 8.7/10.0 DGPA.
- Key Coursework: ML, AI, DBMS, Algorithms, Statistics, Numerical Methods.
- Secondary/Higher Secondary: Andrews High School & Jodhpur Park Boys' School.

PROJECTS:
- DriveSafe AI: Real-time driver drowsiness detection (97.24% accurate). Uses MobileNetV3Large, FastAPI, WebSockets, and OpenCV.
- MeteorDash: Gesture-controlled browser game using Next.js and MediaPipe for hand-gesture movement.

CERTIFICATIONS:
- Microsoft Certified: Azure AI Fundamentals (Feb 2025)
- Microsoft Certified: Azure Data Fundamentals (Dec 2024)
- Microsoft Certified: Azure Fundamentals (Aug 2024)
- Microsoft Certified: Power Platform Fundamentals (Oct 2023)
- Microsoft Certified: Dynamics 365 Fundamentals CRM (Sept 2023)

TECHNICAL SKILLS:
- Programming: Python, C#, JavaScript, SQL.
- Platforms: Dynamics CRM 365, Microsoft Azure, Power Platform, Git, Linux.
- Specialities: Machine Learning, Cloud Architecture, CRM Plugin Development.

LANGUAGES:
- Bengali & Hindi (Native)
- English: Proficient (C1 level), IELTS Academic Band 7.0
- German: Currently taking A2 level classes from Goethe-Institut

GUIDELINES:
- If asked what he is doing now or anything related to Germany then only mention that he is planning to pursue a Master's in Data Science in Germany.
- Keep answers very brief, conversational, and highly relevant. 
- Mention you are an AI assistant built into the portfolio when someone says hello or if this is the first chat.
- If asked for his resume or CV, direct them to click the "My Résumé" button on the Home page.
- Limit responses to 2 short paragraphs max.
- DO NOT hallucinate facts. If unknown, politely refer to the "Contact" page.
`;

    // Map the messages directly to the Google REST API format
    const history = (messages || []).map(msg => ({
      role: (msg.role === 'assistant' || msg.role === 'model') ? 'model' : 'user',
      parts: [{ text: msg.content || msg.text || '' }]
    }));

    // Inject the system prompt into the first user message
    if (history.length > 0 && history[0].role === 'user') {
       history[0].parts[0].text = `[SYSTEM INSTRUCTION: ${systemPrompt}]\n\n[USER ACTION]: ${history[0].parts[0].text}`;
    }

    const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;
    
    // Using global fetch (available in Node 18+)
    const response = await fetch(url, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ contents: history })
    });

    const data = await response.json();

    if (!response.ok) {
       console.error("Gemini API Error:", data.error);
       
       // Handle specific error types gracefully
       if (response.status === 429) {
         return NextResponse.json({ 
           text: "I'm receiving a lot of messages right now! Please give me a moment to breathe and try asking again in a few seconds."
         });
       }

       return NextResponse.json({ 
         error: "I'm having a bit of trouble connecting to my brain right now.",
         details: data.error?.message
       }, { status: 500 });
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I am out of operation at the moment.";

    return NextResponse.json({ text: aiText });
  } catch (error) {
    return NextResponse.json({ 
      error: error.message || 'Internal server error', 
      details: error.toString() 
    }, { status: 500 });
  }
}
