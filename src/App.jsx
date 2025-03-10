import { useState } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import { ClockContextProvider } from "./context/ClockContext";
import { TimerContextProvider } from "./context/TimerContext";
import { StopWatchContextProvider } from "./context/StopWatchContext";
import { AlarmContextProvider } from "./context/AlarmContext";
import Timer from "./components/Timer";
import Stopwatch from "./components/StopWatch";
import Clock from "./components/Clock";
import Alarm from "./components/Alarm";
import { GoClock } from "react-icons/go";
import { LuAlarmClock } from "react-icons/lu";
import { TfiTimer } from "react-icons/tfi";
import { TiStopwatch } from "react-icons/ti";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-between gap-4 shadow-lg max-w-md bg-white bg-opacity-10 p-7 rounded-3xl">
        <Routes>
          <Route
            path="/"
            element={
              <ClockContextProvider>
                <Clock />
              </ClockContextProvider>
            }
          />
          <Route
            path="/alarm"
            element={
              <AlarmContextProvider>
                <Alarm />
              </AlarmContextProvider>
            }
          />
          <Route
            path="/stopwatch"
            element={
              <StopWatchContextProvider>
                <Stopwatch />
              </StopWatchContextProvider>
            }
          />
          <Route
            path="/timer"
            element={
              <TimerContextProvider>
                <Timer />
              </TimerContextProvider>
            }
          />
        </Routes>

        <div className="">
          <ul className="flex flex-row gap-5 items-center text-4xl justify-evenly">
            <li>
              <Link to="/"><GoClock/></Link>
            </li>
            <li>
              <Link to="/alarm"><LuAlarmClock /></Link>
            </li>
            <li>
              <Link to="/timer"><TfiTimer /></Link>
            </li>
            <li>
              <Link to="/stopwatch"><TiStopwatch /></Link>
            </li>
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
