/**
 * Japnoor Kaur Batra — AI/ML Portfolio
 * Pearl & Charcoal · Playfair Display · Montserrat
 * Stack: React + Framer Motion (Tailwind optional, inline styles used for precision)
 *
 * Setup:
 *   npm install framer-motion
 *   Place this file at: src/App.jsx (or src/components/Portfolio.jsx)
 *   Place resume at: public/Japnoor_Kaur_Batra_Resume.pdf
 */

import React from 'react';
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── GOOGLE FONTS LOADER ──────────────────────────────────────── */
function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --parchment:    #F9F7F2;
        --cream:        #F0EDE4;
        --onyx:         #1A1A1A;
        --gold:         #D4AF37;
        --gold-faint:   rgba(212,175,55,0.10);
        --gold-border:  rgba(212,175,55,0.25);
        --slate:        #708090;
        --slate-light:  #A0AEB8;
        --white-glass:  rgba(249,247,242,0.76);
      }

      html { scroll-behavior: smooth; font-size: 16px; }

      body {
        background: var(--parchment);
        color: var(--onyx);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      ::selection { background: rgba(212,175,55,0.18); }

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
      .nav-link:hover { opacity: 1; }

      /* ── GHOST BUTTON ── */
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
      .btn-ghost:hover { background: var(--gold); color: var(--parchment); }

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
      .btn-ghost-light:hover { border-color: rgba(249,247,242,0.7); color: #F9F7F2; }

      /* ── DIVIDER ── */
      .divider-gold {
        height: 1px;
        background: linear-gradient(90deg, transparent 0%, var(--gold) 40%, var(--gold) 60%, transparent 100%);
        opacity: 0.35;
        margin-bottom: 5rem;
      }

      /* ── PROJECT CARD ── */
      .project-card {
        background: rgba(255,255,255,0.55);
        border: 1px solid var(--gold-border);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
      }
      .project-card:hover {
        border-color: rgba(212,175,55,0.55);
        box-shadow: 0 18px 55px rgba(212,175,55,0.09), 0 4px 18px rgba(0,0,0,0.04);
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
        transition: border-color 0.3s ease, color 0.3s ease;
      }
      .chip:hover { border-color: var(--gold); color: var(--onyx); }

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

      /* ── SCROLL BAR ── */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--parchment); }
      ::-webkit-scrollbar-thumb { background: var(--gold-border); border-radius: 2px; }
    `}</style>
  );
}

/* ─── ANIMATION VARIANTS ───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.14 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

/* ─── SCROLL REVEAL WRAPPER ─────────────────────────────────────── */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  );
}

/* ─── NAVBAR ────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="nav-glass"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: "1.2rem 4rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}
    >
      {/* Wordmark */}
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "var(--onyx)", letterSpacing: "0.05em" }}>
        JKB<span style={{ color: "var(--gold)" }}>.</span>
      </span>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {["About", "Works", "Skills", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
        ))}
        <a href="/Japnoor_Kaur_Batra_Resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">
          Curriculum Vitae
        </a>
      </div>
    </motion.nav>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
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
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "12%", right: "6%",
        width: "360px", height: "360px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Gold rule — bottom left */}
      <div style={{
        position: "absolute", bottom: "22%", left: "4rem",
        width: "120px", height: "1px",
        background: "linear-gradient(90deg, var(--gold), transparent)",
      }} />

      <motion.span
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.35 }}
        className="section-label"
        style={{ marginBottom: "2.25rem" }}
      >
        AI Research · Data Strategy · Machine Learning
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 65 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
        Architecting the Future<br />
        of{" "}
        <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Explainable</em>
        {" "}Intelligence.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.9 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.38rem",
          fontWeight: 300,
          color: "var(--slate)",
          maxWidth: "540px",
          lineHeight: 1.72,
          marginBottom: "3.25rem",
        }}
      >
        Japnoor Kaur Batra — AI/ML Researcher &amp; Data Strategist designing intelligent systems where transparency and precision converge.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25, duration: 0.6 }}
        style={{ display: "flex", gap: "2rem", alignItems: "center" }}
      >
        <a href="#works" className="btn-ghost" style={{ padding: "0.9rem 2.1rem" }}>
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
            transition: "opacity 0.25s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
          onMouseLeave={(e) => (e.target.style.opacity = 0.52)}
        >
          Read Bio ↓
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: "absolute", bottom: "3.5rem", right: "4rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem",
        }}
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, var(--gold), transparent)" }}
        />
        <span style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: "0.54rem",
          letterSpacing: "0.22em", color: "var(--slate-light)", textTransform: "uppercase",
          writingMode: "vertical-rl",
        }}>Scroll</span>
      </motion.div>
    </section>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────── */
function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" style={{ padding: "8rem 4rem", background: "var(--parchment)" }}>
      <div className="divider-gold" style={{ maxWidth: "1240px", margin: "0 auto 5rem" }} />

      <div ref={ref} style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.65fr", gap: "7rem", alignItems: "start" }}>
        {/* Left col */}
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.span variants={fadeUp} className="section-label">About</motion.span>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 3.5vw, 3.1rem)",
            fontWeight: 700,
            color: "var(--onyx)",
            lineHeight: 1.18,
            letterSpacing: "-0.015em",
          }}>
            The Art of<br />
            <em style={{ color: "var(--slate)", fontStyle: "italic" }}>Intelligent</em><br />
            Design.
          </motion.h2>
          <motion.div variants={fadeUp} style={{ marginTop: "2rem", width: "42px", height: "2px", background: "var(--gold)" }} />
        </motion.div>

        {/* Right col — bio copy */}
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.p variants={fadeUp} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.28rem",
            fontWeight: 400,
            color: "var(--onyx)",
            lineHeight: 1.88,
            marginBottom: "1.85rem",
          }}>
            I am a third-year AI/ML engineer at Amity University Punjab, operating at the precise intersection of clinical intelligence and generative systems design. My work is shaped by a singular conviction: that the most powerful models are not merely <em>accurate</em>—they are <em>legible</em>.
          </motion.p>
          <motion.p variants={fadeUp} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.28rem",
            fontWeight: 400,
            color: "var(--slate)",
            lineHeight: 1.88,
            marginBottom: "1.85rem",
          }}>
            Trained in statistical rigor and exploratory data analysis, I design systems that translate complex, multi-dimensional datasets into decisions that clinicians, strategists, and stakeholders can trust—and act upon without hesitation. My craft lives in the precise space between raw data and meaningful narrative.
          </motion.p>
          <motion.p variants={fadeUp} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.28rem",
            fontWeight: 400,
            color: "var(--slate)",
            lineHeight: 1.88,
          }}>
            Currently developing a multi-modal AI orchestration framework and a clinical risk stratification engine—both anchored in the principle that elegant intelligence must leave no stakeholder behind.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SELECTED WORKS ────────────────────────────────────────────── */
const PROJECTS = [
  {
    num: "01",
    category: "Clinical Intelligence",
    title: "RA Risk Stratification System",
    subtitle: "Explainable AI for Preventive Medicine",
    year: "2026",
    status: "Active Research",
    statusColor: "var(--gold)",
    accent: "var(--gold)",
    description:
      "In medicine, opacity is a liability. This framework engineers a risk stratification engine for Rheumatoid Arthritis that does not merely predict—it reveals. By surfacing the precise clinical and lifestyle correlates driving each individual risk profile, the system becomes a diagnostic partner: transparent, accountable, and worthy of clinical trust. Every visualization is a conversation between data and the decision-maker who depends on it.",
    chips: ["EDA", "Feature Engineering", "Statistical Modeling", "Data Visualization", "Python"],
    link: "https://github.com/ranelbatra/RA-Risk-Stratification",
  },
  {
    num: "02",
    category: "Generative Systems",
    title: "Multi-Modal AI Commerce Orchestrator",
    subtitle: "Unified Intelligence Across Every Signal",
    year: "2026",
    status: "In Progress",
    statusColor: "var(--slate)",
    accent: "var(--slate)",
    description:
      "Commerce generates signals in dozens of simultaneous registers—visual, textual, behavioral, transactional. This orchestrator is the conductor's baton that brings them into coherent motion. Designed from first principles, it routes each modal data stream through purpose-built generative AI pipelines, producing a unified intelligence layer that is both architecturally elegant and operationally decisive. Complexity, made effortless.",
    chips: ["Generative AI", "System Architecture", "Multi-Modal Design", "API Integration"],
    link: "#",
  },
];

function Works() {
  return (
    <section id="works" style={{ padding: "8rem 4rem", background: "var(--parchment)" }}>
      <div className="divider-gold" style={{ maxWidth: "1240px", margin: "0 auto 5rem" }} />
      <Reveal style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: "4.5rem" }}>
          <span className="section-label">Selected Works</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 3.5vw, 2.85rem)",
            fontWeight: 700,
            color: "var(--onyx)",
            letterSpacing: "-0.015em",
          }}>
            Featured Research &amp; Systems
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {PROJECTS.map((p) => (
            <motion.article key={p.num} variants={fadeUp} className="project-card" style={{ padding: "3.75rem", borderRadius: "3px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr)", gap: "4.5rem", alignItems: "start" }}>
                {/* Meta column */}
                <div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "4rem",
                    fontWeight: 700,
                    color: "rgba(212,175,55,0.11)",
                    lineHeight: 1,
                    marginBottom: "1.6rem",
                    userSelect: "none",
                  }}>{p.num}</div>

                  <span style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: p.accent,
                    display: "block",
                    marginBottom: "0.85rem",
                  }}>{p.category}</span>

                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.55rem",
                    fontWeight: 700,
                    color: "var(--onyx)",
                    lineHeight: 1.22,
                    marginBottom: "0.5rem",
                  }}>{p.title}</h3>

                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.05rem",
                    fontStyle: "italic",
                    color: "var(--slate)",
                    marginBottom: "2.25rem",
                  }}>{p.subtitle}</p>

                  <dl style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    {[["Year", p.year, "var(--onyx)"], ["Status", p.status, p.statusColor]].map(([k, v, c]) => (
                      <div key={k} style={{ display: "flex", gap: "1rem" }}>
                        <dt style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--slate-light)" }}>{k}</dt>
                        <dd style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", letterSpacing: "0.08em", color: c }}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Description column */}
                <div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.22rem",
                    fontWeight: 400,
                    color: "var(--onyx)",
                    lineHeight: 1.82,
                    marginBottom: "2.25rem",
                  }}>{p.description}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                    {p.chips.map((chip) => <span key={chip} className="chip">{chip}</span>)}
                  </div>

                  {p.link !== "#" && (
                    <a href={p.link} target="_blank" rel="noreferrer" style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--slate)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(112,128,144,0.3)",
                      paddingBottom: "2px",
                      transition: "color 0.25s, border-color 0.25s",
                    }}
                    onMouseEnter={(e) => { e.target.style.color = "var(--gold)"; e.target.style.borderColor = "var(--gold)"; }}
                    onMouseLeave={(e) => { e.target.style.color = "var(--slate)"; e.target.style.borderColor = "rgba(112,128,144,0.3)"; }}
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

/* ─── TECHNICAL ARTISTRY ────────────────────────────────────────── */
const SKILL_GROUPS = [
  {
    label: "Programming",
    skills: ["Python", "SQL", "NumPy", "Pandas", "OOP Principles"],
  },
  {
    label: "Data Science",
    skills: ["Exploratory Data Analysis", "Feature Engineering", "Feature Selection", "Statistical Modeling", "Data Visualization"],
  },
  {
    label: "Tools & Workspace",
    skills: ["Jupyter Notebook", "Google Colab", "VS Code", "Matplotlib", "Seaborn"],
  },
  {
    label: "Research Disciplines",
    skills: ["Clinical Data Analysis", "Hypothesis Testing", "Research Synthesis", "Technical Documentation"],
  },
];

function Skills() {
  return (
    <section id="skills" style={{ padding: "8rem 4rem", background: "var(--cream)" }}>
      <div className="divider-gold" style={{ maxWidth: "1240px", margin: "0 auto 5rem" }} />
      <Reveal style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: "4.5rem" }}>
          <span className="section-label">Technical Artistry</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 3.5vw, 2.85rem)",
            fontWeight: 700,
            color: "var(--onyx)",
            letterSpacing: "-0.015em",
          }}>
            Tools of the Trade
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1px",
          background: "rgba(112,128,144,0.12)",
          border: "1px solid rgba(112,128,144,0.12)",
        }}>
          {SKILL_GROUPS.map((group, i) => (
            <div key={i} style={{ background: "var(--cream)", padding: "3rem" }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--gold)",
                display: "block",
                marginBottom: "1.6rem",
              }}>{group.label}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                {group.skills.map((s) => (
                  <span key={s} className="chip" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 400, textTransform: "none", letterSpacing: "0.02em" }}>
                    {s}
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

/* ─── FOOTER / CONTACT ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact" style={{ padding: "7rem 4rem 4rem", background: "var(--onyx)", position: "relative", overflow: "hidden" }}>
      {/* Ambient orb */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "460px", height: "460px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <Reveal style={{ maxWidth: "1240px", margin: "0 auto", textAlign: "center" }}>
        <motion.span variants={fadeUp} className="section-label">Contact</motion.span>

        <motion.h2 variants={fadeUp} style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.4rem, 5vw, 4.25rem)",
          fontWeight: 700,
          color: "#F9F7F2",
          lineHeight: 1.08,
          letterSpacing: "-0.015em",
          marginBottom: "1.75rem",
        }}>
          Let's Build Something<br />
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Extraordinary.</em>
        </motion.h2>

        <motion.p variants={fadeUp} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.25rem",
          color: "rgba(249,247,242,0.48)",
          marginBottom: "3.5rem",
          lineHeight: 1.7,
        }}>
          Available for research collaborations, internships, and AI/ML projects.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "5rem" }}>
          <a href="mailto:ranelbatra5@gmail.com" className="btn-ghost" style={{ padding: "0.92rem 2rem" }}>
            Initiate Correspondence
          </a>
          <a href="/Japnoor_Kaur_Batra_Resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost-light" style={{ padding: "0.92rem 2rem" }}>
            Professional Dossier
          </a>
          <a href="https://www.linkedin.com/in/japnoor-kaur-batra" target="_blank" rel="noreferrer" style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: "0.67rem", fontWeight: 500,
            letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(249,247,242,0.45)",
            textDecoration: "none", padding: "0.92rem", transition: "color 0.25s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#F9F7F2")}
          onMouseLeave={(e) => (e.target.style.color = "rgba(249,247,242,0.45)")}
          >LinkedIn ↗</a>
          <a href="https://github.com/ranelbatra" target="_blank" rel="noreferrer" style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: "0.67rem", fontWeight: 500,
            letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(249,247,242,0.45)",
            textDecoration: "none", padding: "0.92rem", transition: "color 0.25s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#F9F7F2")}
          onMouseLeave={(e) => (e.target.style.color = "rgba(249,247,242,0.45)")}
          >GitHub ↗</a>
        </motion.div>

        {/* Footer bar */}
        <motion.div variants={fadeIn} style={{
          borderTop: "1px solid rgba(249,247,242,0.09)",
          paddingTop: "2.25rem",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
        }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", color: "rgba(249,247,242,0.28)" }}>
            JKB<span style={{ color: "var(--gold)" }}>.</span>
          </span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(249,247,242,0.22)" }}>
            © 2026 Japnoor Kaur Batra · All Rights Reserved
          </span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(249,247,242,0.22)" }}>
            Zirakpur, Punjab · India
          </span>
        </motion.div>
      </Reveal>
    </footer>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────────── */
export default function Portfolio() {
  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh" }}>
      <FontLoader />
      <Navbar />
      <Hero />
      <About />
      <Works />
      <Skills />
      <Footer />
    </div>
  );
}
