import { useEffect, useRef } from "react";
import { playHoverSound } from "../utils/soundEffects";
import styles from "./panels.module.css";

export function AboutPanel() {
    return (
        <div className={styles.panel}>
            <div className={styles.aboutGrid}>
                {[
                    { label: "name", value: "Jonas Nettli", highlight: true },
                    {
                        label: "location",
                        value: "Oslo, Norway",
                        highlight: false,
                    },
                    {
                        label: "role",
                        value: "Frontend Developer",
                        highlight: false,
                    },
                    {
                        label: "status",
                        value: "open to work",
                        highlight: true,
                        dot: true,
                    },
                ].map(({ label, value, highlight, dot }) => (
                    <div key={label} className={styles.infoBlock}>
                        <div className={styles.infoLabel}>{label}</div>
                        <div
                            className={`${styles.infoValue} ${highlight ? styles.highlight : ""}`}
                        >
                            {dot && <span className={styles.statusDot} />}
                            {value}
                        </div>
                    </div>
                ))}
            </div>
            <p className={styles.bio}>
                I'm a frontend developer with a professional degree from Noroff,
                now with 2+ years of experience building production React
                applications. I focus on creating user experiences that are
                fast, accessible, and delightful. I'm passionate about clean
                code, thoughtful UX, performance optimization, and the small
                details that make the difference between good and great
                products.
            </p>
        </div>
    );
}

const SKILLS = [
    { name: "React / Next.js", pct: 95 },
    { name: "TypeScript", pct: 90 },
    { name: "CSS / Animation", pct: 92 },
    { name: "Vite / Build Tools", pct: 85 },
    { name: "Web Audio API", pct: 82 },
    { name: "Node.js", pct: 78 },
    { name: "WebGL / Three.js", pct: 65 },
    { name: "Accessibility (A11y)", pct: 88 },
    { name: "Performance Optimization", pct: 87 },
    { name: "Coolness Factor", pct: 100 },
];

export function SkillsPanel({ active }) {
    const fillRefs = useRef([]);
    const animated = useRef(false);

    useEffect(() => {
        if (!active || animated.current) return;
        animated.current = true;
        fillRefs.current.forEach((el, i) => {
            if (el)
                setTimeout(() => {
                    el.style.width = el.dataset.pct + "%";
                }, i * 90);
        });
    }, [active]);

    return (
        <div className={styles.panel}>
            {SKILLS.map(({ name, pct }, i) => (
                <div key={name} className={styles.skillRow}>
                    <div className={styles.skillHeader}>
                        <span>{name}</span>
                        <span>{pct}%</span>
                    </div>
                    <div className={styles.skillBar}>
                        <div
                            className={styles.skillFill}
                            data-pct={pct}
                            ref={(el) => (fillRefs.current[i] = el)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

const PROJECTS = [
    {
        title: "Espen Rognlien og Strengelauget",
        stack: "React · JavaScript · Node.js",
        desc: "Band website for Espen Rognlien og Strengelauget. Norwegian Americana & Country-folk style with a hint of Johnny Cash.",
        href: "https://strengelauget.netlify.app/",
    },
    {
        title: "fuglehjelpen.no",
        stack: "React · JavaScript · Node.js",
        desc: "fuglehjelpen.no is the website of Fuglehjelpen, a Norwegian non-profit that helps injured and sick birds. ",
        href: "https://fuglehjelpen.no/",
    },
    {
        title: "Double-click deposit worn items",
        stack: "Java",
        desc: "Double-Click Deposit Worn Items is a RuneLite plugin designed to prevent accidental depositing of worn equipment when using the bank interface.",
        href: "https://runelite.net/plugin-hub/show/double-click-deposit-worn-items",
    },
    {
        title: "Platfolio",
        stack: "Three.JS · JavaScript",
        desc: "3D portfolio test. First time using Three.js to create a fully 3D environment that could be explored to find my other projects.",
        href: "https://jnet-platfolio.netlify.app/",
    },
    {
        title: "Holidaze - Venue booking website",
        stack: "React · TailwindCSS · JavaScript",
        desc: "Holidaze, exam project booking website. User authentication, venue creation and management, personal profile and interactive booking calendars.",
        href: "https://jnet-holidaze.netlify.app/",
    },
    {
        title: "Anemic Heroes",
        stack: "React · TailwindCSS · JavaScript · Home-made API",
        desc: "Anemic Heroes is a group project test to see how well we could work together as a team. Creativity with difficult problemsolving and a (way too) hard game.",
        href: "https://anemic-heroes.netlify.app/",
    },
    {
        title: "Zork Remake",
        stack: "JavaScript · Solo project",
        desc: "A remake of the classic game Zork. Text commands to explore the environment in a text based game. First solo project as I was learning JavaScript",
        href: "https://jnettli-zork-remake.netlify.app/",
    },
];

export function ProjectsPanel() {
    return (
        <div className={styles.panel}>
            {PROJECTS.map(({ title, stack, desc, href }) => (
                <a
                    key={title}
                    className={styles.projectCard}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    onMouseEnter={playHoverSound}
                >
                    <span className={styles.projectArrow}>→</span>
                    <div className={styles.projectTitle}>{title}</div>
                    <div className={styles.projectStack}>{stack}</div>
                    <div className={styles.projectDesc}>{desc}</div>
                </a>
            ))}
        </div>
    );
}

const CONTACTS = [
    {
        label: "email",
        value: "jonas.nettli@gmail.com",
        arrow: "↗",
        href: "mailto:jonas.nettli@gmail.com",
    },
    {
        label: "github",
        value: "github.com/jnettli",
        arrow: "↗",
        href: "https://github.com/JNettli",
    },
    {
        label: "linkedin",
        value: "linkedin.com/in/jonas-nettli/",
        arrow: "↗",
        href: "https://www.linkedin.com/in/jonas-nettli/",
    },
    { label: "cv", value: "download resume.pdf", arrow: "↓", href: "#" },
];

export function ContactPanel() {
    return (
        <div className={styles.panel}>
            {CONTACTS.map(({ label, value, arrow, href }) => (
                <a
                    key={label}
                    className={styles.contactRow}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverSound}
                >
                    <span className={styles.contactLabel}>{label}</span>
                    <span className={styles.contactVal}>{value}</span>
                    <span className={styles.contactArrow}>{arrow}</span>
                </a>
            ))}
        </div>
    );
}
