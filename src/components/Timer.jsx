import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

const Timer = () => {
    const {
        isRunning,
        hours,
        minutes,
        seconds,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        setHours,
        setMinutes,
        setSeconds,
    } = useContext(TimerContext);

    const handleTimeChange = (e, type) => {
        const val = parseInt(e.target.value, 10) || 0;
        switch (type) {
            case 'hours':
                setHours(val);
                break;
            case 'minutes':
                setMinutes(val);
                break;
            case 'seconds':
                setSeconds(val);
                break;
            default:
                break;
        }
    };
    return (
        <div className="flex flex-col items-center justify-center p-4 gap-6 ">
            <div className="flex gap-2 text-black font-bold items-center text-xl ">
                <Input
                    value={hours}
                    onChange={(e) => handleTimeChange(e, 'hours')}
                    label="HH"
                    disabled={isRunning}
                />
                <span className='font-extrabold text-xl text-white'>:</span>
                <Input
                    value={minutes}
                    onChange={(e) => handleTimeChange(e, 'minutes')}
                    label="MM"
                    disabled={isRunning}
                />
                <span className='font-extrabold text-xl text-white'>:</span>
                <Input
                    value={seconds}
                    onChange={(e) => handleTimeChange(e, 'seconds')}
                    label="SS"
                    disabled={isRunning} 
                />
            </div>

            <div className="flex gap-4">
                {!isRunning ? (
                    <button
                        onClick={startTimer}
                        className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Start
                    </button>
                ) : (
                    <button
                        onClick={pauseTimer}
                        className="px-6 py-2 bg-yellow-800 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                        Pause
                    </button>
                )}

                <button
                    onClick={resetTimer}
                    className="px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Reset
                </button>
            </div>


        </div>
    );
}


const Input = ({ value, onChange, label, disabled }) => {
    return (
        <div className="flex gap-2 text-black items-center">
            <input
                type="number"
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="max-w-24 px-2 py-4 border border-gray-300 rounded-lg text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder={label}
            />
        </div>
    );
};


export default Timer;
