import { useRef, useEffect, useState } from "react";
import { playCloseSound, playHoverSound } from "../utils/soundEffects";
import styles from "./SubWindow.module.css";

export default function SubWindow({
    id,
    title,
    children,
    x,
    y,
    zIndex,
    onClose,
    onFocus,
    onMove,
}) {
    const winRef = useRef(null);
    const [phase, setPhase] = useState("opening"); // opening → open → closing

    useEffect(() => {
        const t = setTimeout(() => setPhase("open"), 20);
        return () => clearTimeout(t);
    }, []);

    const handleClose = () => {
        playCloseSound();
        setPhase("closing");
        setTimeout(onClose, 280);
    };

    const drag = useRef({
        active: false,
        startX: 0,
        startY: 0,
        origX: 0,
        origY: 0,
    });

    const onMouseDown = (e) => {
        if (e.target.closest("button")) return;
        onFocus(id);
        drag.current = {
            active: true,
            startX: e.clientX,
            startY: e.clientY,
            origX: x,
            origY: y,
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const onTouchStart = (e) => {
        if (e.target.closest("button")) return;
        onFocus(id);
        const t = e.touches[0];
        drag.current = {
            active: true,
            startX: t.clientX,
            startY: t.clientY,
            origX: x,
            origY: y,
        };
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd);
    };

    const onMouseMove = (e) => {
        if (!drag.current.active) return;
        const dx = e.clientX - drag.current.startX;
        const dy = e.clientY - drag.current.startY;
        onMove(id, drag.current.origX + dx, drag.current.origY + dy);
    };

    const onTouchMove = (e) => {
        e.preventDefault();
        if (!drag.current.active) return;
        const t = e.touches[0];
        const dx = t.clientX - drag.current.startX;
        const dy = t.clientY - drag.current.startY;
        onMove(id, drag.current.origX + dx, drag.current.origY + dy);
    };

    const onMouseUp = () => {
        drag.current.active = false;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    };
    const onTouchEnd = () => {
        drag.current.active = false;
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
    };

    return (
        <div
            ref={winRef}
            className={`${styles.subWindow} ${styles[phase]}`}
            style={{ left: x, top: y, zIndex }}
            onMouseDown={() => onFocus(id)}
        >
            <div
                className={styles.titlebar}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
            >
                <div className={styles.leftControls}>
                    <span className={styles.ctrl_dot} aria-hidden="true" />
                    <span className={styles.ctrl_dot} aria-hidden="true" />
                    <span className={styles.ctrl_dot} aria-hidden="true" />
                </div>
                <div className={styles.titleWrapper}>
                    <span className={styles.titleText}>{title}</span>
                </div>
                <div className={styles.rightControls}>
                    <button
                        className={`${styles.ctrl} ${styles.close}`}
                        onClick={handleClose}
                        onMouseEnter={playHoverSound}
                        aria-label="Close window"
                        title="Close"
                    />
                </div>
            </div>

            <div className={styles.body}>{children}</div>

            <div className={styles.statusbar}>
                <span>
                    <span className={styles.dot} />
                    process running
                </span>
                <span>pid_{id.toString().padStart(4, "0")}</span>
            </div>
        </div>
    );
}
