import { createContext, useEffect, useState } from "react";

const StopWatchContext = createContext();

const StopWatchContextProvider = ({ children }) => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning) {
            const timeInterval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 100);

            return () => {
                clearInterval(timeInterval);
            }
        }
        else{
            return ;
        }
    }, [isRunning])

    const showTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
    }
    
    const startWatch = () => {
        setIsRunning(true);
    }

    const pauseWatch = () => {
        setIsRunning(false);
    }

    const resetWatch = () => {
        setIsRunning(false);
        setSeconds(0);
    }


    return (
        <StopWatchContext.Provider value={{seconds, showTime, startWatch, pauseWatch, resetWatch, isRunning}}>    
            {children}
        </StopWatchContext.Provider>
    );
}

export {StopWatchContext, StopWatchContextProvider};