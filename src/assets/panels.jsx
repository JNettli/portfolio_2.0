import { useEffect, useRef } from "react";
import { playHoverSound, playPrimaryClick } from "../utils/soundEffects";
import styles from "./panels.module.css";

import platfolioImage from "../img/platfolio.png";
import anemicHeroesImage from "../img/anemicheroes.png";
import fuglehjelpenImage from "../img/fuglehjelpenlogo.svg";
import holidazeImage from "../img/holidaze.png";
import runeliteImage from "../img/runelitelogo.webp";
import zorkImage from "../img/zork.png";
import strengelaugetImage from "../img/strengelauget.webp";

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
                Hey, I'm Jonas. I'm a frontend developer with a Higher
                Professional Degree from Noroff, where I learned HTML, CSS,
                JavaScript, React, and Tailwind. I like solving problems
                creatively, especially when the obvious tools don't quite do
                what I need them to.
                <br />
                <br />
                Before coding, I spent a few years leading security teams and
                serving in the Norwegian Air Force. These days I'm working on
                moving toward a fullstack role, one step at a time.
            </p>
        </div>
    );
}

const SKILLS = [
    { name: "React", pct: 95 },
    { name: "TypeScript", pct: 88 },
    { name: "JavaScript", pct: 95 },
    { name: "CSS / Tailwind", pct: 92 },
    { name: "Three.js / WebGL", pct: 65 },
    { name: "API Integration", pct: 90 },
    { name: "State Management (Zustand)", pct: 80 },
    { name: "Java", pct: 70 },
    { name: "Accessibility", pct: 80 },
    { name: "Figma to Code", pct: 88 },
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
        id: "strengelauget",
        title: "Espen Rognlien og Strengelauget",
        stack: "React · JavaScript · Node.js",
        desc: "Band website for Espen Rognlien og Strengelauget. Norwegian Americana & Country-folk style with a hint of Johnny Cash.",
        body: "A custom-built site for a Norwegian Americana/country-folk act, designed to feel as warm and analog as the music itself. Built with React on the frontend and a small Node.js backend for handling show listings and contact requests. Focused on fast load times and a clean, music-forward layout that puts tour dates and embedded tracks front and center.",
        href: "https://strengelauget.netlify.app/",
        image: strengelaugetImage,
    },
    {
        id: "fuglehjelpen",
        title: "fuglehjelpen.no",
        stack: "React · JavaScript · Node.js",
        desc: "fuglehjelpen.no is the website of Fuglehjelpen, a Norwegian non-profit that helps injured and sick birds.",
        body: "The official website for Fuglehjelpen, a Norwegian non-profit dedicated to rescuing and rehabilitating injured or sick birds. Built to be approachable for non-technical volunteers to update, with clear calls to action for reporting an injured bird and donating. Performance and accessibility were priorities given the broad, non-technical audience the site serves.",
        href: "https://fuglehjelpen.no/",
        image: fuglehjelpenImage,
    },
    {
        id: "runeliteplugin",
        title: "Double-click deposit worn items",
        stack: "Java",
        desc: "Double-Click Deposit Worn Items is a RuneLite plugin designed to prevent accidental depositing of worn equipment when using the bank interface.",
        body: "A small but widely-used RuneLite plugin written in Java, published on the official Plugin Hub. Solves a real, recurring annoyance for players: accidentally depositing equipped items while banking. Required digging into RuneLite's plugin API and event hooks to intercept the right interface actions cleanly without interfering with normal banking behavior.",
        href: "https://runelite.net/plugin-hub/show/double-click-deposit-worn-items",
        image: runeliteImage,
    },
    {
        id: "platfolio",
        title: "Platfolio",
        stack: "Three.JS · JavaScript",
        desc: "3D portfolio test. First time using Three.js to create a fully 3D environment that could be explored to find my other projects.",
        body: "An experimental 3D portfolio built to learn Three.js from the ground up. Visitors navigate a fully explorable 3D environment where other projects are represented as physical objects in the scene. Tackled camera controls, lighting, and performance optimization for web-based WebGL for the first time — a useful proof of concept for combining 3D web experiences with practical portfolio content.",
        href: "https://jnet-platfolio.netlify.app/",
        image: platfolioImage,
    },
    {
        id: "holidaze",
        title: "Holidaze - Venue booking website",
        stack: "React · TailwindCSS · JavaScript",
        desc: "Holidaze, exam project booking website. User authentication, venue creation and management, personal profile and interactive booking calendars.",
        body: "An exam project simulating a real-world venue booking platform. Implements full user authentication, venue creation and management for hosts, personal profile pages, and an interactive booking calendar with date-range selection. Built with React and TailwindCSS, with a strong focus on handling realistic edge cases like booking conflicts and role-based permissions between regular users and venue managers.",
        href: "https://jnet-holidaze.netlify.app/",
        image: holidazeImage,
    },
    {
        id: "anemicheroes",
        title: "Anemic Heroes",
        stack: "React · TailwindCSS · JavaScript · Home-made API",
        desc: "Anemic Heroes is a group project test to see how well we could work together as a team. Creativity with difficult problemsolving and a (way too) hard game.",
        body: "A group project built to test collaborative workflow as much as the game itself. Paired a React/Tailwind frontend with a home-made API to handle game state and logic. The brief leaned into difficulty and creative problem-solving over polish — the result is a notoriously hard but mechanically interesting game, and a good case study in working as a team under a tight deadline.",
        href: "https://anemic-heroes.netlify.app/",
        image: anemicHeroesImage,
    },
    {
        id: "zork",
        title: "Zork Remake",
        stack: "JavaScript · Solo project",
        desc: "A remake of the classic game Zork. Text commands to explore the environment in a text based game. First solo project as I was learning JavaScript",
        body: "A from-scratch remake of the classic text adventure Zork, built solo while first learning JavaScript. Players type commands to explore rooms, interact with objects, and solve simple puzzles, parsed through a custom-built text command interpreter. As an early solo project, it was as much about learning core JavaScript fundamentals — state management, parsing, control flow — as it was about the game itself.",
        href: "https://jnettli-zork-remake.netlify.app/",
        image: zorkImage,
    },
];

export function ProjectsPanel({ onOpenProject }) {
    return (
        <div className={styles.panel}>
            {PROJECTS.map((project) => (
                <a
                    key={project.id}
                    className={styles.projectCard}
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                        playPrimaryClick();
                        onOpenProject(project);
                    }}
                >
                    <span className={styles.projectArrow}>→</span>
                    <div className={styles.projectTitle}>{project.title}</div>
                    <div className={styles.projectStack}>{project.stack}</div>
                    <div className={styles.projectDesc}>{project.desc}</div>
                </a>
            ))}
        </div>
    );
}

export function ProjectDetail({ project }) {
    const details = project?.details ?? [];
    const body = project?.body ?? project?.desc ?? "";

    return (
        <div className={styles.panel}>
            {project?.image && (
                <div className={styles.detailImageWrapper}>
                    <img
                        className={styles.detailImage}
                        src={project.image}
                        alt={`${project.title} preview`}
                    />
                </div>
            )}
            {details.length > 0 && (
                <div className={styles.detailMeta}>
                    {details.map(({ label, value }) => (
                        <div key={label} className={styles.detailRow}>
                            <span className={styles.detailLabel}>{label}</span>
                            <span className={styles.detailValue}>{value}</span>
                        </div>
                    ))}
                </div>
            )}
            <p className={styles.detailBody}>{body}</p>
            {project?.href && (
                <a
                    className={styles.detailLink}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverSound}
                >
                    <span>View Project</span>
                    <span className={styles.detailLinkArrow}>↗</span>
                </a>
            )}
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
    {
        label: "cv",
        value: "download resume.pdf",
        arrow: "↓",
        href: "https://drive.google.com/file/d/1PkNQ8ZaP5UDIkqu7HMmTVdhPBlgESDh-/view",
    },
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
