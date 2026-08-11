import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   GOOGLE FONTS + GLOBAL STYLES
───────────────────────────────────────────────────────────── */

function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :root {
        --parchment: #F9F7F2;
        --cream: #F0EDE4;
        --onyx: #1A1A1A;
        --gold: #D4AF37;
        --gold-faint: rgba(212,175,55,0.10);
        --gold-border: rgba(212,175,55,0.25);
        --slate: #708090;
        --slate-light: #A0AEB8;
        --white-glass: rgba(249,247,242,0.76);
      }

      html {
        scroll-behavior: smooth;
        font-size: 16px;
      }

      body {
        background: var(--parchment);
        color: var(--onyx);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
      }

      ::selection {
        background: rgba(212,175,55,0.18);
      }

      /* ── NAV ── */

      .nav-glass {
        backdrop-filter: blur(22px) saturate(180%);
        -webkit-backdrop-filter: blur(22px) saturate(180%);
        background: var(--white-glass);
        border-bottom: 1px solid var(--gold-border);
      }

      .nav-link {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.67rem;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--onyx);
        text-decoration: none;
        opacity: 0.65;
        transition: opacity 0.25s ease;
      }

      .nav-link:hover {
        opacity: 1;
      }

      /* ── BUTTONS ── */

      .btn-ghost {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.67rem;
        font-weight: 500;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        text-decoration: none;
        display: inline-block;
        padding: 0.6rem 1.4rem;
        border: 1px solid var(--gold);
        color: var(--gold);
        background: transparent;
        cursor: pointer;
        transition: background 0.3s ease, color 0.3s ease;
      }

      .btn-ghost:hover {
        background: var(--gold);
        color: var(--parchment);
      }

      .btn-ghost-light {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.67rem;
        font-weight: 500;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        text-decoration: none;
        display: inline-block;
        padding: 0.85rem 2rem;
        border: 1px solid rgba(249,247,242,0.25);
        color: rgba(249,247,242,0.7);
        background: transparent;
        cursor: pointer;
        transition: border-color 0.3s ease, color 0.3s ease;
      }

      .btn-ghost-light:hover {
        border-color: rgba(249,247,242,0.7);
        color: #F9F7F2;
      }

      /* ── DIVIDER ── */

      .divider-gold {
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          var(--gold) 40%,
          var(--gold) 60%,
          transparent 100%
        );
        opacity: 0.35;
        margin-bottom: 5rem;
      }

      /* ── PROJECT / EXPERIENCE CARD ── */

      .project-card {
        background: rgba(255,255,255,0.55);
        border: 1px solid var(--gold-border);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition:
          border-color 0.4s ease,
          box-shadow 0.4s ease,
          transform 0.4s ease;
      }

      .project-card:hover {
        border-color: rgba(212,175,55,0.55);
        box-shadow:
          0 18px 55px rgba(212,175,55,0.09),
          0 4px 18px rgba(0,0,0,0.04);
        transform: translateY(-5px);
      }

      /* ── SKILL CHIP ── */

      .chip {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.58rem;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--slate);
        padding: 0.35rem 0.8rem;
        border: 1px solid rgba(112,128,144,0.28);
        border-radius: 2px;
        background: rgba(255,255,255,0.4);
        transition:
          border-color 0.3s ease,
          color 0.3s ease;
      }

      .chip:hover {
        border-color: var(--gold);
        color: var(--onyx);
      }

      /* ── SECTION LABEL ── */

      .section-label {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.62rem;
        font-weight: 600;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: var(--gold);
        margin-bottom: 1rem;
        display: block;
      }

      /* ── RESPONSIVE ── */

      @media (max-width: 900px) {
        .nav-glass {
          padding: 1rem 1.5rem !important;
        }

        .nav-links {
          display: none !important;
        }

        .hero-section,
        .content-section,
        .footer-section {
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
        }

        .about-grid {
          grid-template-columns: 1fr !important;
          gap: 3rem !important;
        }

        .project-grid {
          grid-template-columns: 1fr !important;
          gap: 2.5rem !important;
        }

        .skills-grid {
          grid-template-columns: 1fr !important;
        }

        .experience-grid {
          grid-template-columns: 1fr !important;
          gap: 2.5rem !important;
        }

        .scroll-indicator {
          display: none !important;
        }
      }

      @media (max-width: 600px) {
        .hero-title {
          font-size: 3rem !important;
        }

        .project-card {
          padding: 2rem !important;
        }
      }

      ::-webkit-scrollbar {
        width: 4px;
      }

      ::-webkit-scrollbar-track {
        background: var(--parchment);
      }

      ::-webkit-scrollbar-thumb {
        background: var(--gold-border);
        border-radius: 2px;
      }
    `}</style>
  );
}

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 38,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
    },
  },
};

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────────────────────── */

function Reveal({ children, className = "" }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-90px",
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.75,
        delay: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="nav-glass"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: scrolled ? "0.9rem 4rem" : "1.2rem 4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "padding 0.3s ease",
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.05rem",
          color: "var(--onyx)",
          letterSpacing: "0.05em",
        }}
      >
        JKB<span style={{ color: "var(--gold)" }}>.</span>
      </span>

      <div
        className="nav-links"
        style={{
          display: "flex",
          gap: "2.5rem",
          alignItems: "center",
        }}
      >
        {["About", "Experience", "Works", "Skills", "Contact"].map(
          (item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
            >
              {item}
            </a>
          )
        )}

        <a
          href="/Japnoor_Kaur_Batra_Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
        >
          Curriculum Vitae
        </a>
      </div>
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "9rem 4rem 6rem",
        background: "var(--parchment)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "12%",
          right: "6%",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: "4rem",
          width: "120px",
          height: "1px",
          background:
            "linear-gradient(90deg, var(--gold), transparent)",
        }}
      />

      <motion.span
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.35 }}
        className="section-label"
        style={{
          marginBottom: "2.25rem",
        }}
      >
        AI / ML · Data Analytics · Generative AI
      </motion.span>

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 65 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.05,
          delay: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem, 7.2vw, 6.75rem)",
          fontWeight: 700,
          color: "var(--onyx)",
          lineHeight: 1.04,
          letterSpacing: "-0.02em",
          maxWidth: "960px",
          marginBottom: "2.25rem",
        }}
      >
        Building with Data,
        <br />
        AI &{" "}
        <em
          style={{
            color: "var(--gold)",
            fontStyle: "italic",
          }}
        >
          Intelligence.
        </em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.85,
          delay: 0.9,
        }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.38rem",
          fontWeight: 300,
          color: "var(--slate)",
          maxWidth: "600px",
          lineHeight: 1.72,
          marginBottom: "3.25rem",
        }}
      >
        Japnoor Kaur Batra — B.Tech Computer Science & Engineering
        (AI & ML) undergraduate focused on data analytics, machine
        learning, and practical Generative AI applications.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.25,
          duration: 0.6,
        }}
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <a
          href="#works"
          className="btn-ghost"
          style={{
            padding: "0.9rem 2.1rem",
          }}
        >
          View Selected Works
        </a>

        <a
          href="#about"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.67rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--onyx)",
            textDecoration: "none",
            opacity: 0.52,
          }}
        >
          Read More ↓
        </a>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: "absolute",
          bottom: "3.5rem",
          right: "4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut",
          }}
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, var(--gold), transparent)",
          }}
        />

        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.54rem",
            letterSpacing: "0.22em",
            color: "var(--slate-light)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────── */

function About() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="about"
      className="content-section"
      style={{
        padding: "8rem 4rem",
        background: "var(--parchment)",
      }}
    >
      <div
        className="divider-gold"
        style={{
          maxWidth: "1240px",
          margin: "0 auto 5rem",
        }}
      />

      <div
        ref={ref}
        className="about-grid"
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.65fr",
          gap: "7rem",
          alignItems: "start",
        }}
      >
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            className="section-label"
          >
            About
          </motion.span>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3.5vw, 3.1rem)",
              fontWeight: 700,
              color: "var(--onyx)",
              lineHeight: 1.18,
              letterSpacing: "-0.015em",
            }}
          >
            Learning.
            <br />
            Building.
            <br />
            <em
              style={{
                color: "var(--slate)",
                fontStyle: "italic",
              }}
            >
              Growing.
            </em>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            style={{
              marginTop: "2rem",
              width: "42px",
              height: "2px",
              background: "var(--gold)",
            }}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.28rem",
              fontWeight: 400,
              color: "var(--onyx)",
              lineHeight: 1.88,
              marginBottom: "1.85rem",
            }}
          >
            I am a fourth-year B.Tech Computer Science &
            Engineering (AI & ML) undergraduate at Amity University
            Punjab, with an interest in building practical
            data-driven and AI-powered applications.
          </motion.p>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.28rem",
              fontWeight: 400,
              color: "var(--slate)",
              lineHeight: 1.88,
              marginBottom: "1.85rem",
            }}
          >
            My work spans data analysis, machine learning,
            Generative AI, and large language model applications.
            I enjoy working with structured datasets, extracting
            meaningful insights, and turning them into interactive
            applications.
          </motion.p>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.28rem",
              fontWeight: 400,
              color: "var(--slate)",
              lineHeight: 1.88,
            }}
          >
            During my internship at BuzzClan, I worked on an IPL
            analytics platform involving large-scale cricket data,
            retrieval-augmented generation, vector database
            retrieval, and an AI-powered cricket assistant.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE
───────────────────────────────────────────────────────────── */

function Experience() {
  return (
    <section
      id="experience"
      className="content-section"
      style={{
        padding: "8rem 4rem",
        background: "var(--cream)",
      }}
    >
      <div
        className="divider-gold"
        style={{
          maxWidth: "1240px",
          margin: "0 auto 5rem",
        }}
      />

      <Reveal className="experience-grid">
        {/* Left column */}
        <motion.div variants={fadeUp}>
          <span className="section-label">
            Experience
          </span>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3.5vw, 2.85rem)",
              fontWeight: 700,
              color: "var(--onyx)",
              letterSpacing: "-0.015em",
            }}
          >
            Internship
            <br />
            <em
              style={{
                color: "var(--slate)",
                fontStyle: "italic",
              }}
            >
              Experience.
            </em>
          </h2>
        </motion.div>

        {/* Right column */}
        <motion.article
          variants={fadeUp}
          className="project-card"
          style={{
            padding: "3.5rem",
            borderRadius: "3px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "2rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  display: "block",
                  marginBottom: "0.8rem",
                }}
              >
                BuzzClan · AI Intern
              </span>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "var(--onyx)",
                  lineHeight: 1.22,
                  marginBottom: "0.45rem",
                }}
              >
                IPL Intelligence Studio
              </h3>

              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.1em",
                  color: "var(--slate-light)",
                  textTransform: "uppercase",
                }}
              >
                On-site · AI & Data Analytics
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.08em",
                color: "var(--slate)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              June 2026 – July 2026
            </div>
          </div>

          {/* Project summary */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.22rem",
              color: "var(--onyx)",
              lineHeight: 1.82,
              marginBottom: "2rem",
            }}
          >
            Developed an AI-powered IPL analytics platform covering{" "}
            <strong>1,243 matches</strong> and{" "}
            <strong>295,732 deliveries</strong>, combining cricket
            data analytics with Generative AI capabilities.
          </p>

          {/* Responsibilities */}
          <ul
            style={{
              margin: "0 0 2rem 1.2rem",
              padding: 0,
            }}
          >
            {[
              "Built data processing and analytics workflows using Python, Pandas, NumPy, and Plotly for team, player, and match insights.",
              "Integrated Groq LLMs with Retrieval-Augmented Generation (RAG) and vector database-based retrieval for context-aware responses.",
              "Developed an AI Cricket Assistant to generate responses using retrieved cricket analytics and contextual information.",
              "Built interactive analytics and comparison features using Streamlit and integrated AI capabilities into the application.",
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.12rem",
                  color: "var(--slate)",
                  lineHeight: 1.7,
                  marginBottom: "0.8rem",
                  paddingLeft: "0.3rem",
                }}
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {[
              "Python",
              "Pandas",
              "NumPy",
              "Plotly",
              "Streamlit",
              "Groq",
              "LLMs",
              "RAG",
              "Vector Database",
            ].map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>

          {/* GitHub */}
          <div style={{ marginTop: "2rem" }}>
            <a
              href="https://github.com/ranelbatra/ipl_ai"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--slate)",
                textDecoration: "none",
                borderBottom:
                  "1px solid rgba(112,128,144,0.3)",
                paddingBottom: "3px",
                transition:
                  "color 0.25s, border-color 0.25s",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "var(--gold)";
                e.target.style.borderColor = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "var(--slate)";
                e.target.style.borderColor =
                  "rgba(112,128,144,0.3)";
              }}
            >
              View on GitHub ↗
            </a>
          </div>
        </motion.article>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    num: "01",
    category: "Clinical Data Analysis",
    title: "RA Risk Stratification System",
    subtitle: "Data-Driven Risk Analysis",
    year: "2026",
    status: "Project",
    statusColor: "var(--gold)",
    accent: "var(--gold)",
    description:
      "A data analysis and risk stratification project focused on identifying relationships between clinical and lifestyle factors associated with Rheumatoid Arthritis. The project uses exploratory data analysis and visualization to uncover patterns and communicate findings from complex patient datasets.",
    chips: [
      "Python",
      "EDA",
      "Pandas",
      "Feature Engineering",
      "Data Visualization",
      "Statistical Analysis",
    ],
    link: "https://github.com/ranelbatra/RA-Risk-Stratification",
  },
  {
    num: "02",
    category: "Generative AI",
    title: "Multi-Modal AI Commerce Orchestrator",
    subtitle: "Generative AI Workflow Orchestration",
    year: "2026",
    status: "In Progress",
    statusColor: "var(--slate)",
    accent: "var(--slate)",
    description:
      "A multi-modal commerce orchestration platform being developed to coordinate Generative AI-powered workflows across different data and service interactions. The frontend prototype has been implemented, with the broader orchestration logic, backend services, AI integrations, and cross-channel workflows being developed as part of the project.",
    chips: [
      "Generative AI",
      "AI APIs",
      "Multi-Modal Systems",
      "System Design",
      "Workflow Orchestration",
    ],
    link: "#",
  },
];

/* ─────────────────────────────────────────────────────────────
   WORKS
───────────────────────────────────────────────────────────── */

function Works() {
  return (
    <section
      id="works"
      className="content-section"
      style={{
        padding: "8rem 4rem",
        background: "var(--parchment)",
      }}
    >
      <div
        className="divider-gold"
        style={{
          maxWidth: "1240px",
          margin: "0 auto 5rem",
        }}
      />

      <Reveal
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
        }}
      >
        <motion.div
          variants={fadeUp}
          style={{
            marginBottom: "4.5rem",
          }}
        >
          <span className="section-label">
            Selected Works
          </span>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3.5vw, 2.85rem)",
              fontWeight: 700,
              color: "var(--onyx)",
              letterSpacing: "-0.015em",
            }}
          >
            Projects & Systems
          </h2>
        </motion.div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.num}
              variants={fadeUp}
              className="project-card"
              style={{
                padding: "3.75rem",
                borderRadius: "3px",
              }}
            >
              <div
                className="project-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(0,1fr) minmax(0,2fr)",
                  gap: "4.5rem",
                  alignItems: "start",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "4rem",
                      fontWeight: 700,
                      color: "rgba(212,175,55,0.11)",
                      lineHeight: 1,
                      marginBottom: "1.6rem",
                      userSelect: "none",
                    }}
                  >
                    {project.num}
                  </div>

                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: project.accent,
                      display: "block",
                      marginBottom: "0.85rem",
                    }}
                  >
                    {project.category}
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.55rem",
                      fontWeight: 700,
                      color: "var(--onyx)",
                      lineHeight: 1.22,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', serif",
                      fontSize: "1.05rem",
                      fontStyle: "italic",
                      color: "var(--slate)",
                      marginBottom: "2.25rem",
                    }}
                  >
                    {project.subtitle}
                  </p>

                  <dl
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.45rem",
                    }}
                  >
                    {[
                      ["Year", project.year, "var(--onyx)"],
                      [
                        "Status",
                        project.status,
                        project.statusColor,
                      ],
                    ].map(([key, value, color]) => (
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          gap: "1rem",
                        }}
                      >
                        <dt
                          style={{
                            fontFamily:
                              "'Montserrat', sans-serif",
                            fontSize: "0.58rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color: "var(--slate-light)",
                          }}
                        >
                          {key}
                        </dt>

                        <dd
                          style={{
                            fontFamily:
                              "'Montserrat', sans-serif",
                            fontSize: "0.58rem",
                            letterSpacing: "0.08em",
                            color,
                          }}
                        >
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <p
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', serif",
                      fontSize: "1.22rem",
                      fontWeight: 400,
                      color: "var(--onyx)",
                      lineHeight: 1.82,
                      marginBottom: "2.25rem",
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {project.chips.map((chip) => (
                      <span
                        key={chip}
                        className="chip"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily:
                          "'Montserrat', sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 500,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--slate)",
                        textDecoration: "none",
                        borderBottom:
                          "1px solid rgba(112,128,144,0.3)",
                        paddingBottom: "2px",
                      }}
                    >
                      View on GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────────────────────── */

const SKILL_GROUPS = [
  {
    label: "Programming",
    skills: [
      "Python",
      "C++",
      "SQL",
      "Object-Oriented Programming",
    ],
  },
  {
    label: "Data & Analytics",
    skills: [
      "Pandas",
      "NumPy",
      "Data Analysis",
      "Data Processing",
      "Data Visualization",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Statistical Analysis",
      "Feature Engineering",
      "Feature Selection",
    ],
  },
  {
    label: "AI & Generative AI",
    skills: [
      "Machine Learning",
      "Generative AI",
      "Large Language Models",
      "Prompt Engineering",
      "RAG",
      "Vector Databases",
      "AI Application Development",
    ],
  },
  {
    label: "Tools & Databases",
    skills: [
      "Streamlit",
      "Git",
      "GitHub",
      "PostgreSQL",
      "Jupyter Notebook",
      "Google Colab",
      "VS Code",
    ],
  },
  {
    label: "Computer Science",
    skills: [
      "DBMS",
      "Data Structures & Algorithms",
      "Computer Networks",
      "Operating Systems",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   SKILLS SECTION
───────────────────────────────────────────────────────────── */

function Skills() {
  return (
    <section
      id="skills"
      className="content-section"
      style={{
        padding: "8rem 4rem",
        background: "var(--cream)",
      }}
    >
      <div
        className="divider-gold"
        style={{
          maxWidth: "1240px",
          margin: "0 auto 5rem",
        }}
      />

      <Reveal
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
        }}
      >
        <motion.div
          variants={fadeUp}
          style={{
            marginBottom: "4.5rem",
          }}
        >
          <span className="section-label">
            Technical Skills
          </span>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3.5vw, 2.85rem)",
              fontWeight: 700,
              color: "var(--onyx)",
              letterSpacing: "-0.015em",
            }}
          >
            Tools of the Trade
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "rgba(112,128,144,0.12)",
            border:
              "1px solid rgba(112,128,144,0.12)",
          }}
        >
          {SKILL_GROUPS.map((group, index) => (
            <div
              key={index}
              style={{
                background: "var(--cream)",
                padding: "3rem",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  display: "block",
                  marginBottom: "1.6rem",
                }}
              >
                {group.label}
              </span>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.55rem",
                }}
              >
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="chip"
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', serif",
                      fontSize: "1.05rem",
                      fontWeight: 400,
                      textTransform: "none",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER / CONTACT
───────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer
      id="contact"
      className="footer-section"
      style={{
        padding: "7rem 4rem 4rem",
        background: "var(--onyx)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "460px",
          height: "460px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Reveal
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <motion.span
          variants={fadeUp}
          className="section-label"
        >
          Contact
        </motion.span>

        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.4rem, 5vw, 4.25rem)",
            fontWeight: 700,
            color: "#F9F7F2",
            lineHeight: 1.08,
            letterSpacing: "-0.015em",
            marginBottom: "1.75rem",
          }}
        >
          Let's Build Something
          <br />
          <em
            style={{
              color: "var(--gold)",
              fontStyle: "italic",
            }}
          >
            Meaningful.
          </em>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
            fontSize: "1.25rem",
            color: "rgba(249,247,242,0.48)",
            marginBottom: "3.5rem",
            lineHeight: 1.7,
          }}
        >
          Open to opportunities involving AI/ML, data analytics,
          Generative AI, and software projects.
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            gap: "1.25rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "5rem",
          }}
        >
          <a
            href="mailto:ranelbatra5@gmail.com"
            className="btn-ghost"
            style={{
              padding: "0.92rem 2rem",
            }}
          >
            Email Me
          </a>

          <a
            href="/Japnoor_Kaur_Batra_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost-light"
            style={{
              padding: "0.92rem 2rem",
            }}
          >
            View Resume
          </a>

          <a
            href="https://www.linkedin.com/in/japnoor-kaur-batra"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily:
                "'Montserrat', sans-serif",
              fontSize: "0.67rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(249,247,242,0.45)",
              textDecoration: "none",
              padding: "0.92rem",
            }}
          >
            LinkedIn ↗
          </a>

          <a
            href="https://github.com/ranelbatra"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily:
                "'Montserrat', sans-serif",
              fontSize: "0.67rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(249,247,242,0.45)",
              textDecoration: "none",
              padding: "0.92rem",
            }}
          >
            GitHub ↗
          </a>
        </motion.div>

        <motion.div
          variants={fadeIn}
          style={{
            borderTop:
              "1px solid rgba(249,247,242,0.09)",
            paddingTop: "2.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily:
                "'Playfair Display', serif",
              fontSize: "0.95rem",
              color: "rgba(249,247,242,0.28)",
            }}
          >
            JKB
            <span style={{ color: "var(--gold)" }}>
              .
            </span>
          </span>

          <span
            style={{
              fontFamily:
                "'Montserrat', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              color: "rgba(249,247,242,0.22)",
            }}
          >
            © 2026 Japnoor Kaur Batra · All Rights
            Reserved
          </span>

          <span
            style={{
              fontFamily:
                "'Montserrat', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              color: "rgba(249,247,242,0.22)",
            }}
          >
            Punjab · India
          </span>
        </motion.div>
      </Reveal>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────── */

export default function Portfolio() {
  return (
    <div
      style={{
        background: "var(--parchment)",
        minHeight: "100vh",
      }}
    >
      <FontLoader />

      <Navbar />

      <Hero />

      <About />

      <Experience />

      <Works />

      <Skills />

      <Footer />
    </div>
  );
}