import { useEffect, useState } from 'react';
import { createContext } from 'react';

const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
   

    useEffect(() => {
        let timeInterval;
        if(isRunning){
            timeInterval = setInterval(() => {
                timerFunction();
            }, 1000);

            return () => {
                clearInterval(timeInterval);
            }
        }

        return () => {
            clearInterval(timeInterval);
        }
    }, [isRunning, hours, minutes, seconds]);

    const timerFunction = () => {
        let currentSecond = seconds;
        let currentMinute = minutes;
        let currentHour = hours;

        // Normalize seconds > 60
        if (currentSecond >= 60) {
            currentMinute += Math.floor(currentSecond / 60);
            currentSecond = currentSecond % 60;
        }

        // Normalize minutes > 60
        if (currentMinute >= 60) {
            currentHour += Math.floor(currentMinute / 60);
            currentMinute = currentMinute % 60;
        }

        // Check if time is over and stop timer
        if (currentHour === 0 && currentMinute === 0 && currentSecond === 0) {
            resetTimer();
        } 
        else {
           
            if (currentSecond > 0) {
                setSeconds(currentSecond - 1);
            }
            
            else if (currentMinute > 0 && currentSecond === 0) {
                setSeconds(59);
                setMinutes(currentMinute - 1);
            }
            
            else if (currentHour > 0 && currentMinute === 0 && currentSecond === 0) {
                setMinutes(59);
                setSeconds(59);
                setHours(currentHour - 1);
            }
        }

        if (currentSecond !== seconds) setSeconds(currentSecond < 10 ? `0${currentSecond}` : currentSecond);
        if (currentMinute !== minutes) setMinutes(currentMinute < 10 ? `0${currentMinute}` : currentMinute);
        if (currentHour !== hours) setHours(currentHour < 10 ? `0${currentHour}` : currentHour);
    };

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