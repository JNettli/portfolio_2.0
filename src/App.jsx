import { useState, useCallback } from "react";
import BootScreen from "./assets/bootscreen";
import Window from "./assets/window";
import SubWindow from "./assets/subwindow";
import { ProjectDetail } from "./assets/panels";
import { useWindowManager } from "./useWindowManager";
import "./index.css";

export default function App() {
    const [booted, setBooted] = useState(false);
    const { windows, openWindow, closeWindow, focusWindow, moveWindow } =
        useWindowManager();

    const handleOpenProject = useCallback(
        (project) => {
            openWindow({
                title: project.title.toUpperCase().replace(/ /g, "_") + ".exe",
                content: <ProjectDetail project={project} />,
            });
        },
        [openWindow],
    );

    return (
        <>
            {!booted && <BootScreen onOpen={() => setBooted(true)} />}

            <Window visible={booted} onOpenProject={handleOpenProject} />

            {windows.map((win) => (
                <SubWindow
                    key={win.id}
                    id={win.id}
                    title={win.title}
                    x={win.x}
                    y={win.y}
                    zIndex={win.zIndex}
                    onClose={() => closeWindow(win.id)}
                    onFocus={focusWindow}
                    onMove={moveWindow}
                >
                    {win.content}
                </SubWindow>
            ))}
        </>
    );
}
