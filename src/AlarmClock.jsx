import React, { useState, useEffect } from "react";

const alarmSound = new Audio("./public/morning_flower.mp3");

const AlarmClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTriggered, setAlarmTrigger] = useState(false);
  const [alarmTime, setAlarmTime] = useState(null);
  const [alarmDays, setAlarmDays] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });
  const [snoozeDuration, setSnoozeDuration] = useState(5);

  // update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // trigger alarm if time matches
  useEffect(() => {
    const currentDay = currentTime.toLocaleString("en-us", {
      weekday: "short",
    });
    const isDaySelected = Object.values(alarmDays).includes(true);

    if ((isDaySelected && alarmDays[currentDay]) || !isDaySelected) {
      if (alarmTime) {
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
    <div className="flex flex-col items-center justify-center gap-7">
      <h1 className="text-7xl font-extrabold">Alarm Clock</h1>
      <div className="w-46 h-auto p-6 bg-white text-slate-950 rounded-xl text-center flex items-center justify-center shadow-2xl">
        <h2 className="text-3xl font-bold font-mono">
          {currentTime.toLocaleTimeString()}
        </h2>
      </div>

      <div className="flex flex-col items-center gap-3 border-2 border-gray-900 p-3 rounded-lg">
        <div className="flex flex-col items-center gap-3">
          <h3 className="font-bold text-2xl font-serif">Set Alarm Time</h3>
          <input
            className="p-3 text-xl rounded-md "
            type="time"
            onChange={handleSetAlarmTime}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <h3 className="font-bold text-2xl font-serif">Set Alarm Days</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(alarmDays).map((day) => (
              <label className="text-lg font-semibold " key={day}>
                <input
                  type="checkbox"
                  checked={alarmDays[day]}
                  onChange={() => handleDaySelection(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
      </div>

      {alarmTriggered && (
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-4xl font-extrabold">⏰ Alarm is Ringing! ⏰</h3>
          <div className="flex gap-4">
            <button
              onClick={snoozeAlarm}
              className="p-3 bg-blue-500 text-white font-semibold rounded-lg"
            >
              Snooze ({snoozeDuration} min)
            </button>
            <button
              onClick={dismissAlarm}
              className="p-3 bg-blue-500 text-white font-semibold rounded-lg"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-1">
        <h3 className="text-lg font-semibold ">Choose Snooze Duration</h3>
        <select
          className="p-2 rounded-lg"
          onChange={(e) => setSnoozeDuration(Number(e.target.value))}
        >
          <option value={5} >5 minutes</option>
          <option value={10}>10 minutes</option>
          <option value={15}>15 minutes</option>
          <option value={20}>20 minutes</option>
        </select>
      </div>
    </div>
  );
};

export default AlarmClock;
