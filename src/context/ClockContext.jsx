import { createContext, useEffect, useState } from "react";

const ClockContext = createContext();

const ClockContextProvider = ({ children }) => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    }));

    // update time
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString("en-US", "en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <ClockContext.Provider value={{ currentTime }}>
            {children}
        </ClockContext.Provider>
    );
}

export { ClockContext, ClockContextProvider };