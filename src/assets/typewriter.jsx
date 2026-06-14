import { useState, useEffect } from "react";

export function useTypewriter(text, startDelay = 800, speed = 55) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        let timeout;
        let i = 0;

        const start = setTimeout(() => {
            const type = () => {
                if (i < text.length) {
                    setDisplayed(text.slice(0, i + 1));
                    i++;
                    timeout = setTimeout(type, speed + Math.random() * 40);
                } else {
                    setDone(true);
                }
            };
            type();
        }, startDelay);

        return () => {
            clearTimeout(start);
            clearTimeout(timeout);
        };
    }, [text, startDelay, speed]);

    return { displayed, done };
}
