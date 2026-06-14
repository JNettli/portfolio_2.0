import { useState } from "react";
import BootScreen from "./assets/bootscreen";
import Window from "./assets/window";

function App() {
    const [showBoot, setShowBoot] = useState(true);

    return (
        <>
            {showBoot ? <BootScreen onOpen={() => setShowBoot(false)} /> : null}
            <Window visible={!showBoot} />
        </>
    );
}

export default App;
