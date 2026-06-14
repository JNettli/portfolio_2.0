import hoverSfx from "../sounds/buttonrollover.wav";
import clickSfx from "../sounds/buttonclick.wav";
import deniedSfx from "../sounds/buttondenied.wav";

const baseHoverVolume = 0.15;
const baseClickVolume = 0.2;
const baseDeniedVolume = 0.22;

const hoverAudio = new Audio(hoverSfx);
const clickAudio = new Audio(clickSfx);
const deniedAudio = new Audio(deniedSfx);

let currentVolume = 0.8;

const applyVolume = (value) => {
    const volume = Math.min(1, Math.max(0, value));
    currentVolume = volume;
    hoverAudio.volume = baseHoverVolume * volume;
    clickAudio.volume = baseClickVolume * volume;
    deniedAudio.volume = baseDeniedVolume * volume;
};

hoverAudio.preload = "auto";
deniedAudio.preload = "auto";
applyVolume(currentVolume);

const playSound = (audio) => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
};

export const playHoverSound = () => playSound(hoverAudio);
export const playDeniedSound = () => playSound(deniedAudio);
export const setVolume = (value) => applyVolume(value);
export const getVolume = () => currentVolume;
export const playClickSound = () => playSound(clickAudio);
