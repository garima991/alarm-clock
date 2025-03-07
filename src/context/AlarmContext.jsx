import { createContext, useEffect, useState } from "react";

const AlarmContext = createContext();
const alarmSound = new Audio("../assets/morning_star.mp3");

const AlarmContextProvider = ({ children }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [alarmTriggered, setAlarmTrigger] = useState(false);
    const [alarmTime, setAlarmTime] = useState(null);
    const currentDay = currentTime.toLocaleString("en-us", {
        weekday: "short",
    });
    const [alarmDays, setAlarmDays] = useState({
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false,
        [currentDay]: true,
    });
    const [snoozeDuration, setSnoozeDuration] = useState(5);

    // trigger alarm if time matches
    useEffect(() => {

        // const isDaySelected = Object.values(alarmDays).includes(true);

        if (alarmDays[currentDay] && alarmTime) {
            const alarmTimeFormat = alarmTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });
            const currentTimeFormat = currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });

            if (alarmTimeFormat === currentTimeFormat) {
                setAlarmTrigger(true);
                ringAlarm();
            }
        }
    }, [currentTime, alarmDays, alarmTime]);

    const ringAlarm = () => {
        alarmSound.play();
        // alert("Alarm is Ringing!");
    };

    // Handle snooze
    const snoozeAlarm = () => {
        console.log("Snooze alarm triggered");
        dismissAlarm();
        setTimeout(() => {
            setAlarmTrigger(true);
            ringAlarm();
        }, snoozeDuration * 60000);
    };

    const dismissAlarm = () => {
        console.log("Dismiss alarm triggered");
        setAlarmTrigger(false);
        alarmSound.pause();
        alarmSound.currentTime = 0;
        setAlarmTime(null); // after dismissing the alarm, it should not ring again because of useEffect
    };

    // Handle the alarm time input
    const handleSetAlarmTime = (event) => {
        const hour = event.target.value.split(":")[0];
        const minute = event.target.value.split(":")[1];
        const newAlarmTime = new Date();
        newAlarmTime.setHours(hour, minute, 0);
        setAlarmTime(newAlarmTime);
    };

    const handleDaySelection = (day) => {
        setAlarmDays((prev) => ({ ...prev, [day]: !prev[day] }));
    };



    return (
        <AlarmContext.Provider value={{
            currentTime,
            alarmTriggered,
            alarmTime,
            alarmDays,
            snoozeDuration,
            setAlarmTime,
            setSnoozeDuration,
            handleSetAlarmTime,
            handleDaySelection,
            snoozeAlarm,
            dismissAlarm
        }}>
            {children}
        </AlarmContext.Provider>
    );
}

export { AlarmContextProvider, AlarmContext };