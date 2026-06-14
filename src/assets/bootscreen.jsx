import { useState } from "react";
import { useTypewriter } from "./typewriter";
import { playHoverSound, playClickSound } from "../utils/soundEffects";
import styles from "./bootscreen.module.css";

export default function BootScreen({ onOpen }) {
    const { displayed, done } = useTypewriter("Welcome to my portfolio");
    const [leaving, setLeaving] = useState(false);

    const handleOpen = () => {
        setLeaving(true);
        setTimeout(onOpen, 650);
    };

    return (
        <div className={`${styles.boot} ${leaving ? styles.fadeOut : ""}`}>
            <h1 className={styles.welcome}>
                {displayed}
                <span className={styles.cursor} />
            </h1>
            <button
                className={`${styles.openBtn} ${done ? styles.visible : ""}`}
                onMouseEnter={playHoverSound}
                onClick={() => {
                    playClickSound();
                    handleOpen();
                }}
                aria-label="Open portfolio"
            >
                ▶ Open portfolio
            </button>
        </div>
    );
}
