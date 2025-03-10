import React, { useContext } from 'react'
import { AlarmContext } from "../context/AlarmContext";

const Alarm = () => {

    const {
        alarmTriggered,
        alarmTime,
        alarmDays,
        snoozeDuration,
        setAlarmTime,
        setSnoozeDuration,
        handleSetAlarmTime,
        handleDaySelection,
        snoozeAlarm,
        dismissAlarm} = useContext(AlarmContext)

    return (
        <div className="flex flex-col items-center gap-3 rounded-lg text-slate-100 bg-slate-300 bg-opacity-10 px-3 py-6">
            <div className="flex flex-col items-center gap-3">
                <h3 className="font-bold text-2xl font-serif">Set Alarm Time</h3>
                <input
                    className="p-3 text-xl font-bold rounded-md text-black"
                    type="time"
                    onChange={handleSetAlarmTime}
                />
            </div>

            {/* <div className="flex flex-col items-center gap-3"> */}
                <div className="flex flex-col flex-wrap justify-center">
                    {Object.keys(alarmDays).map((day) => (
                        <label className="text-lg" key={day}>
                            <input
                                type="checkbox"
                                checked={alarmDays[day]}
                                onChange={() => handleDaySelection(day)}
                            />
                            {" "}{day}
                        </label>
                    ))}
                </div>
            {/* </div> */}

            {alarmTriggered && (
                <div className="flex flex-col items-center gap-3">
                    <h3 className="text-3xl font-extrabold p-1">⏰ Alarm is Ringing! ⏰</h3>
                    <div className="flex gap-4">
                        <button
                            onClick={snoozeAlarm}
                            className="p-3 bg-blue-200 text-black font-semibold rounded-lg hover:scale-105 hover:bg-teal-50"
                        >
                            Snooze
                        </button>
                        <button
                            onClick={dismissAlarm}
                            className="p-3 bg-blue-200 text-black font-semibold rounded-lg hover:scale-105 hover:bg-teal-50"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col items-center gap-1">
                <h3 className="text-lg font-semibold ">Snooze Duration</h3>
                <select
                    className="p-2 rounded-lg text-black"
                    onChange={(e) => setSnoozeDuration(Number(e.target.value))}
                >
                    <option value={5} >5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={20}>20 minutes</option>
                </select>
            </div>
        </div >
    )
}

export default Alarm;
