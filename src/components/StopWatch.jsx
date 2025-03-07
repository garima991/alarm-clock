import React, { useContext } from "react";
import { StopWatchContext } from "../context/StopWatchContext"; 

const Stopwatch = () => {
  const {
    seconds,
    showTime,
    startWatch,
    pauseWatch,
    resetWatch,
    isRunning,
  } = useContext(StopWatchContext); 

  return (
    <div className="flex flex-col items-center justify-center max-h-fit px-6 py-4 shadow-2xl rounded-lg bg-white bg-opacity-5">
        <h1 className="text-2xl font-bold text-center mb-4 text-white">Stopwatch</h1>
        <div className="text-4xl font-mono text-center mb-4">
          {showTime(seconds)} 
        </div>
        <div className="flex justify-center gap-8">
          {isRunning ? (
            <button
            onClick={pauseWatch}
            disabled={!isRunning}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50"
          >
            Pause
          </button>
          ) : (
            <button
            onClick={startWatch}
            disabled={isRunning}
            className="px-6 py-2 bg-green-900 text-white font-bold text-lg rounded-md hover:scale-105"
          >
            Start
          </button>
          )
          
        }
          
          <button
            onClick={resetWatch}
            className="px-6 py-2 bg-red-800 text-white font-bold text-lg rounded-md hover:scale-105"
          >
            Reset
          </button>
        </div>
        <div className="mt-4">
          
        </div>
      </div>
  );
};

export default Stopwatch;
