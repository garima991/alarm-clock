import { useEffect } from 'react';
import { createContext } from 'react';

const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if(isRunning){
            const timeInterval = setInterval(() => {
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    clearInterval(timeInterval);
                    setIsRunning(false); // Stop when time is zero
                }
                else{
                    if(seconds > 0){
                        setSeconds((seconds) => seconds - 1);
                    }
                    else if(minutes > 0){
                        setMinutes((minutes) => minutes - 1);
                        setSeconds(59);
                    }
                    if(seconds === 0 && minutes === 0 && hours > 0){
                        setHours((hours) => hours - 1);
                        setMinutes(59);
                        setSeconds(59);
                    }
                }

            }, 1000);

            return () => {
                clearInterval(timeInterval);
            }
        }

        return () => {
            clearInterval(timeInterval);
        }
    }, [isRunning, hours, minutes, seconds]);

    const startTimer = () => {
        setIsRunning(true);
    }

    const pauseTimer = () => {
        setIsRunning(false)
    }

    const resumeTimer = () => {
        setIsRunning(true)
    }

    const resetTimer = () => {
        setIsRunning(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    }
    
    return (
        <TimerContext.Provider value={{ isRunning, setIsRunning, hours, minutes, seconds, setHours, setMinutes, setSeconds, startTimer, pauseTimer, resumeTimer, resetTimer }}>
            {children}
        </TimerContext.Provider>
    );
}

export { TimerContext, TimerContextProvider };