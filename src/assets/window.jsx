import { useState, useEffect, useRef, useCallback } from "react";
import { AboutPanel, SkillsPanel, ProjectsPanel, ContactPanel } from "./panels";
import {
    playHoverSound,
    playSecondaryClick,
    setVolume,
} from "../utils/soundEffects";
import styles from "./window.module.css";

const TABS = [
    { id: "about", label: "about.txt" },
    { id: "skills", label: "skills.log" },
    { id: "projects", label: "projects/" },
    { id: "contact", label: "contact.md" },
];

export default function Window({ visible, onOpenProject }) {
    const [phase, setPhase] = useState("idle");
    const [activeTab, setActiveTab] = useState("about");

    const [time, setTime] = useState("");
    const [volume, setVolumeState] = useState(1);
    const [muted, setMuted] = useState(false);
    const prevVolumeRef = useRef(1);

    useEffect(() => {
        const tick = () =>
            setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const handleVolumeChange = (event) => {
        const nextVolume = Number(event.target.value);
        setVolumeState(nextVolume);
        setVolume(nextVolume);
        if (nextVolume > 0) prevVolumeRef.current = nextVolume;
        setMuted(nextVolume === 0);
    };

    const handleToggleMute = useCallback(() => {
        playSecondaryClick();
        if (!muted) {
            prevVolumeRef.current =
                volume > 0 ? volume : prevVolumeRef.current || 1;
            setVolumeState(0);
            setVolume(0);
            setMuted(true);
        } else {
            const restore = prevVolumeRef.current || 1;
            setVolumeState(restore);
            setVolume(restore);
            setMuted(false);
        }
    }, [muted, volume]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key && e.key.toLowerCase() === "m") {
                const tag = e.target && e.target.tagName;
                if (
                    tag === "INPUT" ||
                    tag === "TEXTAREA" ||
                    e.target.isContentEditable
                )
                    return;
                handleToggleMute();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [handleToggleMute]);

    useEffect(() => {
        if (!visible) return;

        const t1 = setTimeout(() => setPhase("h"), 0);
        const t2 = setTimeout(() => setPhase("v"), 380);
        const t3 = setTimeout(() => setPhase("open"), 830);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [visible]);

    return (
        <div className={`${styles.desktop} ${visible ? styles.visible : ""}`}>
            <div className={`${styles.window} ${styles[phase]}`}>
                <div
                    className={`${styles.titlebar} ${phase === "open" ? styles.contentVisible : ""}`}
                >
                    <div className={styles.controls}>
                        <span className={`${styles.dot}`} />
                        <span className={`${styles.dot}`} />
                        <span className={`${styles.dot}`} />
                    </div>
                    <span className={styles.title}>jonas_nettli.exe</span>
                    <div className={styles.controls}>
                        <span className={`${styles.dot}`} />
                        <span className={`${styles.dot}`} />
                        <span className={`${styles.dot}`} />
                    </div>
                </div>

                <div
                    className={`${styles.content} ${phase === "open" ? styles.contentVisible : ""}`}
                >
                    <nav className={styles.tabs} role="tablist">
                        {TABS.map(({ id, label }) => (
                            <button
                                key={id}
                                role="tab"
                                aria-selected={activeTab === id}
                                className={`${styles.tab} ${activeTab === id ? styles.activeTab : ""}`}
                                onMouseEnter={playHoverSound}
                                onClick={() => {
                                    playSecondaryClick();
                                    setActiveTab(id);
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    <div className={styles.panels}>
                        {activeTab === "about" && <AboutPanel />}
                        {activeTab === "skills" && (
                            <SkillsPanel active={activeTab === "skills"} />
                        )}
                        {activeTab === "projects" && (
                            <ProjectsPanel onOpenProject={onOpenProject} />
                        )}
                        {activeTab === "contact" && <ContactPanel />}
                    </div>

                    <div className={styles.statusbar}>
                        <span>
                            <span className={styles.dot} />
                            system ready
                        </span>
                        <span className={styles.statusTime}>{time}</span>
                        <div className={styles.rightGroup}>
                            <button
                                className={styles.muteButton}
                                onMouseEnter={playHoverSound}
                                onClick={handleToggleMute}
                                aria-pressed={muted}
                                aria-label={muted ? "Unmute" : "Mute"}
                            >
                                {muted ? (
                                    <svg
                                        className={styles.muteIcon}
                                        viewBox="0 0 24 24"
                                        width="18"
                                        height="18"
                                        aria-hidden="true"
                                        focusable="false"
                                    >
                                        <path
                                            d="M3 9v6h4l5 4V5L7 9H3z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M16 8l4 8M20 8l-4 8"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className={styles.muteIcon}
                                        viewBox="0 0 24 24"
                                        width="18"
                                        height="18"
                                        aria-hidden="true"
                                        focusable="false"
                                    >
                                        <path
                                            d="M3 9v6h4l5 4V5L7 9H3z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M16.5 8.5c1.5 1 2.5 2.8 2.5 3.5s-1 2.5-2.5 3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M19.5 6c2 1.5 3 3.5 3 6s-1 4.5-3 6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            opacity="0.85"
                                        />
                                    </svg>
                                )}
                            </button>
                            <label className={styles.volumeControl}>
                                <input
                                    className={styles.volumeSlider}
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    onMouseEnter={playHoverSound}
                                    aria-label="Volume"
                                />
                            </label>
                            <span>v1.2.1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
