import { useState, useEffect } from "react";
import { AboutPanel, SkillsPanel, ProjectsPanel, ContactPanel } from "./panels";
import styles from "./window.module.css";

const TABS = [
    { id: "about", label: "about.txt" },
    { id: "skills", label: "skills.log" },
    { id: "projects", label: "projects/" },
    { id: "contact", label: "contact.md" },
];

export default function Window({ visible }) {
    const [phase, setPhase] = useState("idle");
    const [activeTab, setActiveTab] = useState("about");

    const [time, setTime] = useState("");
    useEffect(() => {
        const tick = () =>
            setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

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
                                onClick={() => setActiveTab(id)}
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
                        {activeTab === "projects" && <ProjectsPanel />}
                        {activeTab === "contact" && <ContactPanel />}
                    </div>

                    <div className={styles.statusbar}>
                        <span>
                            <span className={styles.dot} />
                            system ready
                        </span>
                        <span>{time}</span>
                        <span>v1.0.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
