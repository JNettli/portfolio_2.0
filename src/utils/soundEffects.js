import hoverSfx from "../sounds/buttonrollover.wav";
import clickSfxA from "../sounds/buttonclickvar1.wav";
import clickSfxB from "../sounds/buttonclickvar2.wav";
import deniedSfx from "../sounds/buttondenied.wav";

const baseHoverVolume = 0.15;
const baseClickVolume = 0.2;
const baseDeniedVolume = 0.22;

const hoverAudio = new Audio(hoverSfx);
const clickAudioA = new Audio(clickSfxA);
const clickAudioB = new Audio(clickSfxB);
const deniedAudio = new Audio(deniedSfx);

let currentVolume = 0.8;

const applyVolume = (value) => {
    const volume = Math.min(1, Math.max(0, value));
    currentVolume = volume;
    hoverAudio.volume = baseHoverVolume * volume;
    clickAudioA.volume = baseClickVolume * volume;
    clickAudioB.volume = baseClickVolume * volume;
    deniedAudio.volume = baseDeniedVolume * volume;
};

hoverAudio.preload = "auto";
clickAudioA.preload = "auto";
clickAudioB.preload = "auto";
deniedAudio.preload = "auto";
applyVolume(currentVolume);

const playSound = (audio) => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
};

const playRandomClick = () => {
    const audio = Math.random() < 0.5 ? clickAudioA : clickAudioB;
    playSound(audio);
};

export const playHoverSound = () => playSound(hoverAudio);
export const playDeniedSound = () => playSound(deniedAudio);
export const setVolume = (value) => applyVolume(value);
export const getVolume = () => currentVolume;
export const playClickSound = () => playRandomClick();
