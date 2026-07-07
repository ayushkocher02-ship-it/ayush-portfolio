import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0A1628",
  bgCard: "#0F2040",
  bgCardHover: "#162B52",
  accent: "#00D4FF",
  accentDim: "#0099BB",
  text: "#E8F4FD",
  textMuted: "#7BA3C4",
  border: "#1E3A5F",
  tag: "#0D2A44",
  tagText: "#64C8E8",
  green: "#00E5A0",
  orange: "#FF8C42",
};

const skills = {
  Backend: ["Java 8+", "Spring Boot", "Spring Security", "Microservices", "REST APIs", "JPA/Hibernate", "FastAPI", "Flask", "Django", "OAuth2/JWT"],
  Frontend: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Redux"],
  "AI & GenAI": ["LangChain", "LangGraph", "RAG Pipelines", "FAISS", "OpenAI APIs", "Semantic Kernel", "Prompt Engineering"],
  "Messaging & Events": ["Apache Kafka", "RabbitMQ", "Event-Driven Architecture", "JMS"],
  Databases: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "Redis", "SQL", "PL/SQL"],
  "Cloud & DevOps": ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Jenkins", "Tekton", "CI/CD"],
  Testing: ["JUnit", "Mockito", "Integration Testing", "TDD"],
  "Other Languages": ["Python", "Kotlin", "C#", "C++", "Shell Scripting"],
};

const projects = [
  {
    name: "Agentic RAG Pipeline",
    type: "AI / GenAI",
    description: "Production agentic RAG system using LangGraph multi-step orchestration with FAISS vector retrieval. Context-aware document automation with source-traceable, grounded LLM responses for fintech decision support.",
    stack: ["Python", "LangChain", "LangGraph", "FAISS", "FastAPI", "OpenAI APIs"],
    metrics: "Sub-100ms retrieval • Multi-step agent loops • Source-traceable outputs",
    color: COLORS.green,
  },
  {
    name: "Event-Driven Microservices Platform",
    type: "Backend / Fintech",
    description: "High-throughput event-driven pipeline for real-time financial transaction processing. Kafka-based producer/consumer services with retry logic, dead-letter queuing, and structured logging for full operational traceability.",
    stack: ["Java", "Spring Boot", "Apache Kafka", "Docker", "PostgreSQL"],
    metrics: "~30% release cycle reduction • Zero critical defects across 3 major releases",
    color: COLORS.accent,
  },
  {
    name: "Secure REST API Microservice",
    type: "Backend / Security",
    description: "Production-grade REST API microservice with OAuth2/JWT authentication and claims-based RBAC authorization. Implements service decomposition, JPA/Hibernate ORM, and resilience patterns for a fintech data platform.",
    stack: ["Spring Boot", "JWT", "OAuth2", "JPA/Hibernate", "PostgreSQL", "Docker"],
    metrics: "Sub-150ms latency • Fine-grained access control • OWASP-aligned security",
    color: COLORS.orange,
  },
  {
    name: "BERT Sentiment Analysis Model",
    type: "ML / NLP",
    description: "Fine-tuned BERT-based sentiment classification model for financial text. Applied NLP techniques for context-aware understanding, deployed via FastAPI with ONNX Runtime optimization for production inference.",
    stack: ["Python", "PyTorch", "Hugging Face", "ONNX", "FastAPI", "AWS SageMaker"],
    metrics: "89% F1-Score • Sub-100ms inference via ONNX • AWS SageMaker deployment",
    color: COLORS.green,
  },
  {
    name: "Legacy Monolith → Microservices Migration",
    type: "Architecture",
    description: "Led end-to-end migration of a legacy enterprise monolith to a Spring Boot microservices architecture. Redesigned service boundaries, built RESTful inter-service contracts, and integrated full CI/CD automation.",
    stack: ["Java", "Spring Boot", "REST APIs", "GitHub Actions", "Docker"],
    metrics: "~30% faster release cycles • Improved system observability • Zero downtime migration",
    color: COLORS.accent,
  },
  {
    name: "StockFlow — Inventory Management",
    type: "Full Stack • Open Source",
    description: "Full-stack inventory and order management system built end-to-end. Python FastAPI backend with PostgreSQL, React frontend, Docker containerization, and live deployment. Public GitHub repository.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
    metrics: "Live deployed • Open source • github.com/ayushkocher02-ship-it",
    color: COLORS.orange,
    link: "https://github.com/ayushkocher02-ship-it/stockflow-inventory-system",
  },
  {
    name: "Autonomous Document Generation Agent",
    type: "AI / Agentic",
    description: "FastAPI-based autonomous document generation agent with a four-stage agentic loop featuring reflection and self-check capabilities. Integrates Groq LLM and python-docx for intelligent document creation workflows.",
    stack: ["Python", "FastAPI", "Groq LLM", "python-docx", "LangChain"],
    metrics: "4-stage agent loop • Self-reflection capability • Agentic workflow design",
    color: COLORS.green,
  },
];

const stats = [
  { value: "2.5+", label: "Years Experience" },
  { value: "3", label: "Major Releases", sub: "Zero critical defects" },
  { value: "89%", label: "F1-Score", sub: "BERT Sentiment Model" },
  { value: "~30%", label: "Release Cycle Reduction", sub: "via CI/CD automation" },
];

function TypingText({ lines }) {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) { setDone(true); return; }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => prev + line[charIdx]);
        setCharIdx(c => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(prev => prev + "\n");
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx, lines, done]);

  return (
    <pre style={{
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: "clamp(11px, 1.6vw, 14px)",
      color: COLORS.accent,
      margin: 0,
      whiteSpace: "pre-wrap",
      lineHeight: 1.8,
      textShadow: `0 0 12px ${COLORS.accent}55`,
    }}>
      {displayed}
      {!done && <span style={{ opacity: Math.sin(Date.now() / 300) > 0 ? 1 : 0, transition: "opacity 0.1s" }}>█</span>}
    </pre>
  );
}

function Tag({ text, color }) {
  return (
    <span style={{
      display: "inline-block",
      background: color ? `${color}18` : COLORS.tag,
      color: color || COLORS.tagText,
      border: `1px solid ${color ? `${color}40` : COLORS.border}`,
      borderRadius: 4,
      padding: "2px 10px",
      fontSize: 12,
      fontFamily: "'JetBrains Mono', monospace",
      margin: "3px 4px 3px 0",
      letterSpacing: 0.3,
    }}>{text}</span>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? COLORS.bgCardHover : COLORS.bgCard,
        border: `1px solid ${hovered ? project.color + "60" : COLORS.border}`,
        borderRadius: 12,
        padding: "24px 28px",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 32px ${project.color}20` : "none",
        cursor: project.link ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
      onClick={() => project.link && window.open(project.link, "_blank")}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: project.color,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            display: "block",
            marginBottom: 4,
          }}>{project.type}</span>
          <h3 style={{ margin: 0, color: COLORS.text, fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>
            {project.name}
            {project.link && <span style={{ fontSize: 13, color: project.color, marginLeft: 8 }}>↗</span>}
          </h3>
        </div>
      </div>

      <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 14, lineHeight: 1.7 }}>
        {project.description}
      </p>

      <div style={{
        background: `${project.color}10`,
        border: `1px solid ${project.color}25`,
        borderRadius: 6,
        padding: "8px 12px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        color: project.color,
        lineHeight: 1.6,
      }}>
        {project.metrics}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {project.stack.map(s => <Tag key={s} text={s} color={project.color} />)}
      </div>
    </div>
  );
}

function SkillGroup({ category, items }) {
  const colorMap = {
    "Backend": COLORS.accent,
    "Frontend": COLORS.orange,
    "AI & GenAI": COLORS.green,
    "Messaging & Events": COLORS.accent,
    "Databases": COLORS.orange,
    "Cloud & DevOps": COLORS.green,
    "Testing": COLORS.accent,
    "Other Languages": COLORS.textMuted,
  };
  const color = colorMap[category] || COLORS.accent;

  return (
    <div style={{
      background: COLORS.bgCard,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 10,
      padding: "18px 20px",
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 12,
      }}>{category}</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map(s => <Tag key={s} text={s} color={color} />)}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(t);
  }, []);

  const terminalLines = [
    "$ whoami",
    "ayush_kochar — Java Full Stack & GenAI Engineer",
    "",
    "$ cat skills.txt",
    "Backend:  Java · Spring Boot · Microservices · Kafka",
    "Frontend: React · TypeScript · Redux",
    "AI/ML:    LangChain · LangGraph · RAG · FAISS",
    "Cloud:    AWS · GCP · Azure · Docker · K8s",
    "",
    "$ cat experience.txt",
    "2.5+ years @ TCS — Fintech client, Pune",
    "~30% release cycle reduction · Zero critical defects",
    "",
    "$ echo $STATUS",
    "Actively exploring new opportunities ✓",
  ];

  const sectionStyle = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "80px 24px",
  };

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* NAV */}
      <nav style={{
        position: "sticky",
        top: 0,
        background: `${COLORS.bg}E8`,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLORS.border}`,
        zIndex: 100,
        padding: "0 24px",
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 56,
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: COLORS.accent,
            fontSize: 15,
            fontWeight: 700,
          }}>ayush.kochar<span style={{ opacity: blink ? 1 : 0 }}>_</span></span>
          <div style={{ display: "flex", gap: 28 }}>
            {["About", "Skills", "Projects", "Contact"].map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} style={{
                color: COLORS.textMuted,
                textDecoration: "none",
                fontSize: 14,
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = COLORS.accent}
                onMouseLeave={e => e.target.style.color = COLORS.textMuted}
              >{n}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ ...sectionStyle, paddingTop: 100, paddingBottom: 60 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: COLORS.accent,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 16,
            }}>// Software Engineer</div>
            <h1 style={{
              margin: "0 0 16px",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}>
              Ayush<br />
              <span style={{ color: COLORS.accent }}>Kochar</span>
            </h1>
            <p style={{
              color: COLORS.textMuted,
              fontSize: 17,
              lineHeight: 1.7,
              margin: "0 0 32px",
              maxWidth: 440,
            }}>
              Java Full Stack Developer & GenAI Engineer. Building production-grade fintech systems, microservices, and LLM-powered applications.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#projects" style={{
                background: COLORS.accent,
                color: COLORS.bg,
                padding: "12px 24px",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
              }}>View Projects →</a>
              <a href="https://linkedin.com/in/ayush-kochar-30809a221" target="_blank" style={{
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
                padding: "12px 24px",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
              }}>LinkedIn ↗</a>
              <a href="https://github.com/ayushkocher02-ship-it" target="_blank" style={{
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
                padding: "12px 24px",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
              }}>GitHub ↗</a>
            </div>
          </div>

          {/* TERMINAL */}
          <div style={{
            background: "#060E1A",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: `0 0 60px ${COLORS.accent}15`,
          }}>
            <div style={{
              background: "#0D1F35",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: `1px solid ${COLORS.border}`,
            }}>
              {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
              <span style={{ fontFamily: "monospace", fontSize: 12, color: COLORS.textMuted, marginLeft: 8 }}>
                terminal — ayush@portfolio
              </span>
            </div>
            <div style={{ padding: "20px 20px 24px" }}>
              <TypingText lines={terminalLines} />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="about" style={{ borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: "48px 24px" }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
          textAlign: "center",
        }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                color: COLORS.accent,
                lineHeight: 1,
                marginBottom: 6,
              }}>{s.value}</div>
              <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>{s.label}</div>
              {s.sub && <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 3 }}>{s.sub}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={sectionStyle}>
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: COLORS.accent,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 12,
          }}>// Technical Skills</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800 }}>
            Full Stack + AI Stack
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {Object.entries(skills).map(([cat, items]) => (
            <SkillGroup key={cat} category={cat} items={items} />
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ ...sectionStyle, borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: COLORS.accent,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 12,
          }}>// Projects</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800 }}>
            What I've Built
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 20,
        }}>
          {projects.map(p => <ProjectCard key={p.name} project={p} />)}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{
        ...sectionStyle,
        borderTop: `1px solid ${COLORS.border}`,
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: COLORS.accent,
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 12,
        }}>// Contact</div>
        <h2 style={{ margin: "0 0 16px", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800 }}>
          Let's Connect
        </h2>
        <p style={{ color: COLORS.textMuted, fontSize: 16, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px" }}>
          Actively exploring new opportunities in Java Full Stack, Backend, and GenAI engineering roles across India.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          {[
            { label: "ayushkocher02@gmail.com", href: "mailto:ayushkocher02@gmail.com" },
            { label: "LinkedIn", href: "https://linkedin.com/in/ayush-kochar-30809a221" },
            { label: "GitHub", href: "https://github.com/ayushkocher02-ship-it" },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" style={{
              border: `1px solid ${COLORS.accent}50`,
              color: COLORS.accent,
              padding: "12px 24px",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.accent}15`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >{l.label} ↗</a>
          ))}
        </div>

        <div style={{
          marginTop: 64,
          paddingTop: 32,
          borderTop: `1px solid ${COLORS.border}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textMuted, fontSize: 13 }}>
            Ayush Kochar · Pune, Maharashtra · +91 7387475342
          </span>
        </div>
      </section>
    </div>
  );
}
