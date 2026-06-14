import { useEffect, useRef } from "react";
import styles from "./Panels.module.css";

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
                I build fast, accessible, and memorable web experiences. 5 years
                shipping production React apps — I care deeply about animation,
                performance, and the details most developers skip.
            </p>
        </div>
    );
}

const SKILLS = [
    { name: "React / Next.js", pct: 95 },
    { name: "TypeScript", pct: 90 },
    { name: "CSS / Animation", pct: 92 },
    { name: "Node.js", pct: 78 },
    { name: "WebGL / Three.js", pct: 65 },
    { name: "Accessibility", pct: 88 },
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
        title: "E-Commerce Platform",
        stack: "React · TypeScript · Stripe · Node.js",
        desc: "Full-stack storefront with real-time inventory, custom checkout, and a 98 Lighthouse score.",
        href: "#",
    },
    {
        title: "Data Viz Tool",
        stack: "D3.js · Canvas API · WebWorkers",
        desc: "Interactive analytics dashboard rendering 1M+ data points at 60fps via offscreen canvas.",
        href: "#",
    },
    {
        title: "Design System",
        stack: "Storybook · Radix UI · CSS Variables",
        desc: "Component library used across 4 products. Zero-dependency, fully accessible, dark-mode first.",
        href: "#",
    },
];

export function ProjectsPanel() {
    return (
        <div className={styles.panel}>
            {PROJECTS.map(({ title, stack, desc, href }) => (
                <a key={title} className={styles.projectCard} href={href}>
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
        href: "jonas.nettli@gmail.com",
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
                >
                    <span className={styles.contactLabel}>{label}</span>
                    <span className={styles.contactVal}>{value}</span>
                    <span className={styles.contactArrow}>{arrow}</span>
                </a>
            ))}
        </div>
    );
}
